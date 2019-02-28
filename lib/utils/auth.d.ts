import { IAuthParams } from "../core/auth";
import { KeyStore } from "../core/auth/keystore/keystore";
export declare const authCheckFromSeed: (authParams: IAuthParams, account: Cybex.Account) => null | KeyStore;
