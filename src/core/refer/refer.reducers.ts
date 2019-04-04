import { Reducer } from "redux";
import { ReferState } from "./refer.models";
import { ReferAction, ReferActions } from "./refer.actions";

export const refer: Reducer<ReferState, ReferAction> = (
  state = new ReferState(),
  action
) => {
  switch (action.type) {
    case ReferActions.Add:
      return {
        ...state,
        isLoading: true
      };
    case ReferActions.AddSuccess:
    case ReferActions.AddFailed:
      return {
        ...state,
        isLoading: false
      };
    case ReferActions.LoadReferInfoSuccess:
      return { ...state, ...action.payload };
    case ReferActions.LoadRebateSuccess:
      return { ...state, rebates: action.payload };
    default:
      return state;
  }
};
