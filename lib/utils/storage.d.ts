import { Serializable } from "../core";
export declare class AddonStorage {
    prefix: string;
    static DefaultPrefix: string;
    static CommonKeys: {
        KeyStore: string;
        AccountName: string;
        UnlockCount: string;
        PriceList: string;
    };
    constructor(prefix?: string);
    private storeKey;
    setItem(key: string, item: object | Serializable | string | number | any[]): string | null;
    getItem(key: string): string | null;
    removeItem(key: string): void;
    cleanStorage(): void;
}
export declare const addonStorage: AddonStorage;
