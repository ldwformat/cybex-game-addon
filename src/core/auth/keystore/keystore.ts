import PrivateKey from "../../../cybex/ecc/src/PrivateKey";
import { KeyAuth } from "./keyauth";

export enum KeyStoreMode {
  Wif,
  Seed
}

export class KeyStore {
  createAt = new Date();
  updateAt = new Date();
  keys: { [role: string]: KeyAuth } = {};

  constructor() {}

  refresh() {
    return {
      ...this,
      updateAt: new Date()
    };
  }
}
