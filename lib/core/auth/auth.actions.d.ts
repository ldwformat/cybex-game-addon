import { Action, ActionCreator } from "redux";
import { IAuthParams, IAuthResult, BalanceObj } from "./auth.models";
export declare enum AuthActions {
    LoginModalShow = "[Auth] LoginModalShow",
    LoginModalClose = "[Auth] LoginModalClose",
    Login = "[Auth] Login",
    LoginSuccess = "[Auth] Login Success",
    LoginFailed = "[Auth] Login Failed",
    UpdateBalance = "[Auth] UpdateBalance",
    UpdateBalanceSuccess = "[Auth] UpdateBalanceSuccess",
    Logout = "[Auth] Logout",
    Unauthed = "[Auth] Unauthed"
}
export declare class AuthLoginModalShowAction implements Action {
    readonly type = AuthActions.LoginModalShow;
}
export declare class AuthLoginModalCloseAction implements Action {
    readonly type = AuthActions.LoginModalClose;
}
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
export declare const authShowModal: ActionCreator<AuthLoginModalShowAction>;
export declare const authCloseModal: ActionCreator<AuthLoginModalCloseAction>;
export declare const authLogout: ActionCreator<AuthLogoutAction>;
export declare const authLoginFailed: ActionCreator<AuthLoginFailedAction>;
export declare const authLogin: (param: IAuthParams) => AuthLoginAction;
export declare const authUnauthed: () => AuthUnauthedAction;
export declare const authUpdateBalance: () => AuthUpdateBalanceAction;
export declare const authLoginSuccess: (param: IAuthResult) => AuthLoginSuccessAction;
export declare const authUpdateBalanceSuccess: (balanceObj: BalanceObj) => AuthUpdateBalanceSuccessAction;
export declare type AuthAction = AuthLoginModalShowAction | AuthLoginModalCloseAction | AuthLogoutAction | AuthLoginAction | AuthLoginFailedAction | AuthLoginSuccessAction | AuthUpdateBalanceAction | AuthUpdateBalanceSuccessAction | AuthUnauthedAction;
