import { Action, ActionCreator } from "redux";
import { CoinInfo, GetDepositAddress } from "../../utils/fetcher";

export enum GatewayActions {
  GatewayModalShow = "[Gateway] GatewayModalShow",
  GatewayModalClose = "[Gateway] GatewayModalClose",
  LoadGatewayInfo = "[Gateway] LoadGatewayInfo",
  LoadGatewayInfoSuccess = "[Gateway] LoadGatewayInfoSuccess",
  LoadGatewayInfoFailed = "[Gateway] LoadGatewayInfoFailed",
  LoadDepositInfo = "[Gateway] LoadDepositInfo",
  LoadDepositInfoSuccess = "[Gateway] LoadDepositInfoSuccess",
  LoadDepositInfoFailed = "[Gateway] LoadDepositInfoFailed",
  SelectAsset = "[Gateway] SelectAsset",
  SelectFirstAsset = "[Gateway] SelectFirstAsset"
}

export class GatewayModalShowAction implements Action {
  readonly type = GatewayActions.GatewayModalShow;
}
export class GatewayModalCloseAction implements Action {
  readonly type = GatewayActions.GatewayModalClose;
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

export const gatewayModalShow: () => GatewayModalShowAction = () => ({
  type: GatewayActions.GatewayModalShow
});
export const gatewayModalClose: () => GatewayModalCloseAction = () => ({
  type: GatewayActions.GatewayModalClose
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

export type GatewayAction =
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
