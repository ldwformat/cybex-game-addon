import PrivateKey from "../../src/cybex/ecc/src/PrivateKey";
import Serializer from "../../src/cybex/serializer/src/serializer";
import { GetAddressRequest, SetAddressRequest, SetAddress } from "../../src/cybex/serializer/src/operations";
import { IRegistInfo, IRegistRes, FaucetCaptcha } from "../core/auth";
export declare const fetchWithRetry: (url: string, method: string, ...params: any[]) => Promise<any>;
export declare class ChainFetcher {
    private wsUrl;
    private proxyServiceUrl;
    constructor(wsUrl: string, proxyServiceUrl: string);
    fetchAccount: (...args: any[]) => Promise<Cybex.Account>;
    fetchAsset: (...args: any[]) => Promise<Cybex.Asset>;
}
export declare class MallFetcher {
    mallBackend: string;
    constructor(mallBackend: string);
    fetch<B = any, R = any>(path: string, body?: B): Promise<R>;
    getCountryList(): Promise<MallBackend.Country[]>;
    getProvinceList(countryID: string | number): Promise<MallBackend.Province[]>;
}
export declare class BackendFetcher {
    backendUrl: string;
    static signOperation<I, R>(originOp: I, serializer: Serializer<any>, key: PrivateKey, expiration?: number): R;
    constructor(backendUrl: string);
    fetch<R = any, B = GetAddressRequest | SetAddressRequest>(path: string, body: B): Promise<R>;
    queryAddress(loginName: string, key: PrivateKey): Promise<Backend.AddressInfo[]>;
    addAddress(addressConfig: SetAddress, key: PrivateKey): Promise<any>;
}
export declare class ReferFetcher {
    referBackendUrl: string;
    static signOperation<I, R>(originOp: I, serializer: Serializer<any>, key: PrivateKey, expiration?: number): R;
    constructor(referBackendUrl: string);
    post<R = any, B = GetAddressRequest | SetAddressRequest>(path: string, body: B): Promise<R>;
    fetch<R = any>(path: string): Promise<R>;
    setRefer: (account: string, referrer: string, action: string, key: PrivateKey) => Promise<any>;
    setRegisterRefer: (account: string, referrer: string, action: string, key: PrivateKey) => Promise<any>;
    getRefer: (account: string) => Promise<Backend.ReferResult>;
}
export declare class GatewayFetcher {
    gatewayUrl: string;
    constructor(gatewayUrl: string);
    fetch<R = any>(path: string, body: any): Promise<R>;
    getCoinList(): Promise<any>;
    getDepositInto(accountName: string, coinType: string): Promise<CybexGateway.GetDepositAddressRes>;
}
export declare class FaucetFetcher {
    faucetUrl: string;
    constructor(faucetUrl: string);
    fetch<R = any>(path: string, body: any): Promise<R>;
    getCaptcha(): Promise<FaucetCaptcha>;
    postRegistInfo(regInfo: IRegistInfo): Promise<IRegistRes>;
}
