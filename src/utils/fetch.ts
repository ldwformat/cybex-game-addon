import moment from "moment";
import { WsConnection } from "./connect";

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

const getAccountFromChain = async (accountName: string) =>
  fetchWithRetry(CYBEX_API_BASE, "get_account_by_name", accountName);

const getAccountFromBackend = async (accountName: string) =>
  fetch(`${FRONT_API_BASE}/api/cybex/account/${accountName}`).then(res =>
    res.json()
  );

const getAssetFromBackend = async (assetName: string) =>
  fetch(`${FRONT_API_BASE}/api/cybex/asset/${assetName}`).then(res =>
    res.json()
  );

const getAssetFromChain = async (assetName: string) =>
  fetchWithRetry(CYBEX_API_BASE, "lookup_asset_symbols", [assetName]).then(
    res => res[0]
  );

const combineFetchWithCache = <T>(
  ...fns: Array<(...args: any[]) => T | Promise<T>>
) => {
  const cache = {};
  return async (...args: any[]) => {
    let cacheKey = getKey(args);
    if (cacheKey in cache) {
      return cache[cacheKey];
    }
    let res: T | null = null;
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
    return (res as unknown) as T;
  };
};

const combineFetch = <T>(...fns: Array<(...args: any[]) => T | Promise<T>>) => {
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

export const fetchAccount = combineFetchWithCache<Cybex.Account>(
  getAccountFromChain,
  getAccountFromBackend
);
export const fetchAsset = combineFetchWithCache<Cybex.Asset>(
  getAssetFromChain,
  getAssetFromBackend
);
