import { createSelector } from "reselect";
import { AuthStatus, LoginPanel } from "./auth.models";
export var selectAuth = function (state) { return state.auth; };
export var selectCurrentAccountInfo = createSelector(selectAuth, function (auth) { return auth.account; });
export var selectCurrentAccount = createSelector(selectAuth, function (auth) { return auth.accountName; });
export var selectCurrentKeystore = createSelector(selectAuth, function (auth) { return auth.keyStore; });
export var selectAuthStatus = createSelector(selectAuth, selectCurrentKeystore, function (auth, keyStore) {
    return !auth.isAuthed
        ? AuthStatus.NOT_LOGIN
        : !!keyStore
            ? AuthStatus.LOGIN_NORMAL
            : AuthStatus.LOGIN_LOCKED;
});
export var selectAuthIsLogging = createSelector(selectAuth, function (auth) { return auth.isLogging; });
export var selectKeyStoreCipher = createSelector(selectAuth, function (auth) { return auth.keyStoreCipher; });
export var selectAuthModal = createSelector(selectAuth, function (auth) { return auth.showModal; });
export var selectSetPassModal = createSelector(selectAuth, function (auth) { return auth.showSetPassword; });
export var selectUnlockModal = createSelector(selectAuth, function (auth) { return auth.showUnlock; });
export var selectUnlockCounter = createSelector(selectAuth, function (auth) { return auth.unlockCounter; });
export var selectAuthSet = createSelector(selectAuthStatus, selectCurrentAccount, selectCurrentKeystore, function (isAuthed, account, keyStore) {
    return isAuthed === AuthStatus.LOGIN_NORMAL &&
        !!account &&
        !!keyStore &&
        !!keyStore.activeKey &&
        !!keyStore.activeKey.privKey && {
        account: account,
        key: keyStore.activeKey.privKey
    };
});
export var selectBalances = createSelector(selectAuth, function (auth) { return auth.balances; });
export var selectLoginPanel = createSelector(selectKeyStoreCipher, selectAuth, function (cipher, auth) { return (cipher ? LoginPanel.Unlock : auth.loginPanel); });
export var selectRegCaptcha = createSelector(selectAuth, function (auth) { return auth.captcha; });
export var selectDefaultReferer = createSelector(selectAuth, function (auth) { return auth.defaultReferer; });
