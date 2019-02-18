import fetch from "isomorphic-fetch";
import moment from "moment";
import { WsConnection } from "./connect";
import { resolvePath } from "./path";

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
      url: "wss://shanghai.51nebula.com"
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
      .then((res: MallBackend.Response<R>) => {
        if (res.returnCode === 10000) {
          return res.data as R;
        }
        throw new Error(res.returnMsg);
      });
  }

  async getCountryList() {
    return this.fetch<undefined, MallBackend.Country[]>("allCountrys");
  }

  async getProvinceList(countryID: string | number) {
    return this.fetch<undefined, MallBackend.Province[]>(
      `countryAreas/${countryID}`
    );
  }
}
