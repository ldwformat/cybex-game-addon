import * as React from "react";
import { CoreState } from "../core";
import { GatewayState, gatewaySelectAsset, gatewayModalClose, gatewaySelectFirstAsset, GatewayModalState, gatewayVerifyAddress, gatewayWithdraw } from "../core/gateway";
import { StyledComponentProps } from "@material-ui/core";
import { corePushNoti } from "../core/core.actions";
import { WithTranslation } from "react-i18next";
import { CoinInfo, GetDepositAddress } from "../utils/fetcher";
import { BalanceObj } from "../core/auth";
declare type DepositStateProps = {
    modalState: GatewayModalState;
    state: CoreState;
    gateway: GatewayState;
    balances: BalanceObj;
    coinList: CoinInfo[];
    currentCoinInfo: CoinInfo | undefined;
    currentDeposit: GetDepositAddress | undefined;
};
declare type DepositDispatchProps = {
    doWithdraw: typeof gatewayWithdraw;
    verifyAddress: typeof gatewayVerifyAddress;
    closeModal: typeof gatewayModalClose;
    selectAsset: typeof gatewaySelectAsset;
    selectFirstAsset: typeof gatewaySelectFirstAsset;
    pushNoti: typeof corePushNoti;
};
export declare const DepositModal: import("react-redux").ConnectedComponentClass<React.ComponentType<(Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper"> & DepositStateProps & DepositDispatchProps & WithTranslation, "classes" | "innerRef" | "gateway" | "closeModal" | "selectAsset" | "modalState" | "state" | "balances" | "coinList" | "currentCoinInfo" | "currentDeposit" | "doWithdraw" | "verifyAddress" | "selectFirstAsset" | "pushNoti">, "innerRef" | "gateway" | "closeModal" | "selectAsset" | "modalState" | "state" | "balances" | "coinList" | "currentCoinInfo" | "currentDeposit" | "doWithdraw" | "verifyAddress" | "selectFirstAsset" | "pushNoti"> & StyledComponentProps<string>) | (Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper"> & DepositStateProps & DepositDispatchProps & WithTranslation, "classes" | "innerRef" | "gateway" | "closeModal" | "selectAsset" | "modalState" | "state" | "balances" | "coinList" | "currentCoinInfo" | "currentDeposit" | "doWithdraw" | "verifyAddress" | "selectFirstAsset" | "pushNoti"> & {
    children?: React.ReactNode;
}, "children" | "innerRef" | "gateway" | "closeModal" | "selectAsset" | "modalState" | "state" | "balances" | "coinList" | "currentCoinInfo" | "currentDeposit" | "doWithdraw" | "verifyAddress" | "selectFirstAsset" | "pushNoti"> & StyledComponentProps<string>)>, Pick<Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper"> & DepositStateProps & DepositDispatchProps & WithTranslation, "classes" | "innerRef" | "gateway" | "closeModal" | "selectAsset" | "modalState" | "state" | "balances" | "coinList" | "currentCoinInfo" | "currentDeposit" | "doWithdraw" | "verifyAddress" | "selectFirstAsset" | "pushNoti">, "innerRef" | "gateway" | "closeModal" | "selectAsset" | "modalState" | "state" | "balances" | "coinList" | "currentCoinInfo" | "currentDeposit" | "doWithdraw" | "verifyAddress" | "selectFirstAsset" | "pushNoti"> & StyledComponentProps<string>, "classes" | "innerRef">>;
export {};
