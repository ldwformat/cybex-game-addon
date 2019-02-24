import { KeyStore } from "../core/auth/keystore/keystore";
import PrivateKey from "../cybex/ecc/src/PrivateKey";
var roles = ["active", "owner", "memo"];
export var authCheckFromSeed = function (_a, account) {
    var accountName = _a.accountName, password = _a.password;
    var keyStore = new KeyStore(roles.map(function (role) { return PrivateKey.fromSeed("" + accountName + role + password); }));
    keyStore.loginAccount(account);
    if (keyStore.valid) {
        return keyStore;
    }
    return null;
};
