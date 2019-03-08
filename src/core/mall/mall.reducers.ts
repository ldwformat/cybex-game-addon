import { Reducer } from "redux";
import { MallState, Chore } from "./mall.models";
import { MallChoreAction, MallActions } from "./mall.actions";
import { MallBackendProvince } from "../../utils/fetcher";

const proviceMap: Reducer<
  { [countryID: number]: MallBackendProvince[] },
  MallChoreAction
> = (state = {}, action) => {
  switch (action.type) {
    case MallActions.LoadProvincesSuccess:
      return {
        ...state,
        [action.payload.countryID]: action.payload.provinces
      };
    default:
      return state;
  }
};

const chore: Reducer<Chore, MallChoreAction> = (
  state = new Chore(),
  action
) => {
  switch (action.type) {
    case MallActions.LoadCountriesSuccess:
      return {
        ...state,
        countryList: action.payload
      };
    case MallActions.LoadProvincesSuccess:
      return {
        ...state,
        proviceMap: proviceMap(state.proviceMap, action)
      };
    default:
      return state;
  }
};

export const mall: Reducer<MallState> = (state = new MallState(), action) => ({
  chore: chore(state.chore, action)
});
