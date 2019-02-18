import { Action, ActionCreator } from "redux";
import { IAuthParams, IAuthResult } from "./auth.models";

export enum AuthActions {
  Login = "[Auth] Login",
  LoginSuccess = "[Auth] Login Success",
  LoginFailed = "[Auth] Login Failed",
  Logout = "[Auth] Logout"
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

export type AuthAction =
  | AuthLogoutAction
  | AuthLoginAction
  | AuthLoginFailedAction
  | AuthLoginSuccessAction;
