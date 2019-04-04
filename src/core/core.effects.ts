import { Epic, ofType } from "redux-observable";
import { CoreState } from "./core.models";
import { IEffectDeps, EVENT_ACTION } from "./modes";
import { switchMap, take, map, catchError, tap } from "rxjs/operators";
import { NEVER, from } from "rxjs";
import {
  ActionCoreLoadPriceList,
  CoreActions,
  ActionCoreLoadPriceListSuccess,
  loadPriceList,
  loadPriceListSuccess
} from "./core.actions";
import { AuthLoginSuccessAction, AuthActions } from "./auth";
import { AddonStorage } from "../utils/storage";

export const loadPriceListEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { priceFetcher, storage }
) =>
  action$.pipe(
    ofType<AuthLoginSuccessAction | ActionCoreLoadPriceList>(
      AuthActions.LoginSuccess,
      CoreActions.LoadPriceList
    ),
    switchMap(() =>
      from(priceFetcher.fetchPrices()).pipe(
        tap(priceList =>
          storage.setItem(AddonStorage.CommonKeys.PriceList, priceList)
        ),
        map(loadPriceListSuccess),
        catchError(err => {
          console.error("Fetch Price Error: ", err);
          return NEVER;
        })
      )
    )
  );

export const notifierEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { notifier }
) =>
  action$.pipe(
    switchMap(action =>
      state$.pipe(state => {
        notifier.emit(EVENT_ACTION, { action, state });
        return NEVER;
      })
    )
  );
