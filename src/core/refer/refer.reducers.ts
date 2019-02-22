import { Reducer } from "redux";
import { ReferState } from "./refer.models";
import { ReferAction, ReferActions } from "./refer.actions";

export const refer: Reducer<ReferState, ReferAction> = (
  state = new ReferState(),
  action
) => {
  switch (action.type) {
    case ReferActions.LoadReferInfoSuccess:
      return action.payload;
    default:
      return state;
  }
};
