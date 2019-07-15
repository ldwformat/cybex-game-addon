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
import { Noti } from "./core.models";
export var CoreActions;
(function (CoreActions) {
    CoreActions["SetRefUrl"] = "[CoreActions] SetRefUrl";
    CoreActions["LoadPriceList"] = "[CoreActions] LoadPriceList";
    CoreActions["LoadPriceListSuccess"] = "[CoreActions] LoadPriceListSuccess";
    CoreActions["LoadPriceListFailed"] = "[CoreActions] LoadPriceListFailed";
    CoreActions["RefreshLockup"] = "[CoreActions] RefreshLockup";
    CoreActions["PushNoti"] = "[CoreActions] PushNoti";
    CoreActions["RemoveNoti"] = "[CoreActions] RemoveNoti";
})(CoreActions || (CoreActions = {}));
var ActionCoreLoadPriceList = /** @class */ (function () {
    function ActionCoreLoadPriceList() {
        this.type = CoreActions.LoadPriceList;
    }
    return ActionCoreLoadPriceList;
}());
export { ActionCoreLoadPriceList };
var ActionCoreRefreshLockup = /** @class */ (function () {
    function ActionCoreRefreshLockup() {
        this.type = CoreActions.RefreshLockup;
    }
    return ActionCoreRefreshLockup;
}());
export { ActionCoreRefreshLockup };
var ActionCoreLoadPriceListSuccess = /** @class */ (function () {
    function ActionCoreLoadPriceListSuccess(payload) {
        this.payload = payload;
        this.type = CoreActions.LoadPriceListSuccess;
    }
    return ActionCoreLoadPriceListSuccess;
}());
export { ActionCoreLoadPriceListSuccess };
var ActionCorePushNoti = /** @class */ (function () {
    function ActionCorePushNoti(payload) {
        this.payload = payload;
        this.type = CoreActions.PushNoti;
    }
    return ActionCorePushNoti;
}());
export { ActionCorePushNoti };
var ActionCoreRemoveNoti = /** @class */ (function () {
    function ActionCoreRemoveNoti(payload) {
        this.payload = payload;
        this.type = CoreActions.RemoveNoti;
    }
    return ActionCoreRemoveNoti;
}());
export { ActionCoreRemoveNoti };
var ActionSetRefUrl = /** @class */ (function () {
    function ActionSetRefUrl(payload) {
        this.payload = payload;
        this.type = CoreActions.SetRefUrl;
    }
    return ActionSetRefUrl;
}());
export { ActionSetRefUrl };
export var loadPriceList = function () { return (__assign({}, new ActionCoreLoadPriceList())); };
export var coreRefreshLockup = function () { return (__assign({}, new ActionCoreRefreshLockup())); };
export var loadPriceListSuccess = function (priceList) { return (__assign({}, new ActionCoreLoadPriceListSuccess(priceList))); };
export var corePushNoti = function (noti, options) {
    if (options === void 0) { options = {}; }
    return {
        type: CoreActions.PushNoti,
        payload: __assign({}, new Noti(noti, options))
    };
};
export var coreRemoveNoti = function (key) {
    return ({ type: CoreActions.RemoveNoti, payload: key });
};
export var setRefUrl = function (url) { return (__assign({}, new ActionSetRefUrl(url))); };
