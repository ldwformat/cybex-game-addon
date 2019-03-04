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
    captcha: FaucetCaptcha | null;
    loginPanel: LoginPanel;
    defaultReferer: string | null;
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
export declare type FaucetCaptcha = {
    data: string;
    id: string;
};
export declare enum LoginPanel {
    Login = 0,
    Register = 1
}
export interface IRegistInfo {
    cap: ICap;
    account: IRegAccount;
}
export interface IRegAccount {
    name: string;
    owner_key: string;
    active_key: string;
    memo_key: string;
    refcode?: null;
    referrer?: null;
}
export interface ICap {
    id: string;
    captcha: string;
    fp?: number;
}
export interface IRegistRes {
    account: Account;
}
export interface IRegResAccount {
    id: string;
    block_num: number;
    trx_num: number;
    trx: IResTrx;
}
export interface IResTrx {
    ref_block_num: number;
    ref_block_prefix: number;
    expiration: string;
    operations: Array<Array<IAccountResigtOperationClass | number>>;
    extensions: any[];
    signatures: string[];
    operation_results: Array<Array<number | string>>;
}
export interface IAccountResigtOperationClass {
    fee: IFee;
    registrar: string;
    referrer: string;
    referrer_percent: number;
    name: string;
    owner: IAccountAuthority;
    active: IAccountAuthority;
    options: IAccountOptions;
    extensions: IExtensions;
}
export interface IAccountAuthority {
    weight_threshold: number;
    account_auths: any[];
    key_auths: Array<Array<number | string>>;
    address_auths: any[];
}
export interface IExtensions {
    [any: string]: any;
}
export interface IFee {
    amount: number;
    asset_id: string;
}
export interface IAccountOptions {
    memo_key: string;
    voting_account: string;
    num_witness: number;
    num_committee: number;
    votes: any[];
    extensions: any[];
}
