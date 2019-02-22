import { Epic, ofType } from "redux-observable";
import {
  MallActions,
  MallLoadCountriesAction,
  mallLoadCountriesFailed,
  mallLoadCountriesSuccess,
  MallLoadProvincesAction,
  mallLoadProvincesSuccess,
  mallLoadProvincesFailed,
  MallLoadAddressBookAction,
  mallLoadAddressBookSuccess,
  mallLoadAddressBookFailed,
  MallAddAddressAction,
  mallAddAddressSuccess,
  mallAddAddressFailed
} from "./mall.actions";
import { switchMap, catchError, map } from "rxjs/operators";
import { of, from, never, NEVER } from "rxjs";
import { IEffectDeps } from "../modes";
import { CoreState } from "..";
import { selectMallPrvsByCountryID } from "./mall.selectors";
import { selectAuthSet } from "../auth/auth.selectors";
import { authUnauthed } from "../auth";

export const loadCountriesEpic: Epic<any, any, any, IEffectDeps> = (
  action$,
  state$,
  { mallFetcher }
) =>
  action$.pipe(
    ofType<MallLoadCountriesAction>(MallActions.LoadCountries),
    switchMap(_action =>
      from(mallFetcher.getCountryList()).pipe(map(mallLoadCountriesSuccess))
    ),
    catchError(err => {
      console.error(err);
      return of(mallLoadCountriesFailed());
    })
  );

export const loadProvincesEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { mallFetcher }
) =>
  action$.pipe(
    ofType<MallLoadProvincesAction>(MallActions.LoadProvinces),
    switchMap(({ payload: countryID }) =>
      state$.pipe(
        switchMap(state => {
          let prvs = selectMallPrvsByCountryID(countryID)(state);
          if (prvs) {
            return NEVER;
          }
          return from(mallFetcher.getProvinceList(countryID)).pipe(
            map(provinces => ({ provinces, countryID })),
            map(mallLoadProvincesSuccess)
          );
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(mallLoadProvincesFailed());
    })
  );

export const loadAddressBookEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { backendFetcher }
) =>
  action$.pipe(
    ofType<MallLoadAddressBookAction>(MallActions.LoadAddressBook),
    switchMap(() =>
      state$.pipe(
        switchMap(state => {
          let authSet = selectAuthSet(state);
          if (!authSet) {
            return of(authUnauthed());
          }
          return from(
            backendFetcher.queryAddress(authSet.account, authSet.key)
          ).pipe(map(mallLoadAddressBookSuccess));
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(mallLoadAddressBookFailed());
    })
  );

export const addAddressEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { backendFetcher }
) =>
  action$.pipe(
    ofType<MallAddAddressAction>(MallActions.AddAddress),
    switchMap(action =>
      state$.pipe(
        switchMap(state => {
          let authSet = selectAuthSet(state);
          if (!authSet) {
            return of(authUnauthed());
          }
          return from(
            backendFetcher.addAddress(action.payload, authSet.key)
          ).pipe(map(mallAddAddressSuccess));
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(mallAddAddressFailed());
    })
  );
