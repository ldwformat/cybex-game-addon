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
export var GatewayActions;
(function (GatewayActions) {
    GatewayActions["GatewayModalShow"] = "[Gateway] GatewayModalShow";
    GatewayActions["GatewayModalClose"] = "[Gateway] GatewayModalClose";
    GatewayActions["GatewayWithdrawModalShow"] = "[Gateway] GatewayWithdrawModalShow";
    GatewayActions["GatewayWithdrawModalClose"] = "[Gateway] GatewayWithdrawModalClose";
    GatewayActions["LoadGatewayInfo"] = "[Gateway] LoadGatewayInfo";
    GatewayActions["LoadGatewayInfoSuccess"] = "[Gateway] LoadGatewayInfoSuccess";
    GatewayActions["LoadGatewayInfoFailed"] = "[Gateway] LoadGatewayInfoFailed";
    GatewayActions["LoadDepositInfo"] = "[Gateway] LoadDepositInfo";
    GatewayActions["LoadDepositInfoSuccess"] = "[Gateway] LoadDepositInfoSuccess";
    GatewayActions["LoadDepositInfoFailed"] = "[Gateway] LoadDepositInfoFailed";
    GatewayActions["VerifyAddress"] = "[Gateway] VerifyAddress";
    GatewayActions["VerifyAddressSuccess"] = "[Gateway] VerifyAddressSuccess";
    GatewayActions["VerifyAddressFailed"] = "[Gateway] VerifyAddressFailed";
    GatewayActions["Withdraw"] = "[Gateway] Withdraw";
    GatewayActions["WithdrawSuccess"] = "[Gateway] WithdrawSuccess";
    GatewayActions["WithdrawFailed"] = "[Gateway] WithdrawFailed";
    GatewayActions["SelectAsset"] = "[Gateway] SelectAsset";
    GatewayActions["SelectFirstAsset"] = "[Gateway] SelectFirstAsset";
})(GatewayActions || (GatewayActions = {}));
var GatewayModalShowAction = /** @class */ (function () {
    function GatewayModalShowAction() {
        this.type = GatewayActions.GatewayModalShow;
    }
    return GatewayModalShowAction;
}());
export { GatewayModalShowAction };
var GatewayModalCloseAction = /** @class */ (function () {
    function GatewayModalCloseAction() {
        this.type = GatewayActions.GatewayModalClose;
    }
    return GatewayModalCloseAction;
}());
export { GatewayModalCloseAction };
var GatewayWithdrawModalShowAction = /** @class */ (function () {
    function GatewayWithdrawModalShowAction() {
        this.type = GatewayActions.GatewayWithdrawModalShow;
    }
    return GatewayWithdrawModalShowAction;
}());
export { GatewayWithdrawModalShowAction };
var GatewayWithdrawModalCloseAction = /** @class */ (function () {
    function GatewayWithdrawModalCloseAction() {
        this.type = GatewayActions.GatewayWithdrawModalClose;
    }
    return GatewayWithdrawModalCloseAction;
}());
export { GatewayWithdrawModalCloseAction };
var GatewaySelectAssetAction = /** @class */ (function () {
    function GatewaySelectAssetAction(payload) {
        this.payload = payload;
        this.type = GatewayActions.SelectAsset;
    }
    return GatewaySelectAssetAction;
}());
export { GatewaySelectAssetAction };
var GatewaySelectFirstAssetAction = /** @class */ (function () {
    function GatewaySelectFirstAssetAction() {
        this.type = GatewayActions.SelectFirstAsset;
    }
    return GatewaySelectFirstAssetAction;
}());
export { GatewaySelectFirstAssetAction };
var GatewayLoadGatewayInfoAction = /** @class */ (function () {
    function GatewayLoadGatewayInfoAction() {
        this.type = GatewayActions.LoadGatewayInfo;
    }
    return GatewayLoadGatewayInfoAction;
}());
export { GatewayLoadGatewayInfoAction };
var GatewayLoadGatewayInfoFailedAction = /** @class */ (function () {
    function GatewayLoadGatewayInfoFailedAction() {
        this.type = GatewayActions.LoadGatewayInfoFailed;
    }
    return GatewayLoadGatewayInfoFailedAction;
}());
export { GatewayLoadGatewayInfoFailedAction };
var GatewayLoadGatewayInfoSuccessAction = /** @class */ (function () {
    function GatewayLoadGatewayInfoSuccessAction(payload) {
        this.payload = payload;
        this.type = GatewayActions.LoadGatewayInfoSuccess;
    }
    return GatewayLoadGatewayInfoSuccessAction;
}());
export { GatewayLoadGatewayInfoSuccessAction };
var GatewayLoadDepositInfoAction = /** @class */ (function () {
    function GatewayLoadDepositInfoAction(payload) {
        this.payload = payload;
        this.type = GatewayActions.LoadDepositInfo;
    }
    return GatewayLoadDepositInfoAction;
}());
export { GatewayLoadDepositInfoAction };
var GatewayLoadDepositInfoSuccessAction = /** @class */ (function () {
    function GatewayLoadDepositInfoSuccessAction(payload) {
        this.payload = payload;
        this.type = GatewayActions.LoadDepositInfoSuccess;
    }
    return GatewayLoadDepositInfoSuccessAction;
}());
export { GatewayLoadDepositInfoSuccessAction };
var GatewayLoadDepositInfoFailedAction = /** @class */ (function () {
    function GatewayLoadDepositInfoFailedAction() {
        this.type = GatewayActions.LoadDepositInfoFailed;
    }
    return GatewayLoadDepositInfoFailedAction;
}());
export { GatewayLoadDepositInfoFailedAction };
// 验证地址
var GatewayVerifyAddressAction = /** @class */ (function () {
    function GatewayVerifyAddressAction(payload) {
        this.payload = payload;
        this.type = GatewayActions.VerifyAddress;
    }
    return GatewayVerifyAddressAction;
}());
export { GatewayVerifyAddressAction };
var GatewayVerifyAddressSuccessAction = /** @class */ (function () {
    function GatewayVerifyAddressSuccessAction(payload) {
        this.payload = payload;
        this.type = GatewayActions.VerifyAddressSuccess;
    }
    return GatewayVerifyAddressSuccessAction;
}());
export { GatewayVerifyAddressSuccessAction };
var GatewayVerifyAddressFailedAction = /** @class */ (function () {
    function GatewayVerifyAddressFailedAction(payload) {
        this.payload = payload;
        this.type = GatewayActions.VerifyAddressFailed;
    }
    return GatewayVerifyAddressFailedAction;
}());
export { GatewayVerifyAddressFailedAction };
// 提币
var GatewayWithdrawAction = /** @class */ (function () {
    function GatewayWithdrawAction(payload) {
        this.payload = payload;
        this.type = GatewayActions.Withdraw;
    }
    return GatewayWithdrawAction;
}());
export { GatewayWithdrawAction };
var GatewayWithdrawSuccessAction = /** @class */ (function () {
    function GatewayWithdrawSuccessAction() {
        this.type = GatewayActions.WithdrawSuccess;
    }
    return GatewayWithdrawSuccessAction;
}());
export { GatewayWithdrawSuccessAction };
var GatewayWithdrawFailedAction = /** @class */ (function () {
    function GatewayWithdrawFailedAction() {
        this.type = GatewayActions.WithdrawFailed;
    }
    return GatewayWithdrawFailedAction;
}());
export { GatewayWithdrawFailedAction };
// ActionCreators
export var gatewayModalShow = function () { return ({
    type: GatewayActions.GatewayModalShow
}); };
export var gatewayModalClose = function () { return ({
    type: GatewayActions.GatewayModalClose
}); };
export var gatewayWithdrawModalShow = function () { return (__assign({}, new GatewayWithdrawModalShowAction())); };
export var gatewayWithdrawModalClose = function () { return (__assign({}, new GatewayWithdrawModalCloseAction())); };
export var gatewayLoadGatewayInfo = function () { return ({
    type: GatewayActions.LoadGatewayInfo
}); };
export var gatewayLoadGatewayInfoFailed = function () { return ({
    type: GatewayActions.LoadGatewayInfoFailed
}); };
export var gatewayLoadGatewayInfoSuccess = function (gatewayInfo) { return ({
    type: GatewayActions.LoadGatewayInfoSuccess,
    payload: gatewayInfo
}); };
export var gatewayLoadDepositInfo = function (asset) { return ({
    type: GatewayActions.LoadDepositInfo,
    payload: asset
}); };
export var gatewayLoadDepositInfoSuccess = function (depositAddress) { return ({
    payload: depositAddress,
    type: GatewayActions.LoadDepositInfoSuccess
}); };
export var gatewayLoadDepositInfoFailed = function () { return ({
    type: GatewayActions.LoadDepositInfoFailed
}); };
export var gatewaySelectAsset = function (asset) { return ({
    type: GatewayActions.SelectAsset,
    payload: asset
}); };
export var gatewaySelectFirstAsset = function () { return (__assign({}, new GatewaySelectFirstAssetAction())); };
export var gatewayVerifyAddress = function (coinType, address) { return (__assign({}, new GatewayVerifyAddressAction({ coinType: coinType, address: address }))); };
export var gatewayVerifyAddressSuccess = function (coinType, address) { return (__assign({}, new GatewayVerifyAddressSuccessAction({ coinType: coinType, address: address }))); };
export var gatewayVerifyAddressFailed = function (coinType, address) { return (__assign({}, new GatewayVerifyAddressFailedAction({ coinType: coinType, address: address }))); };
export var gatewayWithdraw = function (params) { return (__assign({}, new GatewayWithdrawAction(params))); };
export var gatewayWithdrawSuccess = function () { return (__assign({}, new GatewayWithdrawSuccessAction())); };
export var gatewayWithdrawFailed = function () { return (__assign({}, new GatewayWithdrawFailedAction())); };
