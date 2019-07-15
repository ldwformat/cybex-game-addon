import PrivateKey from "../../../cybex/ecc/src/PrivateKey";
import { KeyAuth, IKeyAuth } from "./keyauth";
import { Serializable } from "../../core.models";
export declare enum KeyStoreMode {
    Wif = 0,
    Seed = 1
}
export declare type KeyStoreSeriOptions = {
    password?: string;
    identifier?: string;
};
export declare class KeyStore implements Serializable {
    keyList: PrivateKey[];
    static DefaultIdentifier: string;
    static DefaultSeriOptions: KeyStoreSeriOptions;
    createAt: Date;
    updateAt: Date;
    account: Cybex.Account | null;
    valid: boolean;
    keys: {
        [role: string]: KeyAuth;
    };
    readonly activeKey: KeyAuth;
    readonly ownerKey: KeyAuth;
    readonly memoKey: KeyAuth;
    static checkAuth(privKey: PrivateKey, authToCheck: Cybex.AccountAuthority | string): IKeyAuth | false;
    static fromKeyStore(orikeyStore: KeyStore): KeyStore;
    static deserialize(walletStr: string): KeyStore;
    constructor(keyList?: PrivateKey[]);
    /**
     * Todo:
     *
     * @param {Cybex.Account} account
     * @memberof KeyStore
     */
    loginAccount(account: Cybex.Account): boolean;
    checkAccount(account: Cybex.Account): boolean;
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
    serialize(): string;
}
