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
    var _a, _b, _c, _d;
    if (state === void 0) { state = new GatewayState(); }
    switch (action.type) {
        case GatewayActions.GatewayModalShow:
            return __assign({}, state, { showModal: true });
        case GatewayActions.GatewayModalClose:
            return __assign({}, state, { showModal: false });
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
        case GatewayActions.VerifyAddressSuccess:
            return __assign({}, state, { addressVerifyResult: __assign({}, state.addressVerifyResult, (_a = {}, _a[action.payload.coinType] = __assign({}, state.addressVerifyResult[action.payload.coinType], (_b = {}, _b[action.payload.address] = true, _b)), _a)) });
        case GatewayActions.VerifyAddressFailed:
            return __assign({}, state, { addressVerifyResult: __assign({}, state.addressVerifyResult, (_c = {}, _c[action.payload.coinType] = __assign({}, state.addressVerifyResult[action.payload.coinType], (_d = {}, _d[action.payload.address] = false, _d)), _c)) });
        case GatewayActions.GatewayWithdrawModalShow:
            return __assign({}, state, { showWithdrawModal: true });
        case GatewayActions.GatewayWithdrawModalClose:
            return __assign({}, state, { showWithdrawModal: false });
        default:
            return state;
    }
};
