import PrivateKey from "../cybex/ecc/src/PrivateKey";
import Serializer from "../cybex/serializer/src/serializer";
import { GetAddressRequest, SetAddressRequest, SetAddress } from "../cybex/serializer/src/operations";
import { IRegistInfo, IRegistRes, FaucetCaptcha } from "../core/auth";
import { ReferResult } from "../core/refer";
export declare const fetchWithRetry: (url: string, method: string, ...params: any[]) => Promise<any>;
export declare class ChainFetcher {
    private wsUrl;
    private proxyServiceUrl;
    constructor(wsUrl: string, proxyServiceUrl: string);
    fetchAccount: (...args: any[]) => Promise<Cybex.Account>;
    fetchAsset: (...args: any[]) => Promise<Cybex.Asset>;
}
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
export declare class MallFetcher {
    mallBackend: string;
    constructor(mallBackend: string);
    fetch<B = any, R = any>(path: string, body?: B): Promise<R>;
    getCountryList(): Promise<MallBackendCountry[]>;
    getProvinceList(countryID: string | number): Promise<MallBackendProvince[]>;
}
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
export declare type BackendAddressFormFields = {
    loginName: string;
    receiverName: string;
    email: string;
    qqNo: string;
    wechatNo: string;
    proviceId: number;
    homeAddress: string;
};
export declare type BackendAddressInfo = {
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
export declare class BackendFetcher {
    backendUrl: string;
    static signOperation<I, R>(originOp: I, serializer: Serializer<any>, key: PrivateKey, expiration?: number): R;
    constructor(backendUrl: string);
    fetch<R = any, B = GetAddressRequest | SetAddressRequest>(path: string, body: B): Promise<R>;
    queryAddress(loginName: string, key: PrivateKey): Promise<BackendAddressInfo[]>;
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
    getRefer: (account: string) => Promise<ReferResult>;
}
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
export declare class GatewayFetcher {
    gatewayUrl: string;
    constructor(gatewayUrl: string);
    fetch<R = any>(path: string, body: any): Promise<R>;
    getCoinList(): Promise<any>;
    getDepositInto(accountName: string, coinType: string): Promise<GetDepositAddressRes>;
}
export declare class FaucetFetcher {
    faucetUrl: string;
    constructor(faucetUrl: string);
    fetch<R = any>(path: string, body: any): Promise<R>;
    getCaptcha(): Promise<FaucetCaptcha>;
    postRegistInfo(regInfo: IRegistInfo): Promise<IRegistRes>;
}
