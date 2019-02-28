export var AuthActions;
(function (AuthActions) {
    AuthActions["LoginModalShow"] = "[Auth] LoginModalShow";
    AuthActions["LoginModalClose"] = "[Auth] LoginModalClose";
    AuthActions["Login"] = "[Auth] Login";
    AuthActions["LoginSuccess"] = "[Auth] Login Success";
    AuthActions["LoginFailed"] = "[Auth] Login Failed";
    AuthActions["UpdateBalance"] = "[Auth] UpdateBalance";
    AuthActions["UpdateBalanceSuccess"] = "[Auth] UpdateBalanceSuccess";
    AuthActions["Logout"] = "[Auth] Logout";
    AuthActions["Unauthed"] = "[Auth] Unauthed";
})(AuthActions || (AuthActions = {}));
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
export var authShowModal = function (param) { return ({
    type: AuthActions.LoginModalShow
}); };
export var authCloseModal = function (param) { return ({
    type: AuthActions.LoginModalClose
}); };
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
export var authUnauthed = function () { return ({
    type: AuthActions.Unauthed
}); };
export var authUpdateBalance = function () { return ({
    type: AuthActions.UpdateBalance
}); };
export var authLoginSuccess = function (param) { return ({
    type: AuthActions.LoginSuccess,
    payload: param
}); };
export var authUpdateBalanceSuccess = function (balanceObj) { return ({
    type: AuthActions.UpdateBalanceSuccess,
    payload: balanceObj
}); };
