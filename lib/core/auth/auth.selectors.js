import { createSelector } from "reselect";
export var selectAuth = function (state) { return state.auth; };
export var selectCurrentAccountInfo = createSelector(selectAuth, function (auth) { return auth.account; });
export var selectCurrentAccount = createSelector(selectAuth, function (auth) { return auth.accountName; });
export var selectCurrentKeystore = createSelector(selectAuth, function (auth) { return auth.keyStore; });
export var selectAuthStatus = createSelector(selectAuth, function (auth) { return auth.isAuthed; });
export var selectAuthIsLogging = createSelector(selectAuth, function (auth) { return auth.isLogging; });
export var selectAuthModal = createSelector(selectAuth, function (auth) { return auth.showModal; });
export var selectAuthSet = createSelector(selectAuthStatus, selectCurrentAccount, selectCurrentKeystore, function (isAuthed, account, keyStore) {
    return !!isAuthed &&
        !!account &&
        !!keyStore &&
        !!keyStore.activeKey &&
        !!keyStore.activeKey.privKey && {
        account: account,
        key: keyStore.activeKey.privKey
    };
});
export var selectBalances = createSelector(selectAuth, function (auth) { return auth.balances; });
