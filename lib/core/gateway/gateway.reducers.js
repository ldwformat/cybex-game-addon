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
import { GatewayState } from "./gateway.models";
import { GatewayActions } from "./gateway.actions";
import { AuthActions } from "../auth";
var isSameDpsInfo = function (left, right) {
    return Object.keys(left).every(function (key) { return left[key] === right[key]; });
};
export var gateway = function (state, action) {
    if (state === void 0) { state = new GatewayState(); }
    switch (action.type) {
        case AuthActions.Login:
        case AuthActions.RegImpl:
            return new GatewayState();
        case GatewayActions.SelectAsset:
            return __assign({}, state, { currentAsset: action.payload });
        case GatewayActions.LoadDepositInfoSuccess:
            return __assign({}, state, { depositInfoList: state.depositInfoList.find(function (info) {
                    return isSameDpsInfo(info, action.payload);
                })
                    ? state.depositInfoList
                    : state.depositInfoList.concat([action.payload]) });
        case GatewayActions.LoadGatewayInfoSuccess:
            return __assign({}, state, { info: action.payload });
        default:
            return state;
    }
};
