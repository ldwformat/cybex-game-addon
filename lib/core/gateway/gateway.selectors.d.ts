import { Selector } from "reselect";
import { CoreState } from "..";
import { GatewayState, AddressVerifyState, GatewayModalState } from "./gateway.models";
export declare const selectGateway: Selector<CoreState, GatewayState>;
export declare const selectGatewayModalShow: import("reselect").OutputSelector<CoreState, boolean, (res: GatewayState) => boolean>;
export declare const selectGatewayModalState: import("reselect").OutputSelector<CoreState, GatewayModalState, (res: GatewayState) => GatewayModalState>;
export declare const selectGatewayCoinList: import("reselect").OutputSelector<CoreState, import("../../utils/fetcher").CoinInfo[], (res: GatewayState) => import("../../utils/fetcher").CoinInfo[]>;
export declare const selectGatewayCurrentAsset: import("reselect").OutputSelector<CoreState, string | undefined, (res: GatewayState) => string | undefined>;
export declare const selectGatewayDepositInfoList: import("reselect").OutputSelector<CoreState, import("../../utils/fetcher").GetDepositAddress[], (res: GatewayState) => import("../../utils/fetcher").GetDepositAddress[]>;
export declare const selectGatewayAddressVerifications: import("reselect").OutputSelector<CoreState, {
    [coinType: string]: {
        [address: string]: boolean;
    };
}, (res: GatewayState) => {
    [coinType: string]: {
        [address: string]: boolean;
    };
}>;
export declare const selectGatewayAddressVerification: (coinType: string, address: string) => import("reselect").OutputSelector<CoreState, AddressVerifyState, (res: {
    [coinType: string]: {
        [address: string]: boolean;
    };
}) => AddressVerifyState>;
export declare const selectGatewayCurrentDepositInfo: import("reselect").OutputSelector<CoreState, import("../../utils/fetcher").GetDepositAddress | undefined, (res1: import("../../utils/fetcher").GetDepositAddress[], res2: false | {
    account: string;
    key: import("../../cybex/ecc/src/PrivateKey").default;
}, res3: string | undefined) => import("../../utils/fetcher").GetDepositAddress | undefined>;
export declare const selectGatewayCurrentCoinInfo: import("reselect").OutputSelector<CoreState, import("../../utils/fetcher").CoinInfo | undefined, (res1: import("../../utils/fetcher").CoinInfo[], res2: string | undefined) => import("../../utils/fetcher").CoinInfo | undefined>;
