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
import { createSelector } from "reselect";
import BN from "bignumber.js";
export var selectApp = function (state) { return state.app; };
export var selectNoties = createSelector(selectApp, function (app) { return app.noties; });
export var selectLockupTime = createSelector(selectApp, function (app) { return app.lockupTime; });
export var selectPriceList = createSelector(selectApp, function (app) { return app.priceList; });
export var selectPriceListByAsset = function (asset) {
    return createSelector(selectPriceList, function (priceList) {
        var usdtPrice = priceList.find(function (price) { return price.name === asset; });
        if (!usdtPrice) {
            return [];
        }
        return priceList.map(function (price) { return (__assign({}, price, { rawValue: price.value, value: new BN(price.value)
                .div(usdtPrice.value)
                .toNumber() })); });
    });
};
export var selectGame = function (state) { return state.game; };
export var selectReferUrl = function (state) {
    return state.referUrl;
};
