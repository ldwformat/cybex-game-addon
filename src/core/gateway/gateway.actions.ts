import { Action, ActionCreator } from "redux";

export enum GatewayActions {
  LoadGatewayInfo = "[Gateway] LoadGatewayInfo",
  LoadGatewayInfoSuccess = "[Gateway] LoadGatewayInfoSuccess",
  LoadGatewayInfoFailed = "[Gateway] LoadGatewayInfoFailed",
  LoadDepositInfo = "[Gateway] LoadDepositInfo",
  LoadDepositInfoSuccess = "[Gateway] LoadDepositInfoSuccess",
  LoadDepositInfoFailed = "[Gateway] LoadDepositInfoFailed",
  SelectAsset = "[Gateway] SelectAsset"
}

export class GatewaySelectAssetAction implements Action {
  readonly type = GatewayActions.SelectAsset;
  constructor(public payload: string) {}
}
export class GatewayLoadGatewayInfoAction implements Action {
  readonly type = GatewayActions.LoadGatewayInfo;
}
export class GatewayLoadGatewayInfoFailedAction implements Action {
  readonly type = GatewayActions.LoadGatewayInfoFailed;
}
export class GatewayLoadGatewayInfoSuccessAction implements Action {
  readonly type = GatewayActions.LoadGatewayInfoSuccess;
  constructor(public payload: CybexGateway.CoinInfo[]) {}
}
export class GatewayLoadDepositInfoAction implements Action {
  readonly type = GatewayActions.LoadDepositInfo;
  constructor(public payload: string) {}
}
export class GatewayLoadDepositInfoSuccessAction implements Action {
  readonly type = GatewayActions.LoadDepositInfoSuccess;
  constructor(public payload: CybexGateway.GetDepositAddress) {}
}
export class GatewayLoadDepositInfoFailedAction implements Action {
  readonly type = GatewayActions.LoadDepositInfoFailed;
}

export const gatewayLoadGatewayInfo: () => GatewayLoadGatewayInfoAction = () => ({
  type: GatewayActions.LoadGatewayInfo
});
export const gatewayLoadGatewayInfoFailed: () => GatewayLoadGatewayInfoFailedAction = () => ({
  type: GatewayActions.LoadGatewayInfoFailed
});
export const gatewayLoadGatewayInfoSuccess: (
  gatewayInfoList: CybexGateway.CoinInfo[]
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
  depositAddress: CybexGateway.GetDepositAddress
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

export type GatewayAction =
  | GatewaySelectAssetAction
  | GatewayLoadGatewayInfoAction
  | GatewayLoadGatewayInfoSuccessAction
  | GatewayLoadGatewayInfoFailedAction
  | GatewayLoadDepositInfoAction
  | GatewayLoadDepositInfoFailedAction
  | GatewayLoadDepositInfoSuccessAction;
