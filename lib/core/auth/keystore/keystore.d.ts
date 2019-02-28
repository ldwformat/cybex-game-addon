import PrivateKey from "../../../cybex/ecc/src/PrivateKey";
import { KeyAuth } from "./keyauth";
export declare enum KeyStoreMode {
    Wif = 0,
    Seed = 1
}
export declare class KeyStore {
    keyList: PrivateKey[];
    createAt: Date;
    updateAt: Date;
    account: Cybex.Account | null;
    valid: boolean;
    keys: {
        [role: string]: KeyAuth;
    };
    readonly activeKey: KeyAuth;
    readonly ownerKey: KeyAuth;
    static checkAuth(privKey: PrivateKey, authToCheck: Cybex.AccountAuthority | string): KeyAuth | false;
    constructor(keyList?: PrivateKey[]);
    /**
     * Todo:
     *
     * @param {Cybex.Account} account
     * @memberof KeyStore
     */
    loginAccount(account: Cybex.Account): void;
    /**
     *
     *
     * @param {string} pubKeyStr
     * @returns {(KeyAuth | null)}
     * @memberof KeyStore
     */
    getPrivByPubStr(pubKeyStr: string): KeyAuth | null;
    refresh(): this & {
        updateAt: Date;
    };
}
