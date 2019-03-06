import { ofType } from "redux-observable";
import { MallActions, mallLoadCountriesFailed, mallLoadCountriesSuccess, mallLoadProvincesSuccess, mallLoadProvincesFailed, mallLoadAddressBookSuccess, mallLoadAddressBookFailed, mallAddAddressSuccess, mallAddAddressFailed } from "./mall.actions";
import { switchMap, catchError, map, take } from "rxjs/operators";
import { of, from, NEVER } from "rxjs";
import { selectMallPrvsByCountryID } from "./mall.selectors";
import { selectAuthSet } from "../auth/auth.selectors";
import { authUnauthed } from "../auth";
export var loadCountriesEpic = function (action$, state$, _a) {
    var mallFetcher = _a.mallFetcher;
    return action$.pipe(ofType(MallActions.LoadCountries), switchMap(function (_action) {
        return from(mallFetcher.getCountryList()).pipe(map(mallLoadCountriesSuccess));
    }), catchError(function (err) {
        console.error(err);
        return of(mallLoadCountriesFailed());
    }));
};
export var loadProvincesEpic = function (action$, state$, _a) {
    var mallFetcher = _a.mallFetcher;
    return action$.pipe(ofType(MallActions.LoadProvinces), switchMap(function (_a) {
        var countryID = _a.payload;
        return state$.pipe(take(1), switchMap(function (state) {
            var prvs = selectMallPrvsByCountryID(countryID)(state);
            if (prvs) {
                return NEVER;
            }
            return from(mallFetcher.getProvinceList(countryID)).pipe(map(function (provinces) { return ({ provinces: provinces, countryID: countryID }); }), map(mallLoadProvincesSuccess));
        }));
    }), catchError(function (err) {
        console.error(err);
        return of(mallLoadProvincesFailed());
    }));
};
export var loadAddressBookEpic = function (action$, state$, _a) {
    var backendFetcher = _a.backendFetcher;
    return action$.pipe(ofType(MallActions.LoadAddressBook), switchMap(function () {
        return state$.pipe(take(1), switchMap(function (state) {
            var authSet = selectAuthSet(state);
            if (!authSet) {
                return of(authUnauthed());
            }
            return from(backendFetcher.queryAddress(authSet.account, authSet.key)).pipe(map(mallLoadAddressBookSuccess));
        }));
    }), catchError(function (err) {
        console.error(err);
        return of(mallLoadAddressBookFailed());
    }));
};
export var addAddressEpic = function (action$, state$, _a) {
    var backendFetcher = _a.backendFetcher;
    return action$.pipe(ofType(MallActions.AddAddress), switchMap(function (action) {
        return state$.pipe(take(1), switchMap(function (state) {
            var authSet = selectAuthSet(state);
            if (!authSet) {
                return of(authUnauthed());
            }
            return from(backendFetcher.addAddress(action.payload, authSet.key)).pipe(map(mallAddAddressSuccess));
        }));
    }), catchError(function (err) {
        console.error(err);
        return of(mallAddAddressFailed());
    }));
};
