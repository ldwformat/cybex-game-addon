import { Selector } from "reselect";
import { CoreState } from "..";
import { GatewayState } from "./gateway.models";
export declare const selectGateway: Selector<CoreState, GatewayState>;
export declare const selectGatewayCoinList: import("reselect").OutputSelector<CoreState, import("../../utils/fetcher").CoinInfo[], (res: GatewayState) => import("../../utils/fetcher").CoinInfo[]>;
export declare const selectGatewayCurrentAsset: import("reselect").OutputSelector<CoreState, string | undefined, (res: GatewayState) => string | undefined>;
export declare const selectGatewayDepositInfoList: import("reselect").OutputSelector<CoreState, import("../../utils/fetcher").GetDepositAddress[], (res: GatewayState) => import("../../utils/fetcher").GetDepositAddress[]>;
export declare const selectGatewayCurrentDepositInfo: import("reselect").OutputSelector<CoreState, import("../../utils/fetcher").GetDepositAddress | undefined, (res1: import("../../utils/fetcher").GetDepositAddress[], res2: false | {
    account: string;
    key: import("../../cybex/ecc/src/PrivateKey").default;
}, res3: string | undefined) => import("../../utils/fetcher").GetDepositAddress | undefined>;
