import * as React from "react";
import { GatewayState, gatewaySelectAsset } from "../core/gateway";
import { StyledComponentProps } from "@material-ui/core";
import { corePushNoti } from "../core/core.actions";
import { WithTranslation } from "react-i18next";
declare type DepositStateProps = {
    gateway: GatewayState;
    coinList: CybexGateway.CoinInfo[];
    currentDeposit: CybexGateway.GetDepositAddress | undefined;
};
declare type DepositDispatchProps = {
    selectAsset: typeof gatewaySelectAsset;
    pushNoti: typeof corePushNoti;
};
export declare const Deposit: import("react-redux").ConnectedComponentClass<React.ComponentType<(Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper"> & DepositStateProps & DepositDispatchProps & WithTranslation, "classes" | "innerRef" | "gateway" | "selectAsset" | "coinList" | "currentDeposit" | "pushNoti">, "innerRef" | "gateway" | "selectAsset" | "coinList" | "currentDeposit" | "pushNoti"> & StyledComponentProps<string>) | (Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper"> & DepositStateProps & DepositDispatchProps & WithTranslation, "classes" | "innerRef" | "gateway" | "selectAsset" | "coinList" | "currentDeposit" | "pushNoti"> & {
    children?: React.ReactNode;
}, "children" | "innerRef" | "gateway" | "selectAsset" | "coinList" | "currentDeposit" | "pushNoti"> & StyledComponentProps<string>)>, Pick<Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper"> & DepositStateProps & DepositDispatchProps & WithTranslation, "classes" | "innerRef" | "gateway" | "selectAsset" | "coinList" | "currentDeposit" | "pushNoti">, "innerRef" | "gateway" | "selectAsset" | "coinList" | "currentDeposit" | "pushNoti"> & StyledComponentProps<string>, "classes" | "innerRef">>;
export {};
