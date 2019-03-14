import { KeyStore } from "./keystore/keystore";
import { resolveNameFromReferUrl } from "../../utils/refer-url";

export type BalanceObj = {
  [asset: string]: {
    asset_id: string;
    asset: string;
    value: number;
  };
};

export enum LoginPanel {
  Login,
  Register,
  Unlock
}
export class AuthState {
  isAuthed = false;
  isLogging = false;
  showModal = false;
  showUnlock = false;
  showSetPassword = false;
  accountName: string | null = null;
  keyStore: null | KeyStore = null;
  keyStoreCipher: string | null = null;
  balances: BalanceObj = {};
  account: Cybex.Account | null = null;
  captcha: FaucetCaptcha | null = null;
  loginPanel: LoginPanel = LoginPanel.Login;
  defaultReferer: string | null =
    resolveNameFromReferUrl(location.search) || null;
}

export type LoginReferParams = {
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

export type FaucetCaptcha = {
  data: string;
  id: string;
};

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

export enum AuthStatus {
  NOT_LOGIN,
  LOGIN_NORMAL,
  LOGIN_LOCKED
}
