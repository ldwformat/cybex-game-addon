import fetch from "isomorphic-fetch";
import moment from "moment";
import { WsConnection } from "./connect";
import { resolvePath } from "./path";
import PrivateKey from "../cybex/ecc/src/PrivateKey";
import Serializer from "../cybex/serializer/src/serializer";
import Signature from "../cybex/ecc/src/signature";
import {
  query_address,
  GetAddressRequest,
  SetAddressRequest,
  GetAddress,
  SetAddress,
  set_address,
  SetRefer,
  SetReferRequest,
  set_refer
} from "../cybex/serializer/src/operations";
import { IRegistInfo, IRegistRes, FaucetCaptcha } from "../core/auth";
import { ReferResult, ReferSingleRebate } from "../core/refer";

const simpleCache = {};
const getKey = (...args) => JSON.stringify(args);

let ws: WsConnection;
export const fetchWithRetry: (
  url: string,
  method: string,
  ...params: any[]
) => Promise<any> = async (url, method, ...params) => {
  let result = simpleCache[getKey(method, params)];
  if (result) {
    return result;
  }
  if (!ws) {
    let wss = new WsConnection({
      url
    });
    await wss.connect();
    ws = wss;
  }
  let counter = 0;
  return (await new Promise((resolve, reject) => {
    function impl() {
      ws.api("database")(method, ...params)
        .then(res => {
          simpleCache[getKey(method, params)] = res;
          resolve(res);
        })
        .catch(async error => {
          if (counter++ < 5) {
            ws && (await ws.connect());
            impl();
          } else {
            console.warn(error, method, params);
            reject(error);
          }
        });
    }
    impl();
  })) as any;
};

const getAccountFromChain = (url: string) => async (accountName: string) =>
  fetchWithRetry(url, "get_account_by_name", accountName);

const getAccountFromBackend = (url: string) => async (accountName: string) =>
  fetch(`${url}/api/cybex/account/${accountName}`)
    .then(res => res.json())
    .then(res => (res.code ? null : res))
    .catch(err => {
      console.error(err);
      return null;
    });

const getAssetFromBackend = (url: string) => async (assetName: string) =>
  fetch(`${url}/api/cybex/asset/${assetName}`)
    .then(res => res.json())
    .then(res => (res.code ? null : res))
    .catch(err => {
      console.error(err);
      return null;
    });

const getAssetFromChain = (url: string) => async (assetName: string) =>
  fetchWithRetry(url, "lookup_asset_symbols", [assetName]).then(res => res[0]);

const combineFetchWithCache: <R>(
  ...fns: Array<(...args: any[]) => Promise<R>>
) => (...args: any[]) => Promise<R> = (...fns) => {
  const cache = {};
  return async (...args) => {
    let cacheKey = getKey(args);
    if (cacheKey in cache) {
      return cache[cacheKey];
    }
    let res: any = null;
    for (let fn of fns) {
      try {
        if (res) {
          cache[cacheKey] = res;
          break;
        }
        res = await fn(...args);
      } catch (e) {
        console.error(e);
      }
    }
    return res;
  };
};

const combineFetch = <T>(...fns: Array<(...args: any[]) => Promise<T>>) => {
  return async (...args: any[]) => {
    let res: T | null = null;
    for (let fn of fns) {
      try {
        if (res) {
          break;
        }
        res = await fn(...args);
      } catch (e) {
        console.error(e);
      }
    }
    return (res as unknown) as T;
  };
};

export class ChainFetcher {
  constructor(private wsUrl: string, private proxyServiceUrl: string) {}

  fetchAccount = combineFetchWithCache<Cybex.Account>(
    getAccountFromChain(this.wsUrl),
    getAccountFromBackend(this.proxyServiceUrl)
  );

  fetchAsset = combineFetchWithCache<Cybex.Asset>(
    getAssetFromChain(this.wsUrl),
    getAssetFromBackend(this.proxyServiceUrl)
  );
}

//// Mall
export interface MallBackendResponse<R> {
  returnCode: number;
  returnMsg: string;
  data: R;
}

export interface MallBackendCountry {
  id: number;
  country: string;
  countryCode: string;
  addition: null;
  deleted: "N";
}

export interface MallBackendProvince {
  id: number;
  countryId: number;
  country: string;
  countryCode: string;
  provice: string;
  provinceCode: string;
  addition: null;
  deleted: string;
}

export class MallFetcher {
  constructor(public mallBackend: string) {}

  async fetch<B = any, R = any>(path: string, body?: B): Promise<R> {
    return fetch(resolvePath(this.mallBackend, path), {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then((res: MallBackendResponse<R>) => {
        if (res.returnCode === 10000) {
          return res.data as R;
        }
        throw new Error(res.returnMsg);
      });
  }

  async getCountryList() {
    return this.fetch<undefined, MallBackendCountry[]>("allCountrys");
  }

  async getProvinceList(countryID: string | number) {
    return this.fetch<undefined, MallBackendProvince[]>(
      `countryAreas/${countryID}`
    );
  }
}

//// Backend
export interface BackendResponse<R> {
  success: boolean;
  reason: string;
  data: R;
}

export interface BackendFetchResponse<R> {
  success: boolean;
  reason: string;
  result: R;
}

export type BackendAddressFormFields = {
  loginName: string;
  receiverName: string;
  email: string;
  qqNo: string;
  wechatNo: string;
  proviceId: number;
  homeAddress: string;
};

export type BackendAddressInfo = {
  id: number;
  email: string;
  wechatNo: string;
  mobile: null;
  homeAddress: string;
  userId: number;
  provinceCode: string;
  countryCode: string;
  countryId: null;
  receverName: string;
  updatedTime: number;
  operator: null;
  proviceId: null;
  addition: null;
  createdTime: number;
  provice: string;
  deleted: string;
  country: string;
  qqNo: string;
  freightFee: null;
  defaultAddress: string;
};

export class BackendFetcher {
  static signOperation<I, R>(
    originOp: I,
    serializer: Serializer<any>,
    key: PrivateKey,
    expiration = 30 * 1000
  ): R {
    let op: any = {
      ...originOp,
      expiration:
        originOp["expiration"] || Math.ceil((Date.now() + expiration) / 1000)
    };
    let opToBuffer = serializer.fromObject(op);
    let buffer = serializer.toBuffer(opToBuffer);
    let signature = Signature.signBuffer(buffer, key).toHex();
    op.signature = signature;
    return op as R;
  }

  constructor(public backendUrl: string) {}

  async fetch<R = any, B = GetAddressRequest | SetAddressRequest>(
    path: string,
    body: B
  ): Promise<R> {
    return fetch(resolvePath(this.backendUrl, path), {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then((res: BackendResponse<R>) => {
        if (res.success) {
          return res.data as R;
        }
        throw new Error(res.reason);
      });
  }

  async queryAddress(loginName: string, key: PrivateKey) {
    let op = BackendFetcher.signOperation<GetAddress, GetAddressRequest>(
      {
        loginName
      },
      query_address,
      key
    );
    op.method = "query";
    return [await this.fetch<BackendAddressInfo>("user/", op)];
  }

  async addAddress(addressConfig: SetAddress, key: PrivateKey) {
    let op = BackendFetcher.signOperation<SetAddress, SetAddressRequest>(
      addressConfig,
      set_address,
      key
    );
    op.method = "create";
    return this.fetch("user/", op);
  }
}
export class ReferFetcher {
  static signOperation<I, R>(
    originOp: I,
    serializer: Serializer<any>,
    key: PrivateKey,
    expiration = 300 * 1000
  ): R {
    let op: any = {
      ...originOp,
      expiration:
        originOp["expiration"] || Math.ceil((Date.now() + expiration) / 1000)
    };
    let opToBuffer = serializer.fromObject(op);
    let buffer = serializer.toBuffer(opToBuffer);
    let signature = Signature.signBuffer(buffer, key).toHex();
    op.signature = signature;
    return op as R;
  }

  constructor(public referBackendUrl: string) {}

  async post<R = any, B = GetAddressRequest | SetAddressRequest>(
    path: string,
    body: B
  ): Promise<R> {
    return fetch(resolvePath(this.referBackendUrl, path), {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then((res: BackendResponse<R>) => {
        if (res.success) {
          return res.data as R;
        }
        throw new Error(res.reason);
      });
  }
  async fetch<R = any>(path: string): Promise<R> {
    return fetch(resolvePath(this.referBackendUrl, path))
      .then(res => res.json())
      .then((res: BackendFetchResponse<R>) => {
        if (res.success) {
          return res.result as R;
        }
        throw new Error(res.reason);
      });
  }

  setRefer = async (
    account: string,
    referrer: string,
    action: string,
    key: PrivateKey
  ) => {
    let op = ReferFetcher.signOperation<SetRefer, SetReferRequest>(
      { account, action, referrer },
      set_refer,
      key
    );
    return this.post("refer/", op);
  };

  setRegisterRefer = async (
    account: string,
    referrer: string,
    action: string,
    key: PrivateKey
  ) => {
    let op = ReferFetcher.signOperation<SetRefer, SetReferRequest>(
      { account, action: "register|" + action, referrer },
      set_refer,
      key
    );
    return this.post("refer/", op);
  };

  getRefer = async (account: string) => {
    return this.fetch<ReferResult>(`refer/?account=${account}&action=all`);
  };

  async getRebateDetails(account: string, action: string) {
    return this.fetch<ReferSingleRebate[]>(
      `rebate/?account=g5188&action=${action}`
      // `rebate/?account=${account}&action=${action}`
    );
  }
}

//// Gateway
export interface GatewayResponse<R> {
  data: R;
}

export interface GetDepositAddressRes {
  getDepositAddress: GetDepositAddress | null;
}

export interface GetDepositAddress {
  address: string;
  accountName: string;
  asset: string;
  type: string;
  createAt: string;
  projectInfo: ProjectInfo;
}

export interface ProjectInfo {
  projectName: string;
  logoUrl: string;
  contractAddress: null;
  contractExplorerUrl: null;
}

export interface CoinInfo {
  asset: string;
  currency: string;
  isDisabled: boolean;
}

export class GatewayFetcher {
  constructor(public gatewayUrl: string) {}

  async fetch<R = any>(path: string, body: any): Promise<R> {
    return fetch(resolvePath(this.gatewayUrl, path), {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then((res: GatewayResponse<R>) => {
        if (res.data) {
          return res.data as R;
        }
        throw new Error("Fetch Gateway Error");
      });
  }

  async getCoinList() {
    return fetch(
      "https://gateway-query.cybex.io/public/coin-info?currency=1&isDisabled=1&asset=1"
    ).then(res => res.json());
  }

  async getDepositInto(accountName: string, coinType: string) {
    let body = {
      operationName: "GetAddress",
      variables: { accountName, asset: coinType },
      query:
        "query GetAddress($accountName: String!, $asset: String!) {\n  getDepositAddress(accountName: $accountName, asset: $asset) {\n    address\n    accountName\n    asset\n    type\n    createAt\n    projectInfo {\n      projectName\n      logoUrl\n      contractAddress\n      contractExplorerUrl\n      __typename\n    }\n    __typename\n  }\n}\n"
    };

    return this.fetch<GetDepositAddressRes>("gateway", body);
  }
}
export class FaucetFetcher {
  constructor(public faucetUrl: string) {}

  async fetch<R = any>(path: string, body: any): Promise<R> {
    return fetch(resolvePath(this.faucetUrl, path), {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then((res: IRegistRes) => {
        if (res.account) {
          return (res as unknown) as R;
        }
        throw res;
      });
  }

  async getCaptcha() {
    return fetch(resolvePath(this.faucetUrl, "captcha")).then(
      res => res.json() as Promise<FaucetCaptcha>
    );
  }

  async postRegistInfo(regInfo: IRegistInfo) {
    let body = regInfo;
    return this.fetch<IRegistRes>("register", body);
  }
}

//
export type AssetPrice = {
  name: string;
  value: number;
  time: number;
};

export class PriceFetcher {
  constructor(public priceUrl = "https://app.cybex.io/price") {}
  async fetchPrices(): Promise<AssetPrice[]> {
    return fetch(this.priceUrl)
      .then(res => res.json())
      .then(res => {
        if (res.code !== 0) {
          throw new Error("400");
        }
        return res.prices;
      });
  }
}
