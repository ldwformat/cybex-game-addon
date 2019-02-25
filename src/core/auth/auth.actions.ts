import { Action, ActionCreator } from "redux";
import { IAuthParams, IAuthResult } from "./auth.models";

export enum AuthActions {
  LoginModalShow = "[Auth] LoginModalShow",
  LoginModalClose = "[Auth] LoginModalClose",
  Login = "[Auth] Login",
  LoginSuccess = "[Auth] Login Success",
  LoginFailed = "[Auth] Login Failed",
  Logout = "[Auth] Logout",
  Unauthed = "[Auth] Unauthed"
}

export class AuthLoginModalShowAction implements Action {
  readonly type = AuthActions.LoginModalShow;
}
export class AuthLoginModalCloseAction implements Action {
  readonly type = AuthActions.LoginModalClose;
}

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
export class AuthUnauthedAction implements Action {
  readonly type = AuthActions.Unauthed;
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

export const authUnauthed: () => AuthUnauthedAction = () => ({
  type: AuthActions.Unauthed
});

export const authLoginSuccess: (
  param: IAuthResult
) => AuthLoginSuccessAction = (param: IAuthResult) => ({
  type: AuthActions.LoginSuccess,
  payload: param
});

export type AuthAction =
  | AuthLoginModalShowAction
  | AuthLoginModalCloseAction
  | AuthLogoutAction
  | AuthLoginAction
  | AuthLoginFailedAction
  | AuthLoginSuccessAction
  | AuthUnauthedAction;
