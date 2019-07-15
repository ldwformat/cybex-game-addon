export var MallActions;
(function (MallActions) {
    MallActions["LoadCountries"] = "[Mall] Load Countries";
    MallActions["LoadCountriesSuccess"] = "[Mall] Load Countries Success";
    MallActions["LoadCountriesFailed"] = "[Mall] Load Countries Failed";
    MallActions["LoadProvinces"] = "[Mall] LoadProvinces";
    MallActions["LoadProvincesSuccess"] = "[Mall] LoadProvincesSuccess";
    MallActions["LoadProvincesFailed"] = "[Mall] LoadProvincesFailed";
    MallActions["LoadAddressBook"] = "[Mall] LoadAddressBook";
    MallActions["LoadAddressBookSuccess"] = "[Mall] LoadAddressBookSuccess";
    MallActions["LoadAddressBookFailed"] = "[Mall] LoadAddressBookFailed";
    MallActions["AddAddress"] = "[Mall] AddAddress";
    MallActions["AddAddressSuccess"] = "[Mall] AddAddressSuccess";
    MallActions["AddAddressFailed"] = "[Mall] AddAddressFailed";
})(MallActions || (MallActions = {}));
// Load Countries
var MallLoadCountriesAction = /** @class */ (function () {
    function MallLoadCountriesAction() {
        this.type = MallActions.LoadCountries;
    }
    return MallLoadCountriesAction;
}());
export { MallLoadCountriesAction };
var MallLoadCountriesFailedAction = /** @class */ (function () {
    function MallLoadCountriesFailedAction() {
        this.type = MallActions.LoadCountriesFailed;
    }
    return MallLoadCountriesFailedAction;
}());
export { MallLoadCountriesFailedAction };
var MallLoadCountriesSuccessAction = /** @class */ (function () {
    function MallLoadCountriesSuccessAction(payload) {
        this.payload = payload;
        this.type = MallActions.LoadCountriesSuccess;
    }
    return MallLoadCountriesSuccessAction;
}());
export { MallLoadCountriesSuccessAction };
export var mallLoadCountries = function () { return ({
    type: MallActions.LoadCountries
}); };
export var mallLoadCountriesFailed = function () { return ({
    type: MallActions.LoadCountriesFailed
}); };
export var mallLoadCountriesSuccess = function (countries) { return ({
    type: MallActions.LoadCountriesSuccess,
    payload: countries
}); };
// Load Provinces
var MallLoadProvincesAction = /** @class */ (function () {
    function MallLoadProvincesAction(payload) {
        this.payload = payload;
        this.type = MallActions.LoadProvinces;
    }
    return MallLoadProvincesAction;
}());
export { MallLoadProvincesAction };
var MallLoadProvincesFailedAction = /** @class */ (function () {
    function MallLoadProvincesFailedAction() {
        this.type = MallActions.LoadProvincesFailed;
    }
    return MallLoadProvincesFailedAction;
}());
export { MallLoadProvincesFailedAction };
var MallLoadProvincesSuccessAction = /** @class */ (function () {
    function MallLoadProvincesSuccessAction(payload) {
        this.payload = payload;
        this.type = MallActions.LoadProvincesSuccess;
    }
    return MallLoadProvincesSuccessAction;
}());
export { MallLoadProvincesSuccessAction };
export var mallLoadProvincesFailed = function (param) { return ({
    type: MallActions.LoadProvincesFailed
}); };
export var mallLoadProvinces = function (countryID) { return ({
    type: MallActions.LoadProvinces,
    payload: countryID
}); };
export var mallLoadProvincesSuccess = function (provinceRes) { return ({
    type: MallActions.LoadProvincesSuccess,
    payload: provinceRes
}); };
// 地址簿有关
var MallLoadAddressBookAction = /** @class */ (function () {
    function MallLoadAddressBookAction() {
        this.type = MallActions.LoadAddressBook;
    }
    return MallLoadAddressBookAction;
}());
export { MallLoadAddressBookAction };
var MallLoadAddressBookFailedAction = /** @class */ (function () {
    function MallLoadAddressBookFailedAction() {
        this.type = MallActions.LoadAddressBookFailed;
    }
    return MallLoadAddressBookFailedAction;
}());
export { MallLoadAddressBookFailedAction };
var MallLoadAddressBookSuccessAction = /** @class */ (function () {
    function MallLoadAddressBookSuccessAction(payload) {
        this.payload = payload;
        this.type = MallActions.LoadAddressBookSuccess;
    }
    return MallLoadAddressBookSuccessAction;
}());
export { MallLoadAddressBookSuccessAction };
var MallAddAddressAction = /** @class */ (function () {
    function MallAddAddressAction(payload) {
        this.payload = payload;
        this.type = MallActions.AddAddress;
    }
    return MallAddAddressAction;
}());
export { MallAddAddressAction };
var MallAddAddressSuccessAction = /** @class */ (function () {
    function MallAddAddressSuccessAction() {
        this.type = MallActions.AddAddressSuccess;
    }
    return MallAddAddressSuccessAction;
}());
export { MallAddAddressSuccessAction };
var MallAddAddressFailedAction = /** @class */ (function () {
    function MallAddAddressFailedAction() {
        this.type = MallActions.AddAddressFailed;
    }
    return MallAddAddressFailedAction;
}());
export { MallAddAddressFailedAction };
export var mallLoadAddressBook = function () { return ({
    type: MallActions.LoadAddressBook
}); };
export var mallLoadAddressBookFailed = function () { return ({
    type: MallActions.LoadAddressBookFailed
}); };
export var mallLoadAddressBookSuccess = function (addressBook) { return ({
    type: MallActions.LoadAddressBookSuccess,
    payload: addressBook
}); };
export var mallAddAddress = function (addressForm) { return ({
    type: MallActions.AddAddress,
    payload: addressForm
}); };
export var mallAddAddressSuccess = function (addressInfo) { return ({
    type: MallActions.AddAddressSuccess
}); };
export var mallAddAddressFailed = function () { return ({
    type: MallActions.AddAddressFailed
}); };
