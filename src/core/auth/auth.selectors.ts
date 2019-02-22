import { createSelector } from "reselect";
import { CoreState } from "..";

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
  auth => auth.isAuthed
);
export const selectAuthSet = createSelector(
  selectAuthStatus,
  selectCurrentAccount,
  selectCurrentKeystore,
  (isAuthed, account, keyStore) =>
    !!isAuthed &&
    !!account &&
    !!keyStore &&
    !!keyStore.activeKey &&
    !!keyStore.activeKey.privKey && {
      account,
      key: keyStore.activeKey.privKey
    }
);
