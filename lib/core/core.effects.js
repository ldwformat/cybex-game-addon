import { ofType } from "redux-observable";
import { EVENT_ACTION } from "./modes";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { NEVER, from } from "rxjs";
import { CoreActions, loadPriceListSuccess } from "./core.actions";
import { AuthActions } from "./auth";
import { AddonStorage } from "../utils/storage";
export var loadPriceListEpic = function (action$, state$, _a) {
    var priceFetcher = _a.priceFetcher, storage = _a.storage;
    return action$.pipe(ofType(AuthActions.LoginSuccess, CoreActions.LoadPriceList), switchMap(function () {
        return from(priceFetcher.fetchPrices()).pipe(tap(function (priceList) {
            return storage.setItem(AddonStorage.CommonKeys.PriceList, priceList);
        }), map(loadPriceListSuccess), catchError(function (err) {
            console.error("Fetch Price Error: ", err);
            return NEVER;
        }));
    }));
};
export var notifierEpic = function (action$, state$, _a) {
    var notifier = _a.notifier;
    return action$.pipe(switchMap(function (action) {
        return state$.pipe(function (state) {
            notifier.emit(EVENT_ACTION, { action: action, state: state });
            return NEVER;
        });
    }));
};
