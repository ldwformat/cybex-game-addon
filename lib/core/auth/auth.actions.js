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
    AuthActions["Unauthed"] = "[Auth] Unauthed";
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
// Others
var AuthUnauthedAction = /** @class */ (function () {
    function AuthUnauthedAction() {
        this.type = AuthActions.Unauthed;
    }
    return AuthUnauthedAction;
}());
export { AuthUnauthedAction };
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
export var authUnauthed = function () { return ({
    type: AuthActions.Unauthed
}); };
export var authUpdateBalance = function () { return ({
    type: AuthActions.UpdateBalance
}); };
export var authUpdateBalanceSuccess = function (balanceObj) { return ({
    type: AuthActions.UpdateBalanceSuccess,
    payload: balanceObj
}); };
