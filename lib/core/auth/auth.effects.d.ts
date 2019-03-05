import { Epic } from "redux-observable";
import { AuthLoginSuccessAction, AuthLoginFailedAction, AuthUpdateBalanceSuccessAction, AuthUpdateBalanceAction, AuthLogoutAction } from "./auth.actions";
import { IEffectDeps } from "../modes";
import { ActionCorePushNoti } from "../core.actions";
import { AuthRegGetCaptcha, AuthLoginModalSwitchPanel } from "./index";
export declare const loginEpic: Epic<any, AuthLoginSuccessAction | AuthLoginFailedAction, any, IEffectDeps>;
export declare const authUpdateBalanceEpic: Epic<AuthLoginSuccessAction | AuthLogoutAction | AuthUpdateBalanceAction, AuthUpdateBalanceAction, any, IEffectDeps>;
export declare const updateBalanceEpic: Epic<AuthUpdateBalanceSuccessAction | AuthUpdateBalanceAction, AuthUpdateBalanceSuccessAction, any, IEffectDeps>;
export declare const loginFailedEpic: Epic<any, ActionCorePushNoti, any, IEffectDeps>;
export declare const regPanelCaptchaEpic: Epic<AuthLoginModalSwitchPanel, any, any, IEffectDeps>;
export declare const captchaEpic: Epic<AuthRegGetCaptcha, any, any, IEffectDeps>;
export declare const loginCloseEpic: Epic<any, any, any, IEffectDeps>;
