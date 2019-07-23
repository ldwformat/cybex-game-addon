import { Action } from "redux";
import { CoinInfo, GetDepositAddress } from "../../utils/fetcher";
import { WithdrawParams } from "./gateway.models";
export declare enum GatewayActions {
    GatewayModalShow = "[Gateway] GatewayModalShow",
    GatewayModalClose = "[Gateway] GatewayModalClose",
    GatewayWithdrawModalShow = "[Gateway] GatewayWithdrawModalShow",
    GatewayWithdrawModalClose = "[Gateway] GatewayWithdrawModalClose",
    LoadGatewayInfo = "[Gateway] LoadGatewayInfo",
    LoadGatewayInfoSuccess = "[Gateway] LoadGatewayInfoSuccess",
    LoadGatewayInfoFailed = "[Gateway] LoadGatewayInfoFailed",
    LoadDepositInfo = "[Gateway] LoadDepositInfo",
    LoadDepositInfoSuccess = "[Gateway] LoadDepositInfoSuccess",
    LoadDepositInfoFailed = "[Gateway] LoadDepositInfoFailed",
    VerifyAddress = "[Gateway] VerifyAddress",
    VerifyAddressSuccess = "[Gateway] VerifyAddressSuccess",
    VerifyAddressFailed = "[Gateway] VerifyAddressFailed",
    Withdraw = "[Gateway] Withdraw",
    WithdrawSuccess = "[Gateway] WithdrawSuccess",
    WithdrawFailed = "[Gateway] WithdrawFailed",
    SelectAsset = "[Gateway] SelectAsset",
    SelectFirstAsset = "[Gateway] SelectFirstAsset"
}
export declare class GatewayModalShowAction implements Action {
    readonly type = GatewayActions.GatewayModalShow;
}
export declare class GatewayModalCloseAction implements Action {
    readonly type = GatewayActions.GatewayModalClose;
}
export declare class GatewayWithdrawModalShowAction implements Action {
    readonly type = GatewayActions.GatewayWithdrawModalShow;
}
export declare class GatewayWithdrawModalCloseAction implements Action {
    readonly type = GatewayActions.GatewayWithdrawModalClose;
}
export declare class GatewaySelectAssetAction implements Action {
    payload: string;
    readonly type = GatewayActions.SelectAsset;
    constructor(payload: string);
}
export declare class GatewaySelectFirstAssetAction implements Action {
    readonly type = GatewayActions.SelectFirstAsset;
}
export declare class GatewayLoadGatewayInfoAction implements Action {
    readonly type = GatewayActions.LoadGatewayInfo;
}
export declare class GatewayLoadGatewayInfoFailedAction implements Action {
    readonly type = GatewayActions.LoadGatewayInfoFailed;
}
export declare class GatewayLoadGatewayInfoSuccessAction implements Action {
    payload: CoinInfo[];
    readonly type = GatewayActions.LoadGatewayInfoSuccess;
    constructor(payload: CoinInfo[]);
}
export declare class GatewayLoadDepositInfoAction implements Action {
    payload: string;
    readonly type = GatewayActions.LoadDepositInfo;
    constructor(payload: string);
}
export declare class GatewayLoadDepositInfoSuccessAction implements Action {
    payload: GetDepositAddress;
    readonly type = GatewayActions.LoadDepositInfoSuccess;
    constructor(payload: GetDepositAddress);
}
export declare class GatewayLoadDepositInfoFailedAction implements Action {
    readonly type = GatewayActions.LoadDepositInfoFailed;
}
export declare class GatewayVerifyAddressAction implements Action {
    payload: {
        coinType: string;
        address: string;
    };
    readonly type = GatewayActions.VerifyAddress;
    constructor(payload: {
        coinType: string;
        address: string;
    });
}
export declare class GatewayVerifyAddressSuccessAction implements Action {
    payload: {
        coinType: string;
        address: string;
    };
    readonly type = GatewayActions.VerifyAddressSuccess;
    constructor(payload: {
        coinType: string;
        address: string;
    });
}
export declare class GatewayVerifyAddressFailedAction implements Action {
    payload: {
        coinType: string;
        address: string;
    };
    readonly type = GatewayActions.VerifyAddressFailed;
    constructor(payload: {
        coinType: string;
        address: string;
    });
}
export declare class GatewayWithdrawAction implements Action {
    payload: WithdrawParams;
    readonly type = GatewayActions.Withdraw;
    constructor(payload: WithdrawParams);
}
export declare class GatewayWithdrawSuccessAction implements Action {
    readonly type = GatewayActions.WithdrawSuccess;
}
export declare class GatewayWithdrawFailedAction implements Action {
    readonly type = GatewayActions.WithdrawFailed;
}
export declare const gatewayModalShow: () => GatewayModalShowAction;
export declare const gatewayModalClose: () => GatewayModalCloseAction;
export declare const gatewayWithdrawModalShow: () => GatewayWithdrawModalShowAction;
export declare const gatewayWithdrawModalClose: () => GatewayWithdrawModalCloseAction;
export declare const gatewayLoadGatewayInfo: () => GatewayLoadGatewayInfoAction;
export declare const gatewayLoadGatewayInfoFailed: () => GatewayLoadGatewayInfoFailedAction;
export declare const gatewayLoadGatewayInfoSuccess: (gatewayInfoList: CoinInfo[]) => GatewayLoadGatewayInfoSuccessAction;
export declare const gatewayLoadDepositInfo: (asset: string) => GatewayLoadDepositInfoAction;
export declare const gatewayLoadDepositInfoSuccess: (depositAddress: GetDepositAddress) => GatewayLoadDepositInfoSuccessAction;
export declare const gatewayLoadDepositInfoFailed: () => GatewayLoadDepositInfoFailedAction;
export declare const gatewaySelectAsset: (asset: string) => GatewaySelectAssetAction;
export declare const gatewaySelectFirstAsset: () => {
    type: GatewayActions.SelectFirstAsset;
};
export declare const gatewayVerifyAddress: (coinType: string, address: string) => GatewayVerifyAddressAction;
export declare const gatewayVerifyAddressSuccess: (coinType: string, address: string) => GatewayVerifyAddressSuccessAction;
export declare const gatewayVerifyAddressFailed: (coinType: string, address: string) => GatewayVerifyAddressFailedAction;
export declare const gatewayWithdraw: (params: WithdrawParams) => GatewayWithdrawAction;
export declare const gatewayWithdrawSuccess: () => GatewayWithdrawSuccessAction;
export declare const gatewayWithdrawFailed: () => GatewayWithdrawFailedAction;
export declare type GatewayAction = GatewayVerifyAddressAction | GatewayVerifyAddressSuccessAction | GatewayVerifyAddressFailedAction | GatewayWithdrawModalShowAction | GatewayWithdrawModalCloseAction | GatewayModalShowAction | GatewayModalCloseAction | GatewaySelectAssetAction | GatewaySelectFirstAssetAction | GatewayLoadGatewayInfoAction | GatewayLoadGatewayInfoSuccessAction | GatewayLoadGatewayInfoFailedAction | GatewayLoadDepositInfoAction | GatewayLoadDepositInfoFailedAction | GatewayLoadDepositInfoSuccessAction | GatewayWithdrawAction | GatewayWithdrawSuccessAction;
