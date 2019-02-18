import PrivateKey from "../../../cybex/ecc/src/PrivateKey";
import { KeyAuth } from "./keyauth";

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
      this.keys.active = KeyStore.checkAuth(owner, account.owner) as KeyAuth;
    }

    if (memo) {
      this.keys.active = KeyStore.checkAuth(
        memo,
        account.options.memo_key
      ) as KeyAuth;
    }

    if (active || owner) {
      this.valid = true;
    }
  }

  refresh() {
    return {
      ...this,
      updateAt: new Date()
    };
  }
}
