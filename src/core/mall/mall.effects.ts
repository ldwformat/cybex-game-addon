import { Epic, ofType } from "redux-observable";
import {
  MallActions,
  MallLoadCountriesAction,
  mallLoadCountriesFailed,
  mallLoadCountriesSuccess,
  MallLoadProvincesAction,
  mallLoadProvincesSuccess,
  mallLoadProvincesFailed
} from "./mall.actions";
import { switchMap, catchError, map } from "rxjs/operators";
import { of, from, never, NEVER } from "rxjs";
import { IEffectDeps } from "../modes";
import { CoreState } from "..";
import { selectMallPrvsByCountryID } from "./mall.selectors";

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
