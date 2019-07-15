import PrivateKey from "../../../cybex/ecc/src/PrivateKey";
var KeyAuth = /** @class */ (function () {
    function KeyAuth() {
        this.fullAuth = null;
        this.privKey = null;
        this.pubKeyStr = null;
    }
    KeyAuth.fromKeyAuth = function (params) {
        var auth = new KeyAuth();
        auth.fullAuth = params.fullAuth;
        auth.privKey = params.privKey;
        auth.pubKeyStr = params.pubKeyStr;
        return auth;
    };
    KeyAuth.deserialize = function (keyAuthStr) {
        return KeyAuth.fromKeyAuth(JSON.parse(keyAuthStr, function (key, value) {
            if (key === "privKey") {
                return PrivateKey.fromWif(value);
            }
            return value;
        }));
    };
    KeyAuth.prototype.serialize = function () {
        return JSON.stringify(this, function (key, value) {
            if (key === "privKey") {
                return value.toWif();
            }
            return value;
        });
    };
    return KeyAuth;
}());
export { KeyAuth };
