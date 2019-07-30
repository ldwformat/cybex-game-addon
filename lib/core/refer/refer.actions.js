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
import { withNotiOptions } from "../core.models";
export var ReferActions;
(function (ReferActions) {
    ReferActions["LoadReferInfo"] = "[Refer] LoadReferInfo";
    ReferActions["LoadReferInfoSuccess"] = "[Refer] LoadReferInfoSuccess";
    ReferActions["LoadReferInfoFailed"] = "[Refer] LoadReferInfoFailed";
    ReferActions["LoadRebateFailed"] = "[Refer] LoadRebateFailed";
    ReferActions["LoadRebateSuccess"] = "[Refer] LoadRebateSuccess";
    ReferActions["LoadRebate"] = "[Refer] LoadRebate";
    ReferActions["Add"] = "[Refer] Add";
    ReferActions["AddSuccess"] = "[Refer] AddSuccess";
    ReferActions["AddFailed"] = "[Refer] AddFailed";
    ReferActions["HidePoster"] = "[Refer] HidePoster";
})(ReferActions || (ReferActions = {}));
var ReferLoadReferInfoAction = /** @class */ (function () {
    function ReferLoadReferInfoAction() {
        this.type = ReferActions.LoadReferInfo;
    }
    return ReferLoadReferInfoAction;
}());
export { ReferLoadReferInfoAction };
var ReferLoadReferInfoFailedAction = /** @class */ (function () {
    function ReferLoadReferInfoFailedAction() {
        this.type = ReferActions.LoadReferInfoFailed;
    }
    return ReferLoadReferInfoFailedAction;
}());
export { ReferLoadReferInfoFailedAction };
var ReferLoadReferInfoSuccessAction = /** @class */ (function () {
    function ReferLoadReferInfoSuccessAction(payload) {
        this.payload = payload;
        this.type = ReferActions.LoadReferInfoSuccess;
    }
    return ReferLoadReferInfoSuccessAction;
}());
export { ReferLoadReferInfoSuccessAction };
var ReferLoadRebateAction = /** @class */ (function () {
    function ReferLoadRebateAction() {
        this.type = ReferActions.LoadRebate;
    }
    return ReferLoadRebateAction;
}());
export { ReferLoadRebateAction };
var ReferLoadRebateSuccessAction = /** @class */ (function () {
    function ReferLoadRebateSuccessAction(payload) {
        this.payload = payload;
        this.type = ReferActions.LoadRebateSuccess;
    }
    return ReferLoadRebateSuccessAction;
}());
export { ReferLoadRebateSuccessAction };
var ReferLoadRebateFailedAction = /** @class */ (function () {
    function ReferLoadRebateFailedAction() {
        this.type = ReferActions.LoadRebateFailed;
    }
    return ReferLoadRebateFailedAction;
}());
export { ReferLoadRebateFailedAction };
var ReferAddAction = /** @class */ (function () {
    function ReferAddAction(payload) {
        this.payload = payload;
        this.type = ReferActions.Add;
    }
    return ReferAddAction;
}());
export { ReferAddAction };
var ReferAddSuccessAction = /** @class */ (function () {
    function ReferAddSuccessAction(payload) {
        if (payload === void 0) { payload = withNotiOptions(); }
        this.payload = payload;
        this.type = ReferActions.AddSuccess;
    }
    return ReferAddSuccessAction;
}());
export { ReferAddSuccessAction };
var ReferAddFailedAction = /** @class */ (function () {
    function ReferAddFailedAction(payload) {
        if (payload === void 0) { payload = withNotiOptions(); }
        this.payload = payload;
        this.type = ReferActions.AddFailed;
    }
    return ReferAddFailedAction;
}());
export { ReferAddFailedAction };
var ReferHidePosterAction = /** @class */ (function () {
    function ReferHidePosterAction(payload) {
        this.payload = payload;
        this.type = ReferActions.HidePoster;
    }
    return ReferHidePosterAction;
}());
export { ReferHidePosterAction };
export var referLoadReferInfo = function () { return ({
    type: ReferActions.LoadReferInfo
}); };
export var referLoadReferInfoFailed = function () { return ({
    type: ReferActions.LoadReferInfoFailed
}); };
export var referLoadReferInfoSuccess = function (referInfo) { return ({
    type: ReferActions.LoadReferInfoSuccess,
    payload: referInfo
}); };
export var referLoadRebate = function () { return (__assign({}, new ReferLoadRebateAction())); };
export var referLoadRebateFailed = function () { return (__assign({}, new ReferLoadRebateFailedAction())); };
export var referLoadRebateSuccess = function (rebateDetails) { return (__assign({}, new ReferLoadRebateSuccessAction(rebateDetails))); };
export var referAdd = function (form) { return ({
    type: ReferActions.Add,
    payload: form
}); };
export var referAddSuccess = function (withNoti) {
    if (withNoti === void 0) { withNoti = false; }
    return ({
        type: ReferActions.AddSuccess,
        payload: withNotiOptions(withNoti)
    });
};
export var referAddFailed = function (withNoti) {
    if (withNoti === void 0) { withNoti = false; }
    return ({
        type: ReferActions.AddFailed,
        payload: withNotiOptions(withNoti)
    });
};
export var referHidePoster = function (isShowPoster) {
    if (isShowPoster === void 0) { isShowPoster = false; }
    return ({
        type: ReferActions.HidePoster,
        payload: isShowPoster
    });
};
