import * as React from "react";
import { AuthState, authLogin, authShowModal, authCloseModal, authLogout, LoginPanel, FaucetCaptcha, authModalSwitchPanel, authRegImpl } from "../core/auth";
import { gatewayLoadGatewayInfo, gatewaySelectAsset } from "../core/gateway";
import { StyledComponentProps } from "@material-ui/core";
import { corePushNoti } from "../core/core.actions";
import { WithTranslation } from "react-i18next";
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
export declare const Login: import("react-redux").ConnectedComponentClass<React.ComponentType<(Pick<Pick<StyledComponentProps<"header" | "paper"> & LoginPropsDispatch & LoginPropsState & LoginProps & WithTranslation, "auth" | "login" | "classes" | "innerRef" | "captcha" | "game" | "closeModal" | "isModalShowing" | "onRegister" | "logout" | "regImpl" | "alert" | "showModal" | "switchPanel" | "loadGatewayInfo" | "selectAsset" | "isLogging" | "currentPanel" | "defaultReferrer">, "auth" | "login" | "innerRef" | "captcha" | "game" | "closeModal" | "isModalShowing" | "onRegister" | "logout" | "regImpl" | "alert" | "showModal" | "switchPanel" | "loadGatewayInfo" | "selectAsset" | "isLogging" | "currentPanel" | "defaultReferrer"> & StyledComponentProps<"header" | "paper">) | (Pick<Pick<StyledComponentProps<"header" | "paper"> & LoginPropsDispatch & LoginPropsState & LoginProps & WithTranslation, "auth" | "login" | "classes" | "innerRef" | "captcha" | "game" | "closeModal" | "isModalShowing" | "onRegister" | "logout" | "regImpl" | "alert" | "showModal" | "switchPanel" | "loadGatewayInfo" | "selectAsset" | "isLogging" | "currentPanel" | "defaultReferrer"> & {
    children?: React.ReactNode;
}, "auth" | "children" | "login" | "innerRef" | "captcha" | "game" | "closeModal" | "isModalShowing" | "onRegister" | "logout" | "regImpl" | "alert" | "showModal" | "switchPanel" | "loadGatewayInfo" | "selectAsset" | "isLogging" | "currentPanel" | "defaultReferrer"> & StyledComponentProps<"header" | "paper">)>, Pick<Pick<Pick<StyledComponentProps<"header" | "paper"> & LoginPropsDispatch & LoginPropsState & LoginProps & WithTranslation, "auth" | "login" | "classes" | "innerRef" | "captcha" | "game" | "closeModal" | "isModalShowing" | "onRegister" | "logout" | "regImpl" | "alert" | "showModal" | "switchPanel" | "loadGatewayInfo" | "selectAsset" | "isLogging" | "currentPanel" | "defaultReferrer">, "auth" | "login" | "innerRef" | "captcha" | "game" | "closeModal" | "isModalShowing" | "onRegister" | "logout" | "regImpl" | "alert" | "showModal" | "switchPanel" | "loadGatewayInfo" | "selectAsset" | "isLogging" | "currentPanel" | "defaultReferrer"> & StyledComponentProps<"header" | "paper">, "classes" | "innerRef" | "captcha" | "game" | "isModalShowing" | "onRegister" | "isLogging" | "currentPanel" | "defaultReferrer">>;
export {};
