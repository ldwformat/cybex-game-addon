import * as React from "react";
import { AuthState, authUnlock, authUnlockModalDismiss } from "../core/auth";
import { StyledComponentProps } from "@material-ui/core";
import { WithTranslation } from "react-i18next";
declare type UnlockPropsDispatch = {
    unlockImpl: typeof authUnlock;
    closeModal: typeof authUnlockModalDismiss;
};
declare type UnlockPropsState = {
    auth: AuthState;
    isModalShowing: boolean;
};
declare type UnlockProps = {
    onRegister: () => any;
};
export declare const Unlock: import("react-redux").ConnectedComponentClass<React.ComponentType<(Pick<Pick<StyledComponentProps<"paper"> & UnlockPropsDispatch & UnlockPropsState & UnlockProps & WithTranslation, "auth" | "classes" | "innerRef" | "closeModal" | "isModalShowing" | "onRegister" | "unlockImpl">, "auth" | "innerRef" | "closeModal" | "isModalShowing" | "onRegister" | "unlockImpl"> & StyledComponentProps<"paper">) | (Pick<Pick<StyledComponentProps<"paper"> & UnlockPropsDispatch & UnlockPropsState & UnlockProps & WithTranslation, "auth" | "classes" | "innerRef" | "closeModal" | "isModalShowing" | "onRegister" | "unlockImpl"> & {
    children?: React.ReactNode;
}, "auth" | "children" | "innerRef" | "closeModal" | "isModalShowing" | "onRegister" | "unlockImpl"> & StyledComponentProps<"paper">)>, Pick<Pick<Pick<StyledComponentProps<"paper"> & UnlockPropsDispatch & UnlockPropsState & UnlockProps & WithTranslation, "auth" | "classes" | "innerRef" | "closeModal" | "isModalShowing" | "onRegister" | "unlockImpl">, "auth" | "innerRef" | "closeModal" | "isModalShowing" | "onRegister" | "unlockImpl"> & StyledComponentProps<"paper">, "classes" | "innerRef" | "isModalShowing" | "onRegister">>;
export {};
