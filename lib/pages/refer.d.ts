import * as React from "react";
import { gatewaySelectAsset } from "../core/gateway";
import { Referrer, TypesReferral, ReferSingleRebateWithValue } from "../core/refer";
import { StyledComponentProps } from "@material-ui/core";
import { corePushNoti } from "../core/core.actions";
import { WithTranslation } from "react-i18next";
declare type StateProps = {
    accountName: string | null;
    totalRebate: number;
    accountReferUrl: string | null;
    myRegisterReferrer: Referrer | undefined;
    myRegisterReferral: TypesReferral | undefined;
    myGameReferrer: Referrer | undefined;
    myGameReferral: TypesReferral | undefined;
    rebates: ReferSingleRebateWithValue[];
};
declare type DispatchProps = {
    selectAsset: typeof gatewaySelectAsset;
    pushNoti: typeof corePushNoti;
};
export declare const Refer: import("react-redux").ConnectedComponentClass<React.ComponentType<(Pick<Pick<StyledComponentProps<"summary" | "root" | "copyCard" | "innerWrapper" | "buttonRoot" | "textRight" | "accountText" | "noShrink" | "itemH" | "itemV"> & StateProps & DispatchProps & WithTranslation, "classes" | "innerRef" | "accountName" | "selectAsset" | "pushNoti" | "accountReferUrl" | "myGameReferrer" | "totalRebate" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferral" | "rebates">, "innerRef" | "accountName" | "selectAsset" | "pushNoti" | "accountReferUrl" | "myGameReferrer" | "totalRebate" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferral" | "rebates"> & StyledComponentProps<string>) | (Pick<Pick<StyledComponentProps<"summary" | "root" | "copyCard" | "innerWrapper" | "buttonRoot" | "textRight" | "accountText" | "noShrink" | "itemH" | "itemV"> & StateProps & DispatchProps & WithTranslation, "classes" | "innerRef" | "accountName" | "selectAsset" | "pushNoti" | "accountReferUrl" | "myGameReferrer" | "totalRebate" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferral" | "rebates"> & {
    children?: React.ReactNode;
}, "children" | "innerRef" | "accountName" | "selectAsset" | "pushNoti" | "accountReferUrl" | "myGameReferrer" | "totalRebate" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferral" | "rebates"> & StyledComponentProps<string>)>, Pick<Pick<Pick<StyledComponentProps<"summary" | "root" | "copyCard" | "innerWrapper" | "buttonRoot" | "textRight" | "accountText" | "noShrink" | "itemH" | "itemV"> & StateProps & DispatchProps & WithTranslation, "classes" | "innerRef" | "accountName" | "selectAsset" | "pushNoti" | "accountReferUrl" | "myGameReferrer" | "totalRebate" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferral" | "rebates">, "innerRef" | "accountName" | "selectAsset" | "pushNoti" | "accountReferUrl" | "myGameReferrer" | "totalRebate" | "myRegisterReferrer" | "myRegisterReferral" | "myGameReferral" | "rebates"> & StyledComponentProps<string>, "classes" | "innerRef" | "selectAsset">>;
export default Refer;
