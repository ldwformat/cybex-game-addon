import * as React from "react";
import { GatewayState, gatewaySelectAsset } from "../core/gateway";
import { StyledComponentProps } from "@material-ui/core";
import { corePushNoti } from "../core/core.actions";
declare type DepositStateProps = {
    gateway: GatewayState;
    coinList: CybexGateway.CoinInfo[];
    currentDeposit: CybexGateway.GetDepositAddress | undefined;
};
declare type DepositDispatchProps = {
    selectAsset: typeof gatewaySelectAsset;
    pushNoti: typeof corePushNoti;
};
export declare const Deposit: import("react-redux").ConnectedComponentClass<React.ComponentType<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper"> & DepositStateProps & DepositDispatchProps, "gateway" | "innerRef" | "selectAsset" | "coinList" | "currentDeposit" | "pushNoti"> & StyledComponentProps<string>>, Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper"> & DepositStateProps & DepositDispatchProps, "gateway" | "innerRef" | "selectAsset" | "coinList" | "currentDeposit" | "pushNoti"> & StyledComponentProps<string>, "classes" | "innerRef">>;
export {};
