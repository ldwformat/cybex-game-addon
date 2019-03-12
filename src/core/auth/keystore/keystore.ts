import PrivateKey from "../../../cybex/ecc/src/PrivateKey";
import { KeyAuth, IKeyAuth } from "./keyauth";
import assert from "assert";

export enum KeyStoreMode {
  Wif,
  Seed
}

export type KeyStoreSeriOptions = {
  password?: string;
  identifier?: string;
};

export class KeyStore {
  static DefaultIdentifier = "#$KeyStore";
  static DefaultSeriOptions: KeyStoreSeriOptions = {
    identifier: KeyStore.DefaultIdentifier
  };
  createAt = new Date();
  updateAt = new Date();
  account: Cybex.Account | null = null;
  valid = false;
  keys: { [role: string]: KeyAuth } = {};

  get activeKey() {
    return this.keys["active"];
  }

  get ownerKey() {
    return this.keys["owner"];
  }

  get memoKey() {
    return this.keys["memo"];
  }

  static checkAuth(
    privKey: PrivateKey,
    authToCheck: Cybex.AccountAuthority | string
  ): IKeyAuth | false {
    let pubKeyStr = privKey.toPublicKey().toPublicKeyString();
    if (typeof authToCheck === "string") {
      return (
        (pubKeyStr === authToCheck &&
          KeyAuth.fromKeyAuth({ fullAuth: true, privKey, pubKeyStr })) ||
        false
      );
    }
    let validAuthList = authToCheck.key_auths.filter(
      key => key[0] === pubKeyStr
    );
    if (!validAuthList.length) {
      return false;
    }
    return KeyAuth.fromKeyAuth({
      fullAuth:
        validAuthList.reduce((sum, key) => key[1] + sum, 0) >=
        authToCheck.weight_threshold,
      privKey,
      pubKeyStr
    });
  }

  static fromKeyStore(orikeyStore: KeyStore): KeyStore {
    let keyStore = new KeyStore(orikeyStore.keyList);
    keyStore.keys = orikeyStore.keys;
    keyStore.valid = orikeyStore.valid;
    keyStore.account = orikeyStore.account;
    keyStore.createAt = orikeyStore.createAt;
    keyStore.updateAt = orikeyStore.updateAt;
    return keyStore;
  }

  static deserilize(walletStr: string): KeyStore {
    return KeyStore.fromKeyStore(
      JSON.parse(walletStr, (key, value) => {
        switch (key) {
          case "keyList":
            return value.map(PrivateKey.fromWif);
          case "keys":
            return Object.keys(value).reduce(
              (keys, key) => ({
                ...keys,
                [key]: KeyAuth.deserialize(value[key])
              }),
              {}
            );
          default:
            return value;
        }
      })
    );
  }

  constructor(
    public keyList: PrivateKey[] = [
      PrivateKey.fromSeed(
        Math.floor(Math.random() * 100000000 + 10000000) + Date.now().toString()
      )
    ]
  ) {}

  /**
   * Todo:
   *
   * @param {Cybex.Account} account
   * @memberof KeyStore
   */
  loginAccount(account: Cybex.Account) {
    assert(account);
    let active = this.keyList.find(
      privKey => !!KeyStore.checkAuth(privKey, account.active)
    );

    let memo = this.keyList.find(
      privKey => !!KeyStore.checkAuth(privKey, account.options.memo_key)
    );

    let owner = this.keyList.find(
      privKey => !!KeyStore.checkAuth(privKey, account.owner)
    );

    if (active) {
      this.keys.active = KeyStore.checkAuth(active, account.active) as KeyAuth;
    }

    if (owner) {
      this.keys.owner = KeyStore.checkAuth(owner, account.owner) as KeyAuth;
    }

    if (memo) {
      this.keys.memo = KeyStore.checkAuth(
        memo,
        account.options.memo_key
      ) as KeyAuth;
    }

    if (active || owner) {
      this.valid = true;
      this.account = account;
      return true;
    }
    return false;
  }

  checkAccount(account: Cybex.Account) {
    return (
      !!this.account &&
      !!account &&
      this.account.id === account.id &&
      this.account.options.memo_key === account.options.memo_key &&
      JSON.stringify(this.account.owner) === JSON.stringify(account.owner) &&
      JSON.stringify(this.account.active) === JSON.stringify(account.active)
    );
  }

  /**
   *
   *
   * @param {string} pubKeyStr
   * @returns {(KeyAuth | null)}
   * @memberof KeyStore
   */
  getPrivByPubStr(pubKeyStr: string): KeyAuth | null {
    for (let key of Object.values(this.keys)) {
      if (key.pubKeyStr === pubKeyStr) {
        return key;
      }
    }
    return null;
  }

  refresh() {
    return {
      ...this,
      updateAt: new Date()
    };
  }

  serilize(): string {
    let keyList = this.keyList.map(key => key.toWif());
    let keys = Object.keys(this.keys).reduce(
      (keys, key) => ({ ...keys, [key]: this.keys[key].serialize() }),
      {}
    );
    let walletStr = JSON.stringify({
      keyList,
      keys,
      account: this.account,
      createAt: this.createAt,
      updateAt: this.updateAt,
      valid: this.valid
    });
    return walletStr;
  }
}
