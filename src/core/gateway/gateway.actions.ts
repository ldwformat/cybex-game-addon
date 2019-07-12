import { Action, ActionCreator } from "redux";
import { CoinInfo, GetDepositAddress } from "../../utils/fetcher";
import { WithdrawParams } from "./gateway.models";

export enum GatewayActions {
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

export class GatewayModalShowAction implements Action {
  readonly type = GatewayActions.GatewayModalShow;
}
export class GatewayModalCloseAction implements Action {
  readonly type = GatewayActions.GatewayModalClose;
}
export class GatewayWithdrawModalShowAction implements Action {
  readonly type = GatewayActions.GatewayWithdrawModalShow;
}
export class GatewayWithdrawModalCloseAction implements Action {
  readonly type = GatewayActions.GatewayWithdrawModalClose;
}

export class GatewaySelectAssetAction implements Action {
  readonly type = GatewayActions.SelectAsset;
  constructor(public payload: string) {}
}
export class GatewaySelectFirstAssetAction implements Action {
  readonly type = GatewayActions.SelectFirstAsset;
}
export class GatewayLoadGatewayInfoAction implements Action {
  readonly type = GatewayActions.LoadGatewayInfo;
}
export class GatewayLoadGatewayInfoFailedAction implements Action {
  readonly type = GatewayActions.LoadGatewayInfoFailed;
}
export class GatewayLoadGatewayInfoSuccessAction implements Action {
  readonly type = GatewayActions.LoadGatewayInfoSuccess;
  constructor(public payload: CoinInfo[]) {}
}
export class GatewayLoadDepositInfoAction implements Action {
  readonly type = GatewayActions.LoadDepositInfo;
  constructor(public payload: string) {}
}
export class GatewayLoadDepositInfoSuccessAction implements Action {
  readonly type = GatewayActions.LoadDepositInfoSuccess;
  constructor(public payload: GetDepositAddress) {}
}
export class GatewayLoadDepositInfoFailedAction implements Action {
  readonly type = GatewayActions.LoadDepositInfoFailed;
}
// 验证地址
export class GatewayVerifyAddressAction implements Action {
  readonly type = GatewayActions.VerifyAddress;
  constructor(public payload: { coinType: string; address: string }) {}
}
export class GatewayVerifyAddressSuccessAction implements Action {
  readonly type = GatewayActions.VerifyAddressSuccess;
  constructor(public payload: { coinType: string; address: string }) {}
}
export class GatewayVerifyAddressFailedAction implements Action {
  readonly type = GatewayActions.VerifyAddressFailed;
  constructor(public payload: { coinType: string; address: string }) {}
}
// 提币
export class GatewayWithdrawAction implements Action {
  readonly type = GatewayActions.Withdraw;
  constructor(public payload: WithdrawParams) {}
}
export class GatewayWithdrawSuccessAction implements Action {
  readonly type = GatewayActions.WithdrawSuccess;
}
export class GatewayWithdrawFailedAction implements Action {
  readonly type = GatewayActions.WithdrawFailed;
}

// ActionCreators
export const gatewayModalShow: () => GatewayModalShowAction = () => ({
  type: GatewayActions.GatewayModalShow
});
export const gatewayModalClose: () => GatewayModalCloseAction = () => ({
  type: GatewayActions.GatewayModalClose
});
export const gatewayWithdrawModalShow: () => GatewayWithdrawModalShowAction = () => ({
  ...new GatewayWithdrawModalShowAction()
});
export const gatewayWithdrawModalClose: () => GatewayWithdrawModalCloseAction = () => ({
  ...new GatewayWithdrawModalCloseAction()
});
export const gatewayLoadGatewayInfo: () => GatewayLoadGatewayInfoAction = () => ({
  type: GatewayActions.LoadGatewayInfo
});
export const gatewayLoadGatewayInfoFailed: () => GatewayLoadGatewayInfoFailedAction = () => ({
  type: GatewayActions.LoadGatewayInfoFailed
});
export const gatewayLoadGatewayInfoSuccess: (
  gatewayInfoList: CoinInfo[]
) => GatewayLoadGatewayInfoSuccessAction = gatewayInfo => ({
  type: GatewayActions.LoadGatewayInfoSuccess,
  payload: gatewayInfo
});
export const gatewayLoadDepositInfo: (
  asset: string
) => GatewayLoadDepositInfoAction = asset => ({
  type: GatewayActions.LoadDepositInfo,
  payload: asset
});
export const gatewayLoadDepositInfoSuccess: (
  depositAddress: GetDepositAddress
) => GatewayLoadDepositInfoSuccessAction = depositAddress => ({
  payload: depositAddress,
  type: GatewayActions.LoadDepositInfoSuccess
});
export const gatewayLoadDepositInfoFailed: () => GatewayLoadDepositInfoFailedAction = () => ({
  type: GatewayActions.LoadDepositInfoFailed
});
export const gatewaySelectAsset: (
  asset: string
) => GatewaySelectAssetAction = asset => ({
  type: GatewayActions.SelectAsset,
  payload: asset
});
export const gatewaySelectFirstAsset = () => ({
  ...new GatewaySelectFirstAssetAction()
});

export const gatewayVerifyAddress: (
  coinType: string,
  address: string
) => GatewayVerifyAddressAction = (coinType, address) => ({
  ...new GatewayVerifyAddressAction({ coinType, address })
});
export const gatewayVerifyAddressSuccess: (
  coinType: string,
  address: string
) => GatewayVerifyAddressSuccessAction = (coinType, address) => ({
  ...new GatewayVerifyAddressSuccessAction({ coinType, address })
});
export const gatewayVerifyAddressFailed: (
  coinType: string,
  address: string
) => GatewayVerifyAddressFailedAction = (coinType, address) => ({
  ...new GatewayVerifyAddressFailedAction({ coinType, address })
});
export const gatewayWithdraw: (
  params: WithdrawParams
) => GatewayWithdrawAction = params => ({
  ...new GatewayWithdrawAction(params)
});
export const gatewayWithdrawSuccess: () => GatewayWithdrawSuccessAction = () => ({
  ...new GatewayWithdrawSuccessAction()
});
export const gatewayWithdrawFailed: () => GatewayWithdrawFailedAction = () => ({
  ...new GatewayWithdrawFailedAction()
});

export type GatewayAction =
  | GatewayVerifyAddressAction
  | GatewayVerifyAddressSuccessAction
  | GatewayVerifyAddressFailedAction
  | GatewayWithdrawModalShowAction
  | GatewayWithdrawModalCloseAction
  | GatewayModalShowAction
  | GatewayModalCloseAction
  | GatewaySelectAssetAction
  | GatewaySelectFirstAssetAction
  | GatewayLoadGatewayInfoAction
  | GatewayLoadGatewayInfoSuccessAction
  | GatewayLoadGatewayInfoFailedAction
  | GatewayLoadDepositInfoAction
  | GatewayLoadDepositInfoFailedAction
  | GatewayLoadDepositInfoSuccessAction;
