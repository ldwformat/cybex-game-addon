import { Selector, createSelector } from "reselect";
import { CoreState, AppState } from "./core.models";

export const selectApp: Selector<CoreState, AppState> = state => state.app;

export const selectNoties = createSelector(
  selectApp,
  app => app.noties
);
export const selectGame: Selector<CoreState, string> = state => state.game;
