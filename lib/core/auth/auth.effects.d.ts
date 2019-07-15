import { Epic } from "redux-observable";
import { AuthLoginSuccessAction, AuthLoginFailedAction, AuthUpdateBalanceSuccessAction, AuthUpdateBalanceAction, AuthLogoutAction, AuthRegImpl, AuthRegImplFailed, AuthLoginModalShowAction, AuthWalletPassSet, AuthWalletPassSetSuccess, AuthUnlockSuccessAction, AuthUnlockFailedAction } from "./auth.actions";
import { IEffectDeps } from "../modes";
import { ActionCorePushNoti } from "../core.actions";
import { AuthRegGetCaptcha, AuthLoginModalSwitchPanel } from "./index";
export declare const loginEpic: Epic<any, AuthLoginSuccessAction | AuthLoginFailedAction, any, IEffectDeps>;
export declare const authUpdateBalanceEpic: Epic<AuthLoginSuccessAction | AuthLogoutAction | AuthUpdateBalanceAction, AuthUpdateBalanceAction, any, IEffectDeps>;
export declare const updateBalanceEpic: Epic<AuthUpdateBalanceSuccessAction | AuthUpdateBalanceAction, AuthUpdateBalanceSuccessAction, any, IEffectDeps>;
export declare const loginFailedEpic: Epic<any, ActionCorePushNoti, any, IEffectDeps>;
export declare const displaySetPasswordAfterLoginEpic: Epic<AuthLoginSuccessAction, any, any, IEffectDeps>;
export declare const dismissPasswordModalAfterSuccessEpic: Epic<AuthWalletPassSetSuccess, any, any, IEffectDeps>;
export declare const setPasswordEpic: Epic<AuthWalletPassSet, any, any, IEffectDeps>;
export declare const logoutClearCipherEpic: Epic<any, any, any, IEffectDeps>;
export declare const unauthDisplayLoginEpic: Epic<any, AuthLoginModalShowAction, any, IEffectDeps>;
export declare const unlockEpic: Epic<any, AuthUnlockSuccessAction | AuthUnlockFailedAction, any, IEffectDeps>;
export declare const lockTimerEpic: Epic<any, any, any, IEffectDeps>;
export declare const unlockSuccessEpic: Epic<any, AuthLoginSuccessAction | AuthUnlockFailedAction, any, IEffectDeps>;
export declare const unlockSuccessNotiEpic: Epic<any, any, any, IEffectDeps>;
export declare const unlockFailedEpic: Epic<any, ActionCorePushNoti | AuthLogoutAction, any, IEffectDeps>;
export declare const regPanelCaptchaEpic: Epic<AuthLoginModalSwitchPanel | AuthLoginModalShowAction, any, any, IEffectDeps>;
export declare const captchaEpic: Epic<AuthRegGetCaptcha | AuthRegImplFailed, any, any, IEffectDeps>;
export declare const authRegEpic: Epic<AuthRegImpl, any, any, IEffectDeps>;
export declare const regFailedEpic: Epic<any, ActionCorePushNoti, any, IEffectDeps>;
export declare const loginCloseEpic: Epic<any, any, any, IEffectDeps>;
