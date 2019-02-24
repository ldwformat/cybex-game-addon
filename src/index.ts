/* tslint:disable */
console.info("Hello Cybex");

// For some crypto lib
import * as process from "process";
declare const require;
if (typeof window !== undefined) {
  window["global"] = window;
  const Buffer = require("buffer/").Buffer;
  window["process"] = process;
  window["Buffer"] = Buffer;
}
// export * from "./core/index";
// export * from "./pages/index";

import * as Utils from "./utils";

import {
  authLogin,
  authLoginSuccess,
  authLoginFailed,
  authLogout,
  authUnauthed
} from "./core/auth";

import {
  mallLoadAddressBook,
  mallLoadProvinces,
  mallLoadCountries,
  mallAddAddress
} from "./core/mall";
import {
  gatewayLoadGatewayInfo,
  gatewaySelectAsset,
  gatewayLoadDepositInfo
} from "./core/gateway";

import { referLoadReferInfo, referAdd } from "./core/refer";
import { CybexAddon } from "./cybex-addon";
export const Actions = {
  authLogin,
  authLogout,
  mallLoadAddressBook,
  mallLoadProvinces,
  mallLoadCountries,
  mallAddAddress,
  gatewayLoadGatewayInfo,
  gatewaySelectAsset,
  gatewayLoadDepositInfo,
  referLoadReferInfo,
  referAdd
};

export { CybexAddon, Utils };
export default CybexAddon;
