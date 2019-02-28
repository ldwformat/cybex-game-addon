import { Action } from "redux";
export declare enum GatewayActions {
    LoadGatewayInfo = "[Gateway] LoadGatewayInfo",
    LoadGatewayInfoSuccess = "[Gateway] LoadGatewayInfoSuccess",
    LoadGatewayInfoFailed = "[Gateway] LoadGatewayInfoFailed",
    LoadDepositInfo = "[Gateway] LoadDepositInfo",
    LoadDepositInfoSuccess = "[Gateway] LoadDepositInfoSuccess",
    LoadDepositInfoFailed = "[Gateway] LoadDepositInfoFailed",
    SelectAsset = "[Gateway] SelectAsset"
}
export declare class GatewaySelectAssetAction implements Action {
    payload: string;
    readonly type = GatewayActions.SelectAsset;
    constructor(payload: string);
}
export declare class GatewayLoadGatewayInfoAction implements Action {
    readonly type = GatewayActions.LoadGatewayInfo;
}
export declare class GatewayLoadGatewayInfoFailedAction implements Action {
    readonly type = GatewayActions.LoadGatewayInfoFailed;
}
export declare class GatewayLoadGatewayInfoSuccessAction implements Action {
    payload: CybexGateway.CoinInfo[];
    readonly type = GatewayActions.LoadGatewayInfoSuccess;
    constructor(payload: CybexGateway.CoinInfo[]);
}
export declare class GatewayLoadDepositInfoAction implements Action {
    payload: string;
    readonly type = GatewayActions.LoadDepositInfo;
    constructor(payload: string);
}
export declare class GatewayLoadDepositInfoSuccessAction implements Action {
    payload: CybexGateway.GetDepositAddress;
    readonly type = GatewayActions.LoadDepositInfoSuccess;
    constructor(payload: CybexGateway.GetDepositAddress);
}
export declare class GatewayLoadDepositInfoFailedAction implements Action {
    readonly type = GatewayActions.LoadDepositInfoFailed;
}
export declare const gatewayLoadGatewayInfo: () => GatewayLoadGatewayInfoAction;
export declare const gatewayLoadGatewayInfoFailed: () => GatewayLoadGatewayInfoFailedAction;
export declare const gatewayLoadGatewayInfoSuccess: (gatewayInfoList: CybexGateway.CoinInfo[]) => GatewayLoadGatewayInfoSuccessAction;
export declare const gatewayLoadDepositInfo: (asset: string) => GatewayLoadDepositInfoAction;
export declare const gatewayLoadDepositInfoSuccess: (depositAddress: CybexGateway.GetDepositAddress) => GatewayLoadDepositInfoSuccessAction;
export declare const gatewayLoadDepositInfoFailed: () => GatewayLoadDepositInfoFailedAction;
export declare const gatewaySelectAsset: (asset: string) => GatewaySelectAssetAction;
export declare type GatewayAction = GatewaySelectAssetAction | GatewayLoadGatewayInfoAction | GatewayLoadGatewayInfoSuccessAction | GatewayLoadGatewayInfoFailedAction | GatewayLoadDepositInfoAction | GatewayLoadDepositInfoFailedAction | GatewayLoadDepositInfoSuccessAction;
