import * as React from "react";
import { GatewayState, gatewaySelectAsset, gatewaySelectFirstAsset } from "../core/gateway";
import { StyledComponentProps } from "@material-ui/core";
import { corePushNoti } from "../core/core.actions";
import { WithTranslation } from "react-i18next";
import { CoinInfo, GetDepositAddress } from "../utils/fetcher";
declare type DepositStateProps = {
    gateway: GatewayState;
    coinList: CoinInfo[];
    currentDeposit: GetDepositAddress | undefined;
};
declare type DepositDispatchProps = {
    selectFirstAsset: typeof gatewaySelectFirstAsset;
    selectAsset: typeof gatewaySelectAsset;
    pushNoti: typeof corePushNoti;
};
export declare const Deposit: import("react-redux").ConnectedComponentClass<React.ComponentType<(Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper"> & DepositStateProps & DepositDispatchProps & WithTranslation, "classes" | "innerRef" | "gateway" | "selectAsset" | "coinList" | "currentDeposit" | "selectFirstAsset" | "pushNoti">, "innerRef" | "gateway" | "selectAsset" | "coinList" | "currentDeposit" | "selectFirstAsset" | "pushNoti"> & StyledComponentProps<string>) | (Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper"> & DepositStateProps & DepositDispatchProps & WithTranslation, "classes" | "innerRef" | "gateway" | "selectAsset" | "coinList" | "currentDeposit" | "selectFirstAsset" | "pushNoti"> & {
    children?: React.ReactNode;
}, "children" | "innerRef" | "gateway" | "selectAsset" | "coinList" | "currentDeposit" | "selectFirstAsset" | "pushNoti"> & StyledComponentProps<string>)>, Pick<Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper"> & DepositStateProps & DepositDispatchProps & WithTranslation, "classes" | "innerRef" | "gateway" | "selectAsset" | "coinList" | "currentDeposit" | "selectFirstAsset" | "pushNoti">, "innerRef" | "gateway" | "selectAsset" | "coinList" | "currentDeposit" | "selectFirstAsset" | "pushNoti"> & StyledComponentProps<string>, "classes" | "innerRef">>;
export {};
