/* tslint:disable */
console.info("Hello Cybex");
// For some crypto lib
import * as process from "process";
if (typeof window !== undefined) {
    window["global"] = window;
    var Buffer_1 = require("buffer/").Buffer;
    window["process"] = process;
    window["Buffer"] = Buffer_1;
}
import * as Utils from "./utils";
import { authLogin, authLogout, selectAuth, selectAuthSet, selectCurrentAccount, selectCurrentKeystore, selectAuthStatus, selectCurrentAccountInfo, selectBalances } from "./core/auth";
import { mallLoadAddressBook, mallLoadProvinces, mallLoadCountries, mallAddAddress } from "./core/mall";
import { gatewayLoadGatewayInfo, gatewaySelectAsset, gatewayLoadDepositInfo } from "./core/gateway";
import { referLoadReferInfo, referAdd, referHidePoster } from "./core/refer";
import { CybexAddon } from "./cybex-addon";
export var Actions = {
    authLogin: authLogin,
    authLogout: authLogout,
    mallLoadAddressBook: mallLoadAddressBook,
    mallLoadProvinces: mallLoadProvinces,
    mallLoadCountries: mallLoadCountries,
    mallAddAddress: mallAddAddress,
    gatewayLoadGatewayInfo: gatewayLoadGatewayInfo,
    gatewaySelectAsset: gatewaySelectAsset,
    gatewayLoadDepositInfo: gatewayLoadDepositInfo,
    referLoadReferInfo: referLoadReferInfo,
    referAdd: referAdd,
    referHidePoster: referHidePoster
};
var Selectors = {
    selectAuth: selectAuth,
    selectAuthSet: selectAuthSet,
    selectCurrentAccount: selectCurrentAccount,
    selectCurrentKeystore: selectCurrentKeystore,
    selectAuthStatus: selectAuthStatus,
    selectCurrentAccountInfo: selectCurrentAccountInfo,
    selectBalances: selectBalances
};
export { CybexAddon, Utils, Selectors };
export default CybexAddon;
