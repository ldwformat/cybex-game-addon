import { Epic, ofType } from "redux-observable";
import {
  ReferActions,
  ReferLoadReferInfoAction,
  referLoadReferInfoSuccess,
  referLoadReferInfoFailed,
  ReferAddAction,
  referAddSuccess,
  referAddFailed,
  ReferAddSuccessAction,
  ReferAddFailedAction,
  referLoadRebateSuccess,
  ReferLoadRebateAction
} from "./refer.actions";
import {
  switchMap,
  catchError,
  map,
  filter,
  takeLast,
  take
} from "rxjs/operators";
import { of, from } from "rxjs";
import { IEffectDeps } from "../modes";
import { CoreState } from "..";
import { selectAuthSet } from "../auth/auth.selectors";
import {
  authUnauthed,
  AuthLoginSuccessAction,
  AuthActions,
  LoginReferParams
} from "../auth";
import { ActionCorePushNoti, corePushNoti } from "../core.actions";
import { Dict } from "../../providers/i18n";
import { selectGame } from "../core.selectors";
import { ReferSingleRebateWithValue } from "./refer.models";
import { calcValue } from "../../utils/calc";

export const loadReferInfoEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { referFetcher }
) =>
  action$.pipe(
    ofType<
      AuthLoginSuccessAction | ReferLoadReferInfoAction | ReferAddSuccessAction
    >(
      AuthActions.LoginSuccess,
      ReferActions.LoadReferInfo,
      ReferActions.AddSuccess
    ),
    switchMap(() =>
      state$.pipe(
        take(1),
        switchMap(state => {
          let authSet = selectAuthSet(state);
          if (!authSet) {
            return of(authUnauthed());
          }
          return from(referFetcher.getRefer(authSet.account)).pipe(
            map(referLoadReferInfoSuccess)
          );
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(referLoadReferInfoFailed());
    })
  );

export const loadReferRebateEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { referFetcher, fetcher }
) =>
  action$.pipe(
    ofType<
      AuthLoginSuccessAction | ReferLoadRebateAction | ReferAddSuccessAction
    >(
      AuthActions.LoginSuccess,
      ReferActions.LoadRebate,
      ReferActions.AddSuccess
    ),
    switchMap(() =>
      state$.pipe(
        take(1),
        switchMap(state => {
          let authSet = selectAuthSet(state);
          let game = selectGame(state);
          if (!authSet) {
            return of(authUnauthed());
          }
          return from(
            referFetcher.getRebateDetails(authSet.account, game).then(details =>
              Promise.all(
                details.map(detail =>
                  fetcher.fetchAsset(detail.asset_id).then(
                    asset =>
                      ({
                        ...detail,
                        should_transferValue: calcValue(
                          detail.should_transfer,
                          asset.precision
                        ),
                        transferredValue: calcValue(
                          detail.transferred,
                          asset.precision
                        ),
                        asset
                      } as ReferSingleRebateWithValue)
                  )
                )
              )
            )
          ).pipe(map(referLoadRebateSuccess));
        }),
        catchError(err => {
          console.error(err);
          return of(referLoadReferInfoFailed());
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(referLoadReferInfoFailed());
    })
  );

export const addReferEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { referFetcher }
) =>
  action$.pipe(
    ofType<ReferAddAction>(ReferActions.Add),
    switchMap(reduxAction =>
      state$.pipe(
        take(1),
        switchMap(state => {
          let authSet = selectAuthSet(state);
          if (!authSet) {
            return of(authUnauthed());
          }
          let { account, action, referrer, isRegister } = reduxAction.payload;
          return from(
            (!isRegister
              ? referFetcher.setRefer
              : referFetcher.setRegisterRefer)(
              account,
              referrer,
              action,
              authSet.key
            )
          ).pipe(
            map(referAddSuccess),
            catchError(err => {
              console.error(err);
              return of(referAddFailed(reduxAction.payload.withNoti));
            })
          );
        }),
        catchError(err => {
          console.error(err);
          return of(referAddFailed(reduxAction.payload.withNoti));
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(referAddFailed());
    })
  );

export const addRefFailedEpic: Epic<
  any,
  ActionCorePushNoti,
  any,
  IEffectDeps
> = (action$, state$, { fetcher }) =>
  action$.pipe(
    ofType<ReferAddFailedAction>(ReferActions.AddFailed),
    filter(action => !!action.payload.withNoti),
    map(action =>
      corePushNoti(Dict.NotiAddReferWrong, {
        variant: "error"
      })
    )
  );

export const addReferAfterLoginEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { referFetcher }
) =>
  action$.pipe(
    ofType<AuthLoginSuccessAction>(AuthActions.LoginSuccess),
    filter(action => !!action.payload.refer),
    switchMap(action =>
      from(referFetcher.getRefer(action.payload.accountName)).pipe(
        filter(referInfo =>
          referInfo.referrers.every(
            referrer =>
              !referrer.action.includes(
                (action.payload.refer as LoginReferParams).action
              )
          )
        ),
        map(_referral => action),
        take(1)
      )
    ),
    switchMap(reduxAction =>
      state$.pipe(
        take(1),
        switchMap(state => {
          let authSet = selectAuthSet(state);
          if (!authSet) {
            return of(authUnauthed());
          }
          let { accountName: account } = reduxAction.payload;
          let { action, isRegister, referrer } = reduxAction.payload
            .refer as LoginReferParams;

          return from(
            (!isRegister
              ? referFetcher.setRefer
              : referFetcher.setRegisterRefer)(
              account,
              referrer,
              action,
              authSet.key
            )
          ).pipe(map(referAddSuccess));
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(referAddFailed());
    })
  );
