var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { KeyStore } from "../core/auth/keystore/keystore";
import PrivateKey from "../cybex/ecc/src/PrivateKey";
var roles = ["active", "owner", "memo"];
export var getKeyStore = function (accountName, password) {
    return new KeyStore(roles.map(function (role) { return PrivateKey.fromSeed("" + accountName + role + password); }));
};
export var getKeySet = function (accountName, password) {
    return roles.reduce(function (set, role) {
        var _a;
        return (__assign({}, set, (_a = {}, _a[role] = PrivateKey.fromSeed("" + accountName + role + password)
            .toPublicKey()
            .toPublicKeyString(), _a)));
    }, {});
};
export var authCheckFromSeed = function (_a, account) {
    var accountName = _a.accountName, password = _a.password;
    var keyStore = getKeyStore(accountName, password);
    keyStore.loginAccount(account);
    if (keyStore.valid) {
        return keyStore;
    }
    return null;
};
