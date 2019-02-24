export var AuthActions;
(function (AuthActions) {
    AuthActions["Login"] = "[Auth] Login";
    AuthActions["LoginSuccess"] = "[Auth] Login Success";
    AuthActions["LoginFailed"] = "[Auth] Login Failed";
    AuthActions["Logout"] = "[Auth] Logout";
    AuthActions["Unauthed"] = "[Auth] Unauthed";
})(AuthActions || (AuthActions = {}));
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
export var authLoginSuccess = function (param) { return ({
    type: AuthActions.LoginSuccess,
    payload: param
}); };
