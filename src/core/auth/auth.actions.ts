import { Action, ActionCreator } from "redux";
import {
  IAuthParams,
  IAuthResult,
  BalanceObj,
  FaucetCaptcha
} from "./auth.models";

export enum AuthActions {
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

// Modals
export class AuthLoginModalShowAction implements Action {
  readonly type = AuthActions.LoginModalShow;
}
export class AuthLoginModalCloseAction implements Action {
  readonly type = AuthActions.LoginModalClose;
}
export class AuthLoginModalSwitchPanel implements Action {
  readonly type = AuthActions.LoginModalSwitchPanel;
}
export const authShowModal: ActionCreator<
  AuthLoginModalShowAction
> = param => ({
  type: AuthActions.LoginModalShow
});
export const authCloseModal: ActionCreator<
  AuthLoginModalCloseAction
> = param => ({
  type: AuthActions.LoginModalClose
});
export const authModalSwitchPanel = () =>
  ({ type: AuthActions.LoginModalSwitchPanel } as AuthLoginModalSwitchPanel);

// Resiger
export class AuthRegGetCaptcha implements Action {
  readonly type = AuthActions.RegGetCaptcha;
}
export class AuthRegGetCaptchaSuccess implements Action {
  readonly type = AuthActions.RegGetCaptchaSuccess;
  constructor(public payload: FaucetCaptcha) {}
}

export const authRegGetCaptcha = () =>
  ({ type: AuthActions.RegGetCaptcha } as AuthRegGetCaptcha);
export const authRegGetCaptchaSuccess = (captcha: FaucetCaptcha) =>
  ({
    type: AuthActions.RegGetCaptchaSuccess,
    payload: captcha
  } as AuthRegGetCaptchaSuccess);

// LoginImplement
export class AuthLoginAction implements Action {
  readonly type = AuthActions.Login;
  constructor(public payload: IAuthParams) {}
}
export class AuthLoginFailedAction implements Action {
  readonly type = AuthActions.LoginFailed;
}
export class AuthLoginSuccessAction implements Action {
  readonly type = AuthActions.LoginSuccess;
  constructor(public payload: IAuthResult) {}
}
export class AuthLogoutAction implements Action {
  readonly type = AuthActions.Logout;
}
export const authLogout: ActionCreator<AuthLogoutAction> = param => ({
  type: AuthActions.Logout
});
export const authLoginFailed: ActionCreator<AuthLoginFailedAction> = param => ({
  type: AuthActions.LoginFailed
});
export const authLogin: (param: IAuthParams) => AuthLoginAction = param => ({
  type: AuthActions.Login,
  payload: param
});
export const authLoginSuccess: (
  param: IAuthResult
) => AuthLoginSuccessAction = (param: IAuthResult) => ({
  type: AuthActions.LoginSuccess,
  payload: param
});

// Others
export class AuthUnauthedAction implements Action {
  readonly type = AuthActions.Unauthed;
}
export class AuthUpdateBalanceAction implements Action {
  readonly type = AuthActions.UpdateBalance;
}
export class AuthUpdateBalanceSuccessAction implements Action {
  readonly type = AuthActions.UpdateBalanceSuccess;
  constructor(public payload: BalanceObj) {}
}
export const authUnauthed: () => AuthUnauthedAction = () => ({
  type: AuthActions.Unauthed
});
export const authUpdateBalance: () => AuthUpdateBalanceAction = () => ({
  type: AuthActions.UpdateBalance
});
export const authUpdateBalanceSuccess: (
  balanceObj: BalanceObj
) => AuthUpdateBalanceSuccessAction = balanceObj => ({
  type: AuthActions.UpdateBalanceSuccess,
  payload: balanceObj
});

export type AuthAction =
  | AuthLoginModalShowAction
  | AuthLoginModalCloseAction
  | AuthLoginModalSwitchPanel
  | AuthRegGetCaptcha
  | AuthRegGetCaptchaSuccess
  | AuthLogoutAction
  | AuthLoginAction
  | AuthLoginFailedAction
  | AuthLoginSuccessAction
  | AuthUpdateBalanceAction
  | AuthUpdateBalanceSuccessAction
  | AuthUnauthedAction;
