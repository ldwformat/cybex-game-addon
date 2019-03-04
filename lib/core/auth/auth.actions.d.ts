import { Action, ActionCreator } from "redux";
import { IAuthParams, IAuthResult, BalanceObj, FaucetCaptcha } from "./auth.models";
export declare enum AuthActions {
    LoginModalShow = "[Auth] LoginModalShow",
    LoginModalClose = "[Auth] LoginModalClose",
    LoginModalSwitchPanel = "[Auth] LoginModalSwitchPanel",
    RegGetCaptcha = "[Auth] RegGetCaptcha",
    RegGetCaptchaSuccess = "[Auth] RegGetCaptchaSuccess",
    RegImpl = "[Auth] RegImpl",
    RegImplSuccess = "[Auth] RegImplSuccess",
    Login = "[Auth] Login",
    LoginSuccess = "[Auth] Login Success",
    LoginFailed = "[Auth] Login Failed",
    Logout = "[Auth] Logout",
    UpdateBalance = "[Auth] UpdateBalance",
    UpdateBalanceSuccess = "[Auth] UpdateBalanceSuccess",
    Unauthed = "[Auth] Unauthed"
}
export declare class AuthLoginModalShowAction implements Action {
    readonly type = AuthActions.LoginModalShow;
}
export declare class AuthLoginModalCloseAction implements Action {
    readonly type = AuthActions.LoginModalClose;
}
export declare class AuthLoginModalSwitchPanel implements Action {
    readonly type = AuthActions.LoginModalSwitchPanel;
}
export declare const authShowModal: ActionCreator<AuthLoginModalShowAction>;
export declare const authCloseModal: ActionCreator<AuthLoginModalCloseAction>;
export declare const authModalSwitchPanel: () => AuthLoginModalSwitchPanel;
export declare class AuthRegGetCaptcha implements Action {
    readonly type = AuthActions.RegGetCaptcha;
}
export declare class AuthRegGetCaptchaSuccess implements Action {
    payload: FaucetCaptcha;
    readonly type = AuthActions.RegGetCaptchaSuccess;
    constructor(payload: FaucetCaptcha);
}
export declare const authRegGetCaptcha: () => AuthRegGetCaptcha;
export declare const authRegGetCaptchaSuccess: (captcha: FaucetCaptcha) => AuthRegGetCaptchaSuccess;
export declare class AuthLoginAction implements Action {
    payload: IAuthParams;
    readonly type = AuthActions.Login;
    constructor(payload: IAuthParams);
}
export declare class AuthLoginFailedAction implements Action {
    readonly type = AuthActions.LoginFailed;
}
export declare class AuthLoginSuccessAction implements Action {
    payload: IAuthResult;
    readonly type = AuthActions.LoginSuccess;
    constructor(payload: IAuthResult);
}
export declare class AuthLogoutAction implements Action {
    readonly type = AuthActions.Logout;
}
export declare const authLogout: ActionCreator<AuthLogoutAction>;
export declare const authLoginFailed: ActionCreator<AuthLoginFailedAction>;
export declare const authLogin: (param: IAuthParams) => AuthLoginAction;
export declare const authLoginSuccess: (param: IAuthResult) => AuthLoginSuccessAction;
export declare class AuthUnauthedAction implements Action {
    readonly type = AuthActions.Unauthed;
}
export declare class AuthUpdateBalanceAction implements Action {
    readonly type = AuthActions.UpdateBalance;
}
export declare class AuthUpdateBalanceSuccessAction implements Action {
    payload: BalanceObj;
    readonly type = AuthActions.UpdateBalanceSuccess;
    constructor(payload: BalanceObj);
}
export declare const authUnauthed: () => AuthUnauthedAction;
export declare const authUpdateBalance: () => AuthUpdateBalanceAction;
export declare const authUpdateBalanceSuccess: (balanceObj: BalanceObj) => AuthUpdateBalanceSuccessAction;
export declare type AuthAction = AuthLoginModalShowAction | AuthLoginModalCloseAction | AuthLoginModalSwitchPanel | AuthRegGetCaptcha | AuthRegGetCaptchaSuccess | AuthLogoutAction | AuthLoginAction | AuthLoginFailedAction | AuthLoginSuccessAction | AuthUpdateBalanceAction | AuthUpdateBalanceSuccessAction | AuthUnauthedAction;
