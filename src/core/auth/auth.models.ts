import { KeyStore } from "./keystore/keystore";

export class AuthState {
  isAuthed = false;
  accountName: string | null = null;
  keyStore: null | KeyStore = null;
}

export interface IAuthParams {
  accountName: string;
  password: string;
}

export interface IAuthResult {
  accountName: string;
  keyStore: KeyStore;
}
