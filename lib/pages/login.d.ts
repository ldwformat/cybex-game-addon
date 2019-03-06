import * as React from "react";
import { AuthState, authLogin, authShowModal, authCloseModal, authLogout, LoginPanel, FaucetCaptcha, authModalSwitchPanel, authRegImpl } from "../core/auth";
import { gatewayLoadGatewayInfo, gatewaySelectAsset } from "../core/gateway";
import { StyledComponentProps } from "@material-ui/core";
import { corePushNoti } from "../core/core.actions";
declare type LoginPropsDispatch = {
    login: typeof authLogin;
    logout: typeof authLogout;
    regImpl: typeof authRegImpl;
    alert: typeof corePushNoti;
    showModal: typeof authShowModal;
    switchPanel: typeof authModalSwitchPanel;
    closeModal: typeof authCloseModal;
    loadGatewayInfo: typeof gatewayLoadGatewayInfo;
    selectAsset: typeof gatewaySelectAsset;
};
declare type LoginPropsState = {
    auth: AuthState;
    isLogging: boolean;
    isModalShowing: boolean;
    currentPanel: LoginPanel;
    defaultReferrer: string | null;
    game: string;
    captcha: FaucetCaptcha;
};
declare type LoginProps = {
    onRegister: () => any;
};
export declare const Login: import("react-redux").ConnectedComponentClass<React.ComponentType<Pick<StyledComponentProps<"paper"> & LoginPropsDispatch & LoginPropsState & LoginProps, "auth" | "login" | "innerRef" | "captcha" | "game" | "logout" | "regImpl" | "alert" | "showModal" | "switchPanel" | "closeModal" | "loadGatewayInfo" | "selectAsset" | "isLogging" | "isModalShowing" | "currentPanel" | "defaultReferrer" | "onRegister"> & StyledComponentProps<"paper">>, Pick<Pick<StyledComponentProps<"paper"> & LoginPropsDispatch & LoginPropsState & LoginProps, "auth" | "login" | "innerRef" | "captcha" | "game" | "logout" | "regImpl" | "alert" | "showModal" | "switchPanel" | "closeModal" | "loadGatewayInfo" | "selectAsset" | "isLogging" | "isModalShowing" | "currentPanel" | "defaultReferrer" | "onRegister"> & StyledComponentProps<"paper">, "classes" | "innerRef" | "captcha" | "game" | "isLogging" | "isModalShowing" | "currentPanel" | "defaultReferrer" | "onRegister">>;
export {};
