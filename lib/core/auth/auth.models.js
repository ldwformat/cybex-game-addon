import { resolveNameFromReferUrl } from "../../utils/refer-url";
var AuthState = /** @class */ (function () {
    function AuthState() {
        this.isAuthed = false;
        this.isLogging = false;
        this.showModal = false;
        this.accountName = null;
        this.keyStore = null;
        this.balances = {};
        this.account = null;
        this.captcha = null;
        this.loginPanel = LoginPanel.Login;
        this.defaultReferer = resolveNameFromReferUrl(location.search) || null;
    }
    return AuthState;
}());
export { AuthState };
export var LoginPanel;
(function (LoginPanel) {
    LoginPanel[LoginPanel["Login"] = 0] = "Login";
    LoginPanel[LoginPanel["Register"] = 1] = "Register";
})(LoginPanel || (LoginPanel = {}));
