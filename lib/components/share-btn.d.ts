import * as React from "react";
import { StyledComponentProps } from "@material-ui/core";
import { corePushNoti } from "../core/core.actions";
import { WithTranslation } from "react-i18next";
declare type StateProps = {
    accountName: string | null;
    accountReferUrl: string | null;
};
declare type DispatchProps = {
    pushNoti: typeof corePushNoti;
};
export declare enum Panels {
    Drawer = "Drawer",
    QRCode = "QRCode",
    RefReadme = "RefReadme"
}
export declare const ShareButton: import("react-redux").ConnectedComponentClass<React.ComponentType<(Pick<Pick<StyledComponentProps<"buttonRoot" | "drawerRoot"> & StateProps & DispatchProps & WithTranslation, "classes" | "innerRef" | "accountName" | "pushNoti" | "accountReferUrl">, "innerRef" | "accountName" | "pushNoti" | "accountReferUrl"> & StyledComponentProps<string>) | (Pick<Pick<StyledComponentProps<"buttonRoot" | "drawerRoot"> & StateProps & DispatchProps & WithTranslation, "classes" | "innerRef" | "accountName" | "pushNoti" | "accountReferUrl"> & {
    children?: React.ReactNode;
}, "children" | "innerRef" | "accountName" | "pushNoti" | "accountReferUrl"> & StyledComponentProps<string>)>, Pick<Pick<Pick<StyledComponentProps<"buttonRoot" | "drawerRoot"> & StateProps & DispatchProps & WithTranslation, "classes" | "innerRef" | "accountName" | "pushNoti" | "accountReferUrl">, "innerRef" | "accountName" | "pushNoti" | "accountReferUrl"> & StyledComponentProps<string>, "classes" | "innerRef">>;
export {};
