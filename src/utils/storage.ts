import { Serializable } from "../core";

export class AddonStorage {
  static DefaultPrefix = "$$CybexAddon";
  static CommonKeys = {
    KeyStore: "#KeyStore",
    AccountName: "#AccountName",
    UnlockCount: "#UnlockCount",
    PriceList: "#PriceList"
  };

  constructor(public prefix = AddonStorage.DefaultPrefix) {}

  private storeKey(key: string) {
    return `${this.prefix}_${key}`;
  }

  setItem(
    key: string,
    item: object | Serializable | string | number | any[]
  ): string | null {
    let toItem =
      typeof item === "string"
        ? item
        : typeof item["serialize"] !== "undefined"
        ? (item as Serializable).serialize()
        : JSON.stringify(item);
    localStorage.setItem(this.storeKey(key), toItem);
    return toItem;
  }

  getItem(key: string): string | null {
    return localStorage.getItem(this.storeKey(key));
  }

  removeItem(key: string) {
    return localStorage.removeItem(this.storeKey(key));
  }

  cleanStorage() {
    let keysToBeRemoved: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key: string | null = localStorage.key(i);
      if (!key) {
        continue;
      }
      if (key.startsWith(this.prefix)) {
        keysToBeRemoved.push(key);
      }
    }
    keysToBeRemoved.forEach(key => localStorage.removeItem(key));
  }
}

export const addonStorage = new AddonStorage();
