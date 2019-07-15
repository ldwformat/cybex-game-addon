import { resolveNameFromReferUrl } from "../../utils/refer-url";
export var AuthDefaultUnlockCount = 5;
export var LoginPanel;
(function (LoginPanel) {
    LoginPanel[LoginPanel["Login"] = 0] = "Login";
    LoginPanel[LoginPanel["Register"] = 1] = "Register";
    LoginPanel[LoginPanel["Unlock"] = 2] = "Unlock";
})(LoginPanel || (LoginPanel = {}));
var AuthState = /** @class */ (function () {
    function AuthState() {
        this.isAuthed = false;
        this.isLogging = false;
        this.showModal = false;
        this.showUnlock = false;
        this.showSetPassword = false;
        this.unlockCounter = AuthDefaultUnlockCount;
        this.accountName = null;
        this.keyStore = null;
        this.keyStoreCipher = null;
        this.balances = {};
        this.account = null;
        this.captcha = null;
        this.loginPanel = LoginPanel.Login;
        this.defaultReferer = resolveNameFromReferUrl(location.search) || null;
    }
    return AuthState;
}());
export { AuthState };
export var AuthStatus;
(function (AuthStatus) {
    AuthStatus[AuthStatus["NOT_LOGIN"] = 0] = "NOT_LOGIN";
    AuthStatus[AuthStatus["LOGIN_NORMAL"] = 1] = "LOGIN_NORMAL";
    AuthStatus[AuthStatus["LOGIN_LOCKED"] = 2] = "LOGIN_LOCKED";
})(AuthStatus || (AuthStatus = {}));
