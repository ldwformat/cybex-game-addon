import { Action, ActionCreator } from "redux";
import { IAuthParams, IAuthResult, BalanceObj, FaucetCaptcha } from "./auth.models";
import { RegFormData } from "../../components/reg-form";
import { KeyStore } from "./keystore/keystore";
export declare enum AuthActions {
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
    WalletPassSet = "[Auth] WalletPassSet",
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
export declare class AuthRegImpl implements Action {
    payload: RegFormData;
    readonly type = AuthActions.RegImpl;
    constructor(payload: RegFormData);
}
export declare class AuthRegImplSuccess implements Action {
    readonly type = AuthActions.RegImplSuccess;
}
export declare class AuthRegImplFailed implements Action {
    payload: {
        code: number;
    };
    readonly type = AuthActions.RegImplFailed;
    constructor(payload: {
        code: number;
    });
}
export declare const authRegGetCaptcha: () => AuthRegGetCaptcha;
export declare const authRegGetCaptchaSuccess: (captcha: FaucetCaptcha) => AuthRegGetCaptchaSuccess;
export declare const authRegImpl: (regData: RegFormData) => AuthRegImpl;
export declare const authRegImplSuccess: () => AuthRegImplSuccess;
export declare const authRegImplFailed: (err: {
    code: number;
}) => AuthRegImplFailed;
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
export declare class AuthWalletPassModalDisplay implements Action {
    readonly type = AuthActions.WalletPassModalDisplay;
}
export declare class AuthWalletPassModalDismiss implements Action {
    readonly type = AuthActions.WalletPassModalDismiss;
}
export declare class AuthWalletPassSet implements Action {
    payload: {
        password: string;
        count: number;
    };
    readonly type = AuthActions.WalletPassSet;
    constructor(payload: {
        password: string;
        count: number;
    });
}
export declare class AuthWalletPassSetSuccess implements Action {
    payload: {
        cipher: string;
        count: number;
    };
    readonly type = AuthActions.WalletPassSetSuccess;
    constructor(payload: {
        cipher: string;
        count: number;
    });
}
export declare class AuthWalletPassSetFailed implements Action {
    readonly type = AuthActions.WalletPassSetFailed;
}
export declare const authDisplayWalletPassModal: () => {
    type: AuthActions.WalletPassModalDisplay;
};
export declare const authDismissWalletPassModal: () => {
    type: AuthActions.WalletPassModalDismiss;
};
export declare const authSetWalletPass: (password: string, count?: number) => {
    type: AuthActions.WalletPassSet;
    payload: {
        password: string;
        count: number;
    };
};
export declare const authSetWalletPassSuccess: (cipher: string, count: number) => {
    type: AuthActions.WalletPassSetSuccess;
    payload: {
        cipher: string;
        count: number;
    };
};
export declare const authSetWalletPassFailed: () => {
    type: AuthActions.WalletPassSetFailed;
};
export declare class AuthUnauthedAction implements Action {
    readonly type = AuthActions.Unauthed;
}
export declare class AuthLockAction implements Action {
    readonly type = AuthActions.Lock;
}
export declare class AuthUnlockAction implements Action {
    payload: string;
    readonly type = AuthActions.Unlock;
    constructor(payload: string);
}
export declare class AuthUnlockSuccessAction implements Action {
    payload: KeyStore;
    readonly type = AuthActions.UnlockSuccess;
    constructor(payload: KeyStore);
}
export declare class AuthUnlockFailedAction implements Action {
    readonly type = AuthActions.UnlockFailed;
}
export declare class AuthUnlockModalDisplayAction implements Action {
    readonly type = AuthActions.UnlockModalDisplay;
}
export declare class AuthUnlockModalDismissAction implements Action {
    readonly type = AuthActions.UnlockModalDismiss;
}
export declare const authUnauthed: () => AuthUnauthedAction;
export declare const authLock: () => AuthLockAction;
export declare const authUnlock: (seed: string) => AuthUnlockAction;
export declare const authUnlockSuccess: (keyStore: KeyStore) => AuthUnlockSuccessAction;
export declare const authUnlockFailed: () => AuthUnlockFailedAction;
export declare const authUnlockModalDisplay: () => AuthUnlockModalDisplayAction;
export declare const authUnlockModalDismiss: () => AuthUnlockModalDismissAction;
export declare class AuthUpdateBalanceAction implements Action {
    readonly type = AuthActions.UpdateBalance;
}
export declare class AuthUpdateBalanceSuccessAction implements Action {
    payload: BalanceObj;
    readonly type = AuthActions.UpdateBalanceSuccess;
    constructor(payload: BalanceObj);
}
export declare const authUpdateBalance: () => AuthUpdateBalanceAction;
export declare const authUpdateBalanceSuccess: (balanceObj: BalanceObj) => AuthUpdateBalanceSuccessAction;
export declare type AuthAction = AuthLoginModalShowAction | AuthLoginModalCloseAction | AuthLoginModalSwitchPanel | AuthRegGetCaptcha | AuthRegGetCaptchaSuccess | AuthRegImpl | AuthRegImplSuccess | AuthRegImplFailed | AuthLogoutAction | AuthLoginAction | AuthLoginFailedAction | AuthLoginSuccessAction | AuthUpdateBalanceAction | AuthUpdateBalanceSuccessAction | AuthUnauthedAction | AuthLockAction | AuthUnlockAction | AuthUnlockSuccessAction | AuthUnlockFailedAction | AuthUnlockModalDisplayAction | AuthUnlockModalDismissAction | AuthWalletPassModalDismiss | AuthWalletPassModalDisplay | AuthWalletPassSet | AuthWalletPassSetSuccess | AuthWalletPassSetFailed;
