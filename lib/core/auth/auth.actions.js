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
import { AuthDefaultUnlockCount } from "./auth.models";
export var AuthActions;
(function (AuthActions) {
    AuthActions["LoginModalShow"] = "[Auth] LoginModalShow";
    AuthActions["LoginModalClose"] = "[Auth] LoginModalClose";
    AuthActions["LoginModalSwitchPanel"] = "[Auth] LoginModalSwitchPanel";
    AuthActions["RegGetCaptcha"] = "[Auth] RegGetCaptcha";
    AuthActions["RegGetCaptchaSuccess"] = "[Auth] RegGetCaptchaSuccess";
    AuthActions["RegImpl"] = "[Auth] RegImpl";
    AuthActions["RegImplSuccess"] = "[Auth] RegImplSuccess";
    AuthActions["RegImplFailed"] = "[Auth] RegImplFailed";
    AuthActions["Login"] = "[Auth] Login";
    AuthActions["LoginSuccess"] = "[Auth] Login Success";
    AuthActions["LoginFailed"] = "[Auth] Login Failed";
    AuthActions["Logout"] = "[Auth] Logout";
    AuthActions["UpdateBalance"] = "[Auth] UpdateBalance";
    AuthActions["UpdateBalanceSuccess"] = "[Auth] UpdateBalanceSuccess";
    AuthActions["WalletPassModalDisplay"] = "[Auth] WalletPassModalDisplay";
    AuthActions["WalletPassModalDismiss"] = "[Auth] WalletPassModalDismiss";
    AuthActions["WalletPassSet"] = "[Auth] WalletPassSet";
    AuthActions["WalletPassSetSuccess"] = "[Auth] WalletPassSetSuccess";
    AuthActions["WalletPassSetFailed"] = "[Auth] WalletPassSetFailed";
    AuthActions["Unauthed"] = "[Auth] Unauthed";
    AuthActions["Lock"] = "[Auth] Lock";
    AuthActions["Unlock"] = "[Auth] Unlock";
    AuthActions["UnlockSuccess"] = "[Auth] UnlockSuccess";
    AuthActions["UnlockFailed"] = "[Auth] UnlockFailed";
    AuthActions["UnlockModalDisplay"] = "[Auth] UnlockModalDisplay";
    AuthActions["UnlockModalDismiss"] = "[Auth] UnlockModalDismiss";
})(AuthActions || (AuthActions = {}));
// Modals
var AuthLoginModalShowAction = /** @class */ (function () {
    function AuthLoginModalShowAction() {
        this.type = AuthActions.LoginModalShow;
    }
    return AuthLoginModalShowAction;
}());
export { AuthLoginModalShowAction };
var AuthLoginModalCloseAction = /** @class */ (function () {
    function AuthLoginModalCloseAction() {
        this.type = AuthActions.LoginModalClose;
    }
    return AuthLoginModalCloseAction;
}());
export { AuthLoginModalCloseAction };
var AuthLoginModalSwitchPanel = /** @class */ (function () {
    function AuthLoginModalSwitchPanel() {
        this.type = AuthActions.LoginModalSwitchPanel;
    }
    return AuthLoginModalSwitchPanel;
}());
export { AuthLoginModalSwitchPanel };
export var authShowModal = function (param) { return ({
    type: AuthActions.LoginModalShow
}); };
export var authCloseModal = function (param) { return ({
    type: AuthActions.LoginModalClose
}); };
export var authModalSwitchPanel = function () {
    return ({ type: AuthActions.LoginModalSwitchPanel });
};
// Resiger
var AuthRegGetCaptcha = /** @class */ (function () {
    function AuthRegGetCaptcha() {
        this.type = AuthActions.RegGetCaptcha;
    }
    return AuthRegGetCaptcha;
}());
export { AuthRegGetCaptcha };
var AuthRegGetCaptchaSuccess = /** @class */ (function () {
    function AuthRegGetCaptchaSuccess(payload) {
        this.payload = payload;
        this.type = AuthActions.RegGetCaptchaSuccess;
    }
    return AuthRegGetCaptchaSuccess;
}());
export { AuthRegGetCaptchaSuccess };
var AuthRegImpl = /** @class */ (function () {
    function AuthRegImpl(payload) {
        this.payload = payload;
        this.type = AuthActions.RegImpl;
    }
    return AuthRegImpl;
}());
export { AuthRegImpl };
var AuthRegImplSuccess = /** @class */ (function () {
    function AuthRegImplSuccess() {
        this.type = AuthActions.RegImplSuccess;
    }
    return AuthRegImplSuccess;
}());
export { AuthRegImplSuccess };
var AuthRegImplFailed = /** @class */ (function () {
    function AuthRegImplFailed(payload) {
        this.payload = payload;
        this.type = AuthActions.RegImplFailed;
    }
    return AuthRegImplFailed;
}());
export { AuthRegImplFailed };
export var authRegGetCaptcha = function () {
    return ({ type: AuthActions.RegGetCaptcha });
};
export var authRegGetCaptchaSuccess = function (captcha) {
    return ({
        type: AuthActions.RegGetCaptchaSuccess,
        payload: captcha
    });
};
export var authRegImpl = function (regData) {
    return ({ type: AuthActions.RegImpl, payload: regData });
};
export var authRegImplSuccess = function () {
    return ({ type: AuthActions.RegImplSuccess });
};
export var authRegImplFailed = function (err) {
    return ({ type: AuthActions.RegImplFailed, payload: err });
};
// LoginImplement
var AuthLoginAction = /** @class */ (function () {
    function AuthLoginAction(payload) {
        this.payload = payload;
        this.type = AuthActions.Login;
    }
    return AuthLoginAction;
}());
export { AuthLoginAction };
var AuthLoginFailedAction = /** @class */ (function () {
    function AuthLoginFailedAction() {
        this.type = AuthActions.LoginFailed;
    }
    return AuthLoginFailedAction;
}());
export { AuthLoginFailedAction };
var AuthLoginSuccessAction = /** @class */ (function () {
    function AuthLoginSuccessAction(payload) {
        this.payload = payload;
        this.type = AuthActions.LoginSuccess;
    }
    return AuthLoginSuccessAction;
}());
export { AuthLoginSuccessAction };
var AuthLogoutAction = /** @class */ (function () {
    function AuthLogoutAction() {
        this.type = AuthActions.Logout;
    }
    return AuthLogoutAction;
}());
export { AuthLogoutAction };
export var authLogout = function (param) { return ({
    type: AuthActions.Logout
}); };
export var authLoginFailed = function (param) { return ({
    type: AuthActions.LoginFailed
}); };
export var authLogin = function (param) { return ({
    type: AuthActions.Login,
    payload: param
}); };
export var authLoginSuccess = function (param) { return ({
    type: AuthActions.LoginSuccess,
    payload: param
}); };
var AuthWalletPassModalDisplay = /** @class */ (function () {
    function AuthWalletPassModalDisplay() {
        this.type = AuthActions.WalletPassModalDisplay;
    }
    return AuthWalletPassModalDisplay;
}());
export { AuthWalletPassModalDisplay };
var AuthWalletPassModalDismiss = /** @class */ (function () {
    function AuthWalletPassModalDismiss() {
        this.type = AuthActions.WalletPassModalDismiss;
    }
    return AuthWalletPassModalDismiss;
}());
export { AuthWalletPassModalDismiss };
var AuthWalletPassSet = /** @class */ (function () {
    function AuthWalletPassSet(payload) {
        this.payload = payload;
        this.type = AuthActions.WalletPassSet;
    }
    return AuthWalletPassSet;
}());
export { AuthWalletPassSet };
var AuthWalletPassSetSuccess = /** @class */ (function () {
    function AuthWalletPassSetSuccess(payload) {
        this.payload = payload;
        this.type = AuthActions.WalletPassSetSuccess;
    }
    return AuthWalletPassSetSuccess;
}());
export { AuthWalletPassSetSuccess };
var AuthWalletPassSetFailed = /** @class */ (function () {
    function AuthWalletPassSetFailed() {
        this.type = AuthActions.WalletPassSetFailed;
    }
    return AuthWalletPassSetFailed;
}());
export { AuthWalletPassSetFailed };
export var authDisplayWalletPassModal = function () { return (__assign({}, new AuthWalletPassModalDisplay())); };
export var authDismissWalletPassModal = function () { return (__assign({}, new AuthWalletPassModalDismiss())); };
export var authSetWalletPass = function (password, count) {
    if (count === void 0) { count = AuthDefaultUnlockCount; }
    return (__assign({}, new AuthWalletPassSet({ password: password, count: count })));
};
export var authSetWalletPassSuccess = function (cipher, count) { return (__assign({}, new AuthWalletPassSetSuccess({ cipher: cipher, count: count }))); };
export var authSetWalletPassFailed = function () { return (__assign({}, new AuthWalletPassSetFailed())); };
var AuthUnauthedAction = /** @class */ (function () {
    function AuthUnauthedAction() {
        this.type = AuthActions.Unauthed;
    }
    return AuthUnauthedAction;
}());
export { AuthUnauthedAction };
var AuthLockAction = /** @class */ (function () {
    function AuthLockAction() {
        this.type = AuthActions.Lock;
    }
    return AuthLockAction;
}());
export { AuthLockAction };
var AuthUnlockAction = /** @class */ (function () {
    function AuthUnlockAction(payload) {
        this.payload = payload;
        this.type = AuthActions.Unlock;
    }
    return AuthUnlockAction;
}());
export { AuthUnlockAction };
var AuthUnlockSuccessAction = /** @class */ (function () {
    function AuthUnlockSuccessAction(payload) {
        this.payload = payload;
        this.type = AuthActions.UnlockSuccess;
    }
    return AuthUnlockSuccessAction;
}());
export { AuthUnlockSuccessAction };
var AuthUnlockFailedAction = /** @class */ (function () {
    function AuthUnlockFailedAction() {
        this.type = AuthActions.UnlockFailed;
    }
    return AuthUnlockFailedAction;
}());
export { AuthUnlockFailedAction };
var AuthUnlockModalDisplayAction = /** @class */ (function () {
    function AuthUnlockModalDisplayAction() {
        this.type = AuthActions.UnlockModalDisplay;
    }
    return AuthUnlockModalDisplayAction;
}());
export { AuthUnlockModalDisplayAction };
var AuthUnlockModalDismissAction = /** @class */ (function () {
    function AuthUnlockModalDismissAction() {
        this.type = AuthActions.UnlockModalDismiss;
    }
    return AuthUnlockModalDismissAction;
}());
export { AuthUnlockModalDismissAction };
export var authUnauthed = function () { return ({
    type: AuthActions.Unauthed
}); };
export var authLock = function () { return ({
    type: AuthActions.Lock
}); };
export var authUnlock = function (seed) { return (__assign({}, new AuthUnlockAction(seed))); };
export var authUnlockSuccess = function (keyStore) { return (__assign({}, new AuthUnlockSuccessAction(keyStore))); };
export var authUnlockFailed = function () { return ({
    type: AuthActions.UnlockFailed
}); };
export var authUnlockModalDisplay = function () { return ({
    type: AuthActions.UnlockModalDisplay
}); };
export var authUnlockModalDismiss = function () { return ({
    type: AuthActions.UnlockModalDismiss
}); };
// Balances
var AuthUpdateBalanceAction = /** @class */ (function () {
    function AuthUpdateBalanceAction() {
        this.type = AuthActions.UpdateBalance;
    }
    return AuthUpdateBalanceAction;
}());
export { AuthUpdateBalanceAction };
var AuthUpdateBalanceSuccessAction = /** @class */ (function () {
    function AuthUpdateBalanceSuccessAction(payload) {
        this.payload = payload;
        this.type = AuthActions.UpdateBalanceSuccess;
    }
    return AuthUpdateBalanceSuccessAction;
}());
export { AuthUpdateBalanceSuccessAction };
export var authUpdateBalance = function () { return ({
    type: AuthActions.UpdateBalance
}); };
export var authUpdateBalanceSuccess = function (balanceObj) { return ({
    type: AuthActions.UpdateBalanceSuccess,
    payload: balanceObj
}); };
