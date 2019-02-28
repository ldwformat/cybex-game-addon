var AuthState = /** @class */ (function () {
    function AuthState() {
        this.isAuthed = false;
        this.isLogging = false;
        this.showModal = false;
        this.accountName = null;
        this.keyStore = null;
        this.balances = {};
        this.account = null;
    }
    return AuthState;
}());
export { AuthState };
