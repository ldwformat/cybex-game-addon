import { KeyStore } from "./keystore/keystore";

export class AuthState {
  isAuthed = false;
  showModal = false;
  accountName: string | null = null;
  keyStore: null | KeyStore = null;
  account: Cybex.Account | null = null;
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
