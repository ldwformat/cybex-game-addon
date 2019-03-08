import { withNotiOptions } from "../core.models";
export var ReferActions;
(function (ReferActions) {
    ReferActions["LoadReferInfo"] = "[Refer] LoadReferInfo";
    ReferActions["LoadReferInfoSuccess"] = "[Refer] LoadReferInfoSuccess";
    ReferActions["LoadReferInfoFailed"] = "[Refer] LoadReferInfoFailed";
    ReferActions["Add"] = "[Refer] Add";
    ReferActions["AddSuccess"] = "[Refer] AddSuccess";
    ReferActions["AddFailed"] = "[Refer] AddFailed";
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
