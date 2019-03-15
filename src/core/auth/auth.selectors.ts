import { createSelector } from "reselect";
import { CoreState } from "../core.models";
import { AuthStatus, LoginPanel } from "./auth.models";

export const selectAuth = (state: CoreState) => state.auth;
export const selectCurrentAccountInfo = createSelector(
  selectAuth,
  auth => auth.account
);
export const selectCurrentAccount = createSelector(
  selectAuth,
  auth => auth.accountName
);
export const selectCurrentKeystore = createSelector(
  selectAuth,
  auth => auth.keyStore
);
export const selectAuthStatus = createSelector(
  selectAuth,
  selectCurrentKeystore,
  (auth, keyStore) =>
    !auth.isAuthed
      ? AuthStatus.NOT_LOGIN
      : !!keyStore
      ? AuthStatus.LOGIN_NORMAL
      : AuthStatus.LOGIN_LOCKED
);
export const selectAuthIsLogging = createSelector(
  selectAuth,
  auth => auth.isLogging
);

export const selectKeyStoreCipher = createSelector(
  selectAuth,
  auth => auth.keyStoreCipher
);

export const selectAuthModal = createSelector(
  selectAuth,
  auth => auth.showModal
);
export const selectSetPassModal = createSelector(
  selectAuth,
  auth => auth.showSetPassword
);
export const selectUnlockModal = createSelector(
  selectAuth,
  auth => auth.showUnlock
);
export const selectUnlockCounter = createSelector(
  selectAuth,
  auth => auth.unlockCounter
);

export const selectAuthSet = createSelector(
  selectAuthStatus,
  selectCurrentAccount,
  selectCurrentKeystore,
  (isAuthed, account, keyStore) =>
    isAuthed === AuthStatus.LOGIN_NORMAL &&
    !!account &&
    !!keyStore &&
    !!keyStore.activeKey &&
    !!keyStore.activeKey.privKey && {
      account,
      key: keyStore.activeKey.privKey
    }
);

export const selectBalances = createSelector(
  selectAuth,
  auth => auth.balances
);

export const selectLoginPanel = createSelector(
  selectKeyStoreCipher,
  selectAuth,
  (cipher, auth) => (cipher ? LoginPanel.Unlock : auth.loginPanel)
);

export const selectRegCaptcha = createSelector(
  selectAuth,
  auth => auth.captcha
);
export const selectDefaultReferer = createSelector(
  selectAuth,
  auth => auth.defaultReferer
);
