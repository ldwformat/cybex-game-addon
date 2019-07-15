var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { AuthState, LoginPanel } from "./auth.models";
import { AuthActions } from "./auth.actions";
export var auth = function (state, action) {
    if (state === void 0) { state = new AuthState(); }
    switch (action.type) {
        case AuthActions.UnlockModalDisplay:
            return __assign({}, state, { showUnlock: true });
        case AuthActions.UnlockModalDismiss:
            return __assign({}, state, { showUnlock: false });
        case AuthActions.UnlockFailed:
            return __assign({}, state, { unlockCounter: state.unlockCounter - 1 });
        case AuthActions.WalletPassModalDisplay:
            return __assign({}, state, { showSetPassword: true });
        case AuthActions.WalletPassModalDismiss:
            return __assign({}, state, { showSetPassword: false });
        case AuthActions.WalletPassSetSuccess:
            return __assign({}, state, { unlockCounter: action.payload.count, keyStoreCipher: action.payload.cipher });
        case AuthActions.Login:
        case AuthActions.RegImpl:
            return __assign({}, state, { keyStore: null, isAuthed: false, keyStoreCipher: null, account: null, accountName: null, isLogging: true });
        case AuthActions.LoginFailed:
        case AuthActions.RegImplFailed:
            return __assign({}, state, { isLogging: false });
        case AuthActions.LoginSuccess:
            return __assign({}, state, { isLogging: false, isAuthed: true }, action.payload);
        case AuthActions.UpdateBalanceSuccess:
            return __assign({}, state, { balances: action.payload });
        case AuthActions.LoginModalShow:
            return __assign({}, state, { loginPanel: LoginPanel.Login, showModal: true });
        case AuthActions.LoginModalClose:
            return __assign({}, state, { showModal: false });
        case AuthActions.Logout:
            return new AuthState();
        case AuthActions.Lock:
            return __assign({}, state, { keyStore: null });
        case AuthActions.RegGetCaptchaSuccess:
            return __assign({}, state, { captcha: action.payload });
        case AuthActions.LoginModalSwitchPanel:
            return __assign({}, state, { loginPanel: state.loginPanel === LoginPanel.Register
                    ? LoginPanel.Login
                    : LoginPanel.Register });
        default:
            return state;
    }
};
