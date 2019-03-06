import { Selector } from "reselect";
import { CoreState } from "..";
import { GatewayState } from "./gateway.models";
export declare const selectGateway: Selector<CoreState, GatewayState>;
export declare const selectGatewayCoinList: import("reselect").OutputSelector<CoreState, CybexGateway.CoinInfo[], (res: GatewayState) => CybexGateway.CoinInfo[]>;
export declare const selectGatewayCurrentAsset: import("reselect").OutputSelector<CoreState, string | undefined, (res: GatewayState) => string | undefined>;
export declare const selectGatewayDepositInfoList: import("reselect").OutputSelector<CoreState, CybexGateway.GetDepositAddress[], (res: GatewayState) => CybexGateway.GetDepositAddress[]>;
export declare const selectGatewayCurrentDepositInfo: import("reselect").OutputSelector<CoreState, CybexGateway.GetDepositAddress | undefined, (res1: CybexGateway.GetDepositAddress[], res2: false | {
    account: string;
    key: import("../../cybex/ecc/src/PrivateKey").default;
}, res3: string | undefined) => CybexGateway.GetDepositAddress | undefined>;
