var GatewayState = /** @class */ (function () {
    function GatewayState() {
        this.showModal = false;
        this.showWithdrawModal = false;
        this.info = [];
        this.currentAsset = undefined;
        this.depositInfoList = [];
        this.addressVerifyResult = {};
        this.withdrawSuccess = false;
    }
    return GatewayState;
}());
export { GatewayState };
// 地址簿
export var AddressVerifyState;
(function (AddressVerifyState) {
    AddressVerifyState[AddressVerifyState["Verifing"] = 0] = "Verifing";
    AddressVerifyState[AddressVerifyState["Valid"] = 1] = "Valid";
    AddressVerifyState[AddressVerifyState["Invalid"] = 2] = "Invalid";
})(AddressVerifyState || (AddressVerifyState = {}));
export var GatewayModalState;
(function (GatewayModalState) {
    GatewayModalState[GatewayModalState["Closed"] = 0] = "Closed";
    GatewayModalState[GatewayModalState["ShowDeposit"] = 1] = "ShowDeposit";
    GatewayModalState[GatewayModalState["ShowWithdraw"] = 2] = "ShowWithdraw";
})(GatewayModalState || (GatewayModalState = {}));
