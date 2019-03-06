export var GatewayActions;
(function (GatewayActions) {
    GatewayActions["LoadGatewayInfo"] = "[Gateway] LoadGatewayInfo";
    GatewayActions["LoadGatewayInfoSuccess"] = "[Gateway] LoadGatewayInfoSuccess";
    GatewayActions["LoadGatewayInfoFailed"] = "[Gateway] LoadGatewayInfoFailed";
    GatewayActions["LoadDepositInfo"] = "[Gateway] LoadDepositInfo";
    GatewayActions["LoadDepositInfoSuccess"] = "[Gateway] LoadDepositInfoSuccess";
    GatewayActions["LoadDepositInfoFailed"] = "[Gateway] LoadDepositInfoFailed";
    GatewayActions["SelectAsset"] = "[Gateway] SelectAsset";
})(GatewayActions || (GatewayActions = {}));
var GatewaySelectAssetAction = /** @class */ (function () {
    function GatewaySelectAssetAction(payload) {
        this.payload = payload;
        this.type = GatewayActions.SelectAsset;
    }
    return GatewaySelectAssetAction;
}());
export { GatewaySelectAssetAction };
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
