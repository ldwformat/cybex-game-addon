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
import PrivateKey from "../../../cybex/ecc/src/PrivateKey";
import assert from "assert";
export var KeyStoreMode;
(function (KeyStoreMode) {
    KeyStoreMode[KeyStoreMode["Wif"] = 0] = "Wif";
    KeyStoreMode[KeyStoreMode["Seed"] = 1] = "Seed";
})(KeyStoreMode || (KeyStoreMode = {}));
var KeyStore = /** @class */ (function () {
    function KeyStore(keyList) {
        if (keyList === void 0) { keyList = [
            PrivateKey.fromSeed(Math.floor(Math.random() * 100000000 + 10000000) + Date.now().toString())
        ]; }
        this.keyList = keyList;
        this.createAt = new Date();
        this.updateAt = new Date();
        this.account = null;
        this.valid = false;
        this.keys = {};
    }
    Object.defineProperty(KeyStore.prototype, "activeKey", {
        get: function () {
            return this.keys["active"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyStore.prototype, "ownerKey", {
        get: function () {
            return this.keys["owner"];
        },
        enumerable: true,
        configurable: true
    });
    KeyStore.checkAuth = function (privKey, authToCheck) {
        var pubKeyStr = privKey.toPublicKey().toPublicKeyString();
        if (typeof authToCheck === "string") {
            return ((pubKeyStr === authToCheck && { fullAuth: true, privKey: privKey, pubKeyStr: pubKeyStr }) ||
                false);
        }
        var validAuthList = authToCheck.key_auths.filter(function (key) { return key[0] === pubKeyStr; });
        if (!validAuthList.length) {
            return false;
        }
        return {
            fullAuth: validAuthList.reduce(function (sum, key) { return key[1] + sum; }, 0) >=
                authToCheck.weight_threshold,
            privKey: privKey,
            pubKeyStr: pubKeyStr
        };
    };
    /**
     * Todo:
     *
     * @param {Cybex.Account} account
     * @memberof KeyStore
     */
    KeyStore.prototype.loginAccount = function (account) {
        assert(account);
        var active = this.keyList.find(function (privKey) { return !!KeyStore.checkAuth(privKey, account.active); });
        var memo = this.keyList.find(function (privKey) { return !!KeyStore.checkAuth(privKey, account.options.memo_key); });
        var owner = this.keyList.find(function (privKey) { return !!KeyStore.checkAuth(privKey, account.owner); });
        if (active) {
            this.keys.active = KeyStore.checkAuth(active, account.active);
        }
        if (owner) {
            this.keys.owner = KeyStore.checkAuth(owner, account.owner);
        }
        if (memo) {
            this.keys.memo = KeyStore.checkAuth(memo, account.options.memo_key);
        }
        if (active || owner) {
            this.valid = true;
        }
    };
    /**
     *
     *
     * @param {string} pubKeyStr
     * @returns {(KeyAuth | null)}
     * @memberof KeyStore
     */
    KeyStore.prototype.getPrivByPubStr = function (pubKeyStr) {
        for (var _i = 0, _a = Object.values(this.keys); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key.pubKeyStr === pubKeyStr) {
                return key;
            }
        }
        return null;
    };
    KeyStore.prototype.refresh = function () {
        return __assign({}, this, { updateAt: new Date() });
    };
    return KeyStore;
}());
export { KeyStore };
