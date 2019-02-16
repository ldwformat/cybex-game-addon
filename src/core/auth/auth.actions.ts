import { Action, ActionCreator } from "redux";
import { IAuthParams, IAuthResult } from "./auth.models";

export enum AuthActions {
  Login = "[Auth] Login",
  LoginSuccess = "[Auth] Login Success",
  LoginFailed = "[Auth] Login Failed",
  Logout = "[Auth] Logout"
}

class AuthLoginAction implements Action {
  readonly type = AuthActions.Login;
  constructor(public payload: IAuthParams) {}
}

class AuthLoginFailedAction implements Action {
  readonly type = AuthActions.LoginFailed;
}

class AuthLoginSuccessAction implements Action {
  readonly type = AuthActions.LoginSuccess;
  constructor(public payload: IAuthResult) {}
}

class AuthLogoutAction implements Action {
  readonly type = AuthActions.Logout;
}

export const authLogout: ActionCreator<AuthLogoutAction> = param => ({
  type: AuthActions.Logout
});

export const authLogin: ActionCreator<AuthLoginAction> = (
  param: IAuthParams
) => ({
  type: AuthActions.Login,
  payload: param
});

export const authLoginSuccess: ActionCreator<AuthLoginSuccessAction> = (
  param: IAuthResult
) => ({
  type: AuthActions.LoginSuccess,
  payload: param
});

export type AuthAction =
  | AuthLogoutAction
  | AuthLoginAction
  | AuthLoginFailedAction
  | AuthLoginSuccessAction;
