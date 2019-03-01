import { Reducer, combineReducers } from "redux";
import { CoreState, AppState, Noti } from "./core.models";
import { auth } from "./auth";
import { mall } from "./mall";
import { refer } from "./refer";
import { gateway } from "./gateway";
import { reducer as formReducer } from "redux-form";
import { CoreAction, CoreActions } from "./core.actions";

export const app: Reducer<AppState, CoreAction> = (
  state = new AppState(),
  action
) => {
  switch (action.type) {
    case CoreActions.PushNoti:
      return {
        ...state,
        noties: [...state.noties, action.payload]
      };
    case CoreActions.RemoveNoti:
      return {
        ...state,
        noties: state.noties.filter(noti => noti.key !== action.payload)
      };
    default:
      return state;
  }
};

export const rootReducer: Reducer<CoreState> = combineReducers({
  auth,
  mall,
  refer,
  gateway,
  form: formReducer,
  app,
  game: (state = "", action) => state,
  referUrl: (state = "", action) => state
});
