import { IAuthParams } from "../core/auth";
import { KeyStore } from "../core/auth/keystore/keystore";
import PrivateKey from "../cybex/ecc/src/PrivateKey";

const roles = ["active", "owner", "memo"];
type KeySet = {
  active: string;
  owner: string;
  memo: string;
};
export const getKeyStore = (accountName: string, password: string) => {
  return new KeyStore(
    roles.map(role => PrivateKey.fromSeed(`${accountName}${role}${password}`))
  );
};
export const getKeySet = (accountName: string, password: string) => {
  return roles.reduce(
    (set, role) => ({
      ...set,
      [role]: PrivateKey.fromSeed(`${accountName}${role}${password}`)
        .toPublicKey()
        .toPublicKeyString()
    }),
    {} as KeySet
  );
};
export const authCheckFromSeed: (
  authParams: IAuthParams,
  account: Cybex.Account
) => null | KeyStore = ({ accountName, password }, account) => {
  let keyStore = getKeyStore(accountName, password);
  keyStore.loginAccount(account);
  if (keyStore.valid) {
    return keyStore;
  }
  return null;
};
