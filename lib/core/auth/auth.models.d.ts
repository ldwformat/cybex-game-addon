import { KeyStore } from "./keystore/keystore";
export declare type BalanceObj = {
    [asset: string]: {
        asset_id: string;
        asset: string;
        value: number;
    };
};
export declare class AuthState {
    isAuthed: boolean;
    isLogging: boolean;
    showModal: boolean;
    accountName: string | null;
    keyStore: null | KeyStore;
    balances: BalanceObj;
    account: Cybex.Account | null;
}
export declare type LoginReferParams = {
    referrer: string;
    action: string;
    isRegister?: boolean;
};
export interface IAuthParams {
    accountName: string;
    password: string;
    refer?: LoginReferParams;
}
export interface IAuthResult {
    accountName: string;
    account: Cybex.Account;
    keyStore: KeyStore;
    refer?: LoginReferParams;
}
