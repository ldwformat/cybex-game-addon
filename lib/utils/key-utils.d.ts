import { KeyStore } from "../core/auth/keystore/keystore";
export declare function encryptKeyStore(password: string, keyStore: KeyStore): string;
export declare function decryptKeyStore(password: string, keyStoreStr: string): KeyStore;
