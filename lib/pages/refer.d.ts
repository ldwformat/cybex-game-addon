import * as React from "react";
import { gatewaySelectAsset } from "../core/gateway";
import { Referrer, TypesReferral } from "../core/refer";
import { StyledComponentProps } from "@material-ui/core";
import { corePushNoti } from "../core/core.actions";
import { WithTranslation } from "react-i18next";
declare type StateProps = {
    accountName: string | null;
    myRegisterReferrer: Referrer | undefined;
    myRegisterReferral: TypesReferral | undefined;
    myGameReferrer: Referrer | undefined;
    myGameReferral: TypesReferral | undefined;
};
declare type DispatchProps = {
    selectAsset: typeof gatewaySelectAsset;
    pushNoti: typeof corePushNoti;
};
export declare const Refer: import("react-redux").ConnectedComponentClass<React.ComponentType<(Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper" | "buttonRoot"> & StateProps & DispatchProps & WithTranslation, "classes" | "innerRef" | "accountName" | "selectAsset" | "pushNoti" | "myGameReferrer" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferral">, "innerRef" | "accountName" | "selectAsset" | "pushNoti" | "myGameReferrer" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferral"> & StyledComponentProps<string>) | (Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper" | "buttonRoot"> & StateProps & DispatchProps & WithTranslation, "classes" | "innerRef" | "accountName" | "selectAsset" | "pushNoti" | "myGameReferrer" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferral"> & {
    children?: React.ReactNode;
}, "children" | "innerRef" | "accountName" | "selectAsset" | "pushNoti" | "myGameReferrer" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferral"> & StyledComponentProps<string>)>, Pick<Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper" | "buttonRoot"> & StateProps & DispatchProps & WithTranslation, "classes" | "innerRef" | "accountName" | "selectAsset" | "pushNoti" | "myGameReferrer" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferral">, "innerRef" | "accountName" | "selectAsset" | "pushNoti" | "myGameReferrer" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferral"> & StyledComponentProps<string>, "classes" | "innerRef" | "selectAsset" | "pushNoti">>;
export {};
