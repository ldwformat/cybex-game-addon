var AddonStorage = /** @class */ (function () {
    function AddonStorage(prefix) {
        if (prefix === void 0) { prefix = AddonStorage.DefaultPrefix; }
        this.prefix = prefix;
    }
    AddonStorage.prototype.storeKey = function (key) {
        return this.prefix + "_" + key;
    };
    AddonStorage.prototype.setItem = function (key, item) {
        var toItem = typeof item === "string"
            ? item
            : typeof item["serialize"] !== "undefined"
                ? item.serialize()
                : JSON.stringify(item);
        localStorage.setItem(this.storeKey(key), toItem);
        return toItem;
    };
    AddonStorage.prototype.getItem = function (key) {
        return localStorage.getItem(this.storeKey(key));
    };
    AddonStorage.prototype.removeItem = function (key) {
        return localStorage.removeItem(this.storeKey(key));
    };
    AddonStorage.prototype.cleanStorage = function () {
        var keysToBeRemoved = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (!key) {
                continue;
            }
            if (key.startsWith(this.prefix)) {
                keysToBeRemoved.push(key);
            }
        }
        keysToBeRemoved.forEach(function (key) { return localStorage.removeItem(key); });
    };
    AddonStorage.DefaultPrefix = "$$CybexAddon";
    AddonStorage.CommonKeys = {
        KeyStore: "#KeyStore",
        AccountName: "#AccountName",
        UnlockCount: "#UnlockCount",
        PriceList: "#PriceList"
    };
    return AddonStorage;
}());
export { AddonStorage };
export var addonStorage = new AddonStorage();
