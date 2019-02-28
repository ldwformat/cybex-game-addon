import PrivateKey from "../../../cybex/ecc/src/PrivateKey";
import { KeyAuth } from "./keyauth";
import assert from "assert";

export enum KeyStoreMode {
  Wif,
  Seed
}

export class KeyStore {
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

  static checkAuth(
    privKey: PrivateKey,
    authToCheck: Cybex.AccountAuthority | string
  ): KeyAuth | false {
    let pubKeyStr = privKey.toPublicKey().toPublicKeyString();
    if (typeof authToCheck === "string") {
      return (
        (pubKeyStr === authToCheck && { fullAuth: true, privKey, pubKeyStr }) ||
        false
      );
    }
    let validAuthList = authToCheck.key_auths.filter(
      key => key[0] === pubKeyStr
    );
    if (!validAuthList.length) {
      return false;
    }
    return {
      fullAuth:
        validAuthList.reduce((sum, key) => key[1] + sum, 0) >=
        authToCheck.weight_threshold,
      privKey,
      pubKeyStr
    };
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
    }
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
}