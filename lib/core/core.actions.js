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
    CoreActions["PushNoti"] = "[CoreActions] PushNoti";
    CoreActions["RemoveNoti"] = "[CoreActions] RemoveNoti";
})(CoreActions || (CoreActions = {}));
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
export var corePushNoti = function (noti, options) {
    if (options === void 0) { options = {}; }
    return ({
        type: CoreActions.PushNoti,
        payload: __assign({}, new Noti(noti, options))
    });
};
export var coreRemoveNoti = function (key) {
    return ({ type: CoreActions.RemoveNoti, payload: key });
};
