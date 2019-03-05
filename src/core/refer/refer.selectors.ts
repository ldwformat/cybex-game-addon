import { Selector, createSelector } from "reselect";
import { CoreState } from "..";
import { ReferState } from "./refer.models";
import { selectAuthSet } from "../auth/auth.selectors";
import { selectGame } from "../core.selectors";
import { NAME_OF_ACTION_REGISTER } from "../auth";

export const selectRefer: Selector<CoreState, ReferState> = state =>
  state.refer;

export const selectReferLoading = createSelector(
  selectRefer,
  refer => refer.isLoading
);
export const selectMyRegisterReferrer = createSelector(
  selectRefer,
  refer =>
    refer.referrers.find(
      referrer => referrer.action === NAME_OF_ACTION_REGISTER
    )
);
export const selectMyRegisterReferral = createSelector(
  selectRefer,
  refer =>
    refer.referrals.find(
      referrer => referrer.action === NAME_OF_ACTION_REGISTER
    )
);
export const selectMyGameReferrer = createSelector(
  selectRefer,
  selectGame,
  (refer, game) => refer.referrers.find(referrer => referrer.action === game)
);
export const selectMyGameReferral = createSelector(
  selectRefer,
  selectGame,
  (refer, game) => refer.referrals.find(referrer => referrer.action === game)
);
