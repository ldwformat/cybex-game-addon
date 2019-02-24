var Chore = /** @class */ (function () {
    function Chore() {
        this.countryList = [];
        this.proviceMap = {};
    }
    return Chore;
}());
export { Chore };
var MallState = /** @class */ (function () {
    function MallState() {
        this.chore = new Chore();
    }
    return MallState;
}());
export { MallState };
// 地址簿
