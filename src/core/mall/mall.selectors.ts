import { Selector, createSelector } from "reselect";
import { CoreState } from "../core.models";
import { MallState } from "./mall.models";

export const selectMall: Selector<CoreState, MallState> = state => state.mall;

export const selectMallChore = createSelector(
  selectMall,
  mall => mall.chore
);

export const selectMallProvincesMap = createSelector(
  selectMallChore,
  chore => chore.proviceMap
);
export const selectCountryList = createSelector(
  selectMallChore,
  chore => chore.countryList
);

export const selectMallPrvsByCountryID = (countryID: number) =>
  createSelector(
    selectMallProvincesMap,
    prvsMap => prvsMap[countryID]
  );
