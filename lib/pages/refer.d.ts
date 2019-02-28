import * as React from "react";
import { gatewaySelectAsset } from "../core/gateway";
import { StyledComponentProps } from "@material-ui/core";
import { corePushNoti } from "../core/core.actions";
declare type DepositStateProps = {
    accountName: string | null;
    myRegisterReferrer: Backend.Referrer | undefined;
    myRegisterReferral: Backend.TypesReferral | undefined;
    myGameReferrer: Backend.Referrer | undefined;
    myGameReferral: Backend.TypesReferral | undefined;
};
declare type DepositDispatchProps = {
    selectAsset: typeof gatewaySelectAsset;
    pushNoti: typeof corePushNoti;
};
export declare const ReferCode: React.ComponentType<Pick<{
    code?: string | undefined;
} & StyledComponentProps<"root">, "innerRef" | "code"> & StyledComponentProps<string>>;
export declare const Refer: import("react-redux").ConnectedComponentClass<React.ComponentType<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper"> & DepositStateProps & DepositDispatchProps, "innerRef" | "selectAsset" | "pushNoti" | "accountName" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferrer" | "myGameReferral"> & StyledComponentProps<string>>, Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper"> & DepositStateProps & DepositDispatchProps, "innerRef" | "selectAsset" | "pushNoti" | "accountName" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferrer" | "myGameReferral"> & StyledComponentProps<string>, "classes" | "innerRef" | "selectAsset" | "pushNoti">>;
export {};
