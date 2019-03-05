import { IAuthParams } from "../core/auth";
import { KeyStore } from "../core/auth/keystore/keystore";
declare type KeySet = {
    active: string;
    owner: string;
    memo: string;
};
export declare const getKeyStore: (accountName: string, password: string) => KeyStore;
export declare const getKeySet: (accountName: string, password: string) => KeySet;
export declare const authCheckFromSeed: (authParams: IAuthParams, account: Cybex.Account) => null | KeyStore;
export {};
