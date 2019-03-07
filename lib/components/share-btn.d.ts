import * as React from "react";
import { StyledComponentProps } from "@material-ui/core";
import { corePushNoti } from "../core/core.actions";
import { WithTranslation } from "react-i18next";
declare type StateProps = {
    accountName: string | null;
    referUrl: string | null;
};
declare type DispatchProps = {
    pushNoti: typeof corePushNoti;
};
export declare const ShareButton: import("react-redux").ConnectedComponentClass<React.ComponentType<(Pick<Pick<StyledComponentProps<"buttonRoot" | "drawerRoot"> & StateProps & DispatchProps & WithTranslation, "classes" | "innerRef" | "accountName" | "referUrl" | "pushNoti">, "innerRef" | "accountName" | "referUrl" | "pushNoti"> & StyledComponentProps<string>) | (Pick<Pick<StyledComponentProps<"buttonRoot" | "drawerRoot"> & StateProps & DispatchProps & WithTranslation, "classes" | "innerRef" | "accountName" | "referUrl" | "pushNoti"> & {
    children?: React.ReactNode;
}, "children" | "innerRef" | "accountName" | "referUrl" | "pushNoti"> & StyledComponentProps<string>)>, Pick<Pick<Pick<StyledComponentProps<"buttonRoot" | "drawerRoot"> & StateProps & DispatchProps & WithTranslation, "classes" | "innerRef" | "accountName" | "referUrl" | "pushNoti">, "innerRef" | "accountName" | "referUrl" | "pushNoti"> & StyledComponentProps<string>, "classes" | "innerRef">>;
export {};
