import { IAuthParams } from "../core/auth";
import { KeyStore } from "../core/auth/keystore/keystore";
import PrivateKey from "../cybex/ecc/src/PrivateKey";

const roles = ["active", "owner", "memo"];
export const authCheckFromSeed: (
  authParams: IAuthParams,
  account: Cybex.Account
) => null | KeyStore = ({ accountName, password }, account) => {
  let keyStore = new KeyStore(
    roles.map(role => PrivateKey.fromSeed(`${accountName}${role}${password}`))
  );
  keyStore.loginAccount(account);
  if (keyStore.valid) {
    return keyStore;
  }
  return null;
};
