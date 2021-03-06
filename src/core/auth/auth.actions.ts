import { Action, ActionCreator } from "redux";
import {
  IAuthParams,
  IAuthResult,
  BalanceObj,
  FaucetCaptcha,
  AuthDefaultUnlockCount
} from "./auth.models";
import { RegFormData } from "../../components/reg-form";
import { KeyStore } from "./keystore/keystore";

export enum AuthActions {
  LoginModalShow = "[Auth] LoginModalShow",
  LoginModalClose = "[Auth] LoginModalClose",
  LoginModalSwitchPanel = "[Auth] LoginModalSwitchPanel",

  RegGetCaptcha = "[Auth] RegGetCaptcha",
  RegGetCaptchaSuccess = "[Auth] RegGetCaptchaSuccess",
  RegImpl = "[Auth] RegImpl",
  RegImplSuccess = "[Auth] RegImplSuccess",
  RegImplFailed = "[Auth] RegImplFailed",

  Login = "[Auth] Login",
  LoginSuccess = "[Auth] Login Success",
  LoginFailed = "[Auth] Login Failed",
  Logout = "[Auth] Logout",

  UpdateBalance = "[Auth] UpdateBalance",
  UpdateBalanceSuccess = "[Auth] UpdateBalanceSuccess",

  WalletPassModalDisplay = "[Auth] WalletPassModalDisplay",
  WalletPassModalDismiss = "[Auth] WalletPassModalDismiss",
  WalletPassSet = "[Auth] WalletPassSet", // 设置密码后，立刻加密当前KeyStore并保存 success，若无KeyStore，failed
  WalletPassSetSuccess = "[Auth] WalletPassSetSuccess",
  WalletPassSetFailed = "[Auth] WalletPassSetFailed",

  Unauthed = "[Auth] Unauthed",
  Lock = "[Auth] Lock",
  Unlock = "[Auth] Unlock",
  UnlockSuccess = "[Auth] UnlockSuccess",
  UnlockFailed = "[Auth] UnlockFailed",
  UnlockModalDisplay = "[Auth] UnlockModalDisplay",
  UnlockModalDismiss = "[Auth] UnlockModalDismiss"
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
export class AuthRegImpl implements Action {
  readonly type = AuthActions.RegImpl;
  constructor(public payload: RegFormData) {}
}
export class AuthRegImplSuccess implements Action {
  readonly type = AuthActions.RegImplSuccess;
}
export class AuthRegImplFailed implements Action {
  readonly type = AuthActions.RegImplFailed;
  constructor(public payload: { code: number }) {}
}

export const authRegGetCaptcha = () =>
  ({ type: AuthActions.RegGetCaptcha } as AuthRegGetCaptcha);
export const authRegGetCaptchaSuccess = (captcha: FaucetCaptcha) =>
  ({
    type: AuthActions.RegGetCaptchaSuccess,
    payload: captcha
  } as AuthRegGetCaptchaSuccess);
export const authRegImpl = (regData: RegFormData) =>
  ({ type: AuthActions.RegImpl, payload: regData } as AuthRegImpl);
export const authRegImplSuccess = () =>
  ({ type: AuthActions.RegImplSuccess } as AuthRegImplSuccess);
export const authRegImplFailed = (err: { code: number }) =>
  ({ type: AuthActions.RegImplFailed, payload: err } as AuthRegImplFailed);

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

export class AuthWalletPassModalDisplay implements Action {
  readonly type = AuthActions.WalletPassModalDisplay;
}
export class AuthWalletPassModalDismiss implements Action {
  readonly type = AuthActions.WalletPassModalDismiss;
}
export class AuthWalletPassSet implements Action {
  readonly type = AuthActions.WalletPassSet;
  constructor(public payload: { password: string; count: number }) {}
}
export class AuthWalletPassSetSuccess implements Action {
  readonly type = AuthActions.WalletPassSetSuccess;
  constructor(public payload: { cipher: string; count: number }) {}
}
export class AuthWalletPassSetFailed implements Action {
  readonly type = AuthActions.WalletPassSetFailed;
}
export const authDisplayWalletPassModal = () => ({
  ...new AuthWalletPassModalDisplay()
});
export const authDismissWalletPassModal = () => ({
  ...new AuthWalletPassModalDismiss()
});
export const authSetWalletPass = (
  password: string,
  count = AuthDefaultUnlockCount
) => ({
  ...new AuthWalletPassSet({ password, count })
});
export const authSetWalletPassSuccess = (cipher: string, count: number) => ({
  ...new AuthWalletPassSetSuccess({ cipher, count })
});
export const authSetWalletPassFailed = () => ({
  ...new AuthWalletPassSetFailed()
});

export class AuthUnauthedAction implements Action {
  readonly type = AuthActions.Unauthed;
}
export class AuthLockAction implements Action {
  readonly type = AuthActions.Lock;
}
export class AuthUnlockAction implements Action {
  readonly type = AuthActions.Unlock;
  constructor(public payload: string) {}
}
export class AuthUnlockSuccessAction implements Action {
  readonly type = AuthActions.UnlockSuccess;
  constructor(public payload: KeyStore) {}
}
export class AuthUnlockFailedAction implements Action {
  readonly type = AuthActions.UnlockFailed;
}
export class AuthUnlockModalDisplayAction implements Action {
  readonly type = AuthActions.UnlockModalDisplay;
}
export class AuthUnlockModalDismissAction implements Action {
  readonly type = AuthActions.UnlockModalDismiss;
}
export const authUnauthed: () => AuthUnauthedAction = () => ({
  type: AuthActions.Unauthed
});
export const authLock: () => AuthLockAction = () => ({
  type: AuthActions.Lock
});
export const authUnlock: (seed: string) => AuthUnlockAction = seed => ({
  ...new AuthUnlockAction(seed)
});
export const authUnlockSuccess: (
  keyStore: KeyStore
) => AuthUnlockSuccessAction = keyStore => ({
  ...new AuthUnlockSuccessAction(keyStore)
});
export const authUnlockFailed: () => AuthUnlockFailedAction = () => ({
  type: AuthActions.UnlockFailed
});
export const authUnlockModalDisplay: () => AuthUnlockModalDisplayAction = () => ({
  type: AuthActions.UnlockModalDisplay
});
export const authUnlockModalDismiss: () => AuthUnlockModalDismissAction = () => ({
  type: AuthActions.UnlockModalDismiss
});
// Balances
export class AuthUpdateBalanceAction implements Action {
  readonly type = AuthActions.UpdateBalance;
}
export class AuthUpdateBalanceSuccessAction implements Action {
  readonly type = AuthActions.UpdateBalanceSuccess;
  constructor(public payload: BalanceObj) {}
}

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
  | AuthRegImpl
  | AuthRegImplSuccess
  | AuthRegImplFailed
  | AuthLogoutAction
  | AuthLoginAction
  | AuthLoginFailedAction
  | AuthLoginSuccessAction
  | AuthUpdateBalanceAction
  | AuthUpdateBalanceSuccessAction
  | AuthUnauthedAction
  | AuthLockAction
  | AuthUnlockAction
  | AuthUnlockSuccessAction
  | AuthUnlockFailedAction
  | AuthUnlockModalDisplayAction
  | AuthUnlockModalDismissAction
  | AuthWalletPassModalDismiss
  | AuthWalletPassModalDisplay
  | AuthWalletPassSet
  | AuthWalletPassSetSuccess
  | AuthWalletPassSetFailed;
