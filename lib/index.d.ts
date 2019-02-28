import * as Utils from "./utils";
import { CybexAddon } from "./cybex-addon";
export declare const Actions: {
    authLogin: (param: import("./core/auth").IAuthParams) => import("./core/auth").AuthLoginAction;
    authLogout: import("redux").ActionCreator<import("./core/auth").AuthLogoutAction>;
    mallLoadAddressBook: () => import("./core/mall").MallLoadAddressBookAction;
    mallLoadProvinces: (countryID: number) => import("./core/mall").MallLoadProvincesAction;
    mallLoadCountries: () => import("./core/mall").MallLoadCountriesAction;
    mallAddAddress: (addressForm: Backend.AddressFormFields) => import("./core/mall").MallAddAddressAction;
    gatewayLoadGatewayInfo: () => import("./core/gateway").GatewayLoadGatewayInfoAction;
    gatewaySelectAsset: (asset: string) => import("./core/gateway").GatewaySelectAssetAction;
    gatewayLoadDepositInfo: (asset: string) => import("./core/gateway").GatewayLoadDepositInfoAction;
    referLoadReferInfo: () => import("./core/refer").ReferLoadReferInfoAction;
    referAdd: (form: Backend.SetReferForm) => import("./core/refer").ReferAddAction;
};
export { CybexAddon, Utils };
export default CybexAddon;
