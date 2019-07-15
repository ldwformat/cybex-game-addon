import { createSelector } from "reselect";
export var selectMall = function (state) { return state.mall; };
export var selectMallChore = createSelector(selectMall, function (mall) { return mall.chore; });
export var selectMallProvincesMap = createSelector(selectMallChore, function (chore) { return chore.proviceMap; });
export var selectCountryList = createSelector(selectMallChore, function (chore) { return chore.countryList; });
export var selectMallPrvsByCountryID = function (countryID) {
    return createSelector(selectMallProvincesMap, function (prvsMap) { return prvsMap[countryID]; });
};
