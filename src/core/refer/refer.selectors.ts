import { Selector, createSelector } from "reselect";
import { CoreState } from "..";
import { ReferState } from "./refer.models";

export const selectRefer: Selector<CoreState, ReferState> = state =>
  state.refer;
