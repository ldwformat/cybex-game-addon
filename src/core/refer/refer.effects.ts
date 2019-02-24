import { Epic, ofType } from "redux-observable";
import {
  ReferActions,
  ReferLoadReferInfoAction,
  referLoadReferInfoSuccess,
  referLoadReferInfoFailed,
  ReferAddAction,
  referAddSuccess,
  referAddFailed,
  ReferAddSuccessAction
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
          ).pipe(map(referAddSuccess));
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(referAddFailed());
    })
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
