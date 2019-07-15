import * as Utils from "./utils";
import { CybexAddon } from "./cybex-addon";
export declare const Actions: {
    authLogin: (param: import("./core/auth").IAuthParams) => import("./core/auth").AuthLoginAction;
    authLogout: import("redux").ActionCreator<import("./core/auth").AuthLogoutAction>;
    mallLoadAddressBook: () => import("./core/mall").MallLoadAddressBookAction;
    mallLoadProvinces: (countryID: number) => import("./core/mall").MallLoadProvincesAction;
    mallLoadCountries: () => import("./core/mall").MallLoadCountriesAction;
    mallAddAddress: (addressForm: import("./utils/fetcher").BackendAddressFormFields) => import("./core/mall").MallAddAddressAction;
    gatewayLoadGatewayInfo: () => import("./core/gateway").GatewayLoadGatewayInfoAction;
    gatewaySelectAsset: (asset: string) => import("./core/gateway").GatewaySelectAssetAction;
    gatewayLoadDepositInfo: (asset: string) => import("./core/gateway").GatewayLoadDepositInfoAction;
    referLoadReferInfo: () => import("./core/refer").ReferLoadReferInfoAction;
    referAdd: (form: import("./core/refer").SetReferForm & import("./core").WithNotiOptions) => import("./core/refer").ReferAddAction;
};
declare const Selectors: {
    selectAuth: (state: import("./core").CoreState) => import("./core/auth").AuthState;
    selectAuthSet: import("reselect").OutputSelector<import("./core").CoreState, false | {
        account: string;
        key: import("./cybex/ecc/src/PrivateKey").default;
    }, (res1: import("./core/auth").AuthStatus, res2: string | null, res3: import("./core/auth/keystore/keystore").KeyStore | null) => false | {
        account: string;
        key: import("./cybex/ecc/src/PrivateKey").default;
    }>;
    selectCurrentAccount: import("reselect").OutputSelector<import("./core").CoreState, string | null, (res: import("./core/auth").AuthState) => string | null>;
    selectCurrentKeystore: import("reselect").OutputSelector<import("./core").CoreState, import("./core/auth/keystore/keystore").KeyStore | null, (res: import("./core/auth").AuthState) => import("./core/auth/keystore/keystore").KeyStore | null>;
    selectAuthStatus: import("reselect").OutputSelector<import("./core").CoreState, import("./core/auth").AuthStatus, (res1: import("./core/auth").AuthState, res2: import("./core/auth/keystore/keystore").KeyStore | null) => import("./core/auth").AuthStatus>;
    selectCurrentAccountInfo: import("reselect").OutputSelector<import("./core").CoreState, Cybex.Account | null, (res: import("./core/auth").AuthState) => Cybex.Account | null>;
    selectBalances: import("reselect").OutputSelector<import("./core").CoreState, import("./core/auth").BalanceObj, (res: import("./core/auth").AuthState) => import("./core/auth").BalanceObj>;
};
export { CybexAddon, Utils, Selectors };
export default CybexAddon;
