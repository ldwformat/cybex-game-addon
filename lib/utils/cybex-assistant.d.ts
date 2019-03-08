/// <reference types="node" />
import { WsConnection } from "./connect";
import { KeyStore } from "../core/auth/keystore/keystore";
import { PrivateKey } from "../cybex/ecc";
declare type TransferParams = {
    from: string;
    to: string;
    asset: string;
    value: number;
    memo?: string;
};
declare type Fetcher = <R = any>(method: string, ...params: any[]) => Promise<R>;
export declare class CybexAssistant {
    wsConnect: WsConnection;
    simpleCache: {};
    db_api: Fetcher;
    db_api_cached: Fetcher;
    static cacheKey(...args: any[]): string;
    static isObjectID(idOrNot: string): boolean;
    static encodeMemo(memoContent: string, privKey: PrivateKey, toPubKeyStr: string): {
        from: string;
        to: string;
        nonce: any;
        message: Buffer;
    };
    constructor(wsConnect: WsConnection);
    genFetcher: (api: string, cache?: boolean) => Fetcher;
    transfer({ from, to, asset, value, memo }: TransferParams, keyStore: KeyStore): Promise<any>;
    performTransaction(opName: string, op: any, privKey: PrivateKey): Promise<any>;
    getObjects<R = any[]>(...objectIDs: string[]): Promise<R>;
    getAssets(...symbolOrIDs: string[]): Promise<(Cybex.Asset | null)[]>;
    getAccounts(...nameOrIDs: string[]): Promise<(Cybex.Account | null)[]>;
}
export {};
