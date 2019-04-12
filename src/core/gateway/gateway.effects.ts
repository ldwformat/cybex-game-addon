import { Epic, ofType } from "redux-observable";
import {
  GatewayActions,
  GatewayLoadGatewayInfoAction,
  gatewayLoadGatewayInfoSuccess,
  gatewayLoadGatewayInfoFailed,
  GatewayLoadDepositInfoAction,
  gatewayLoadDepositInfoSuccess,
  gatewayLoadDepositInfoFailed,
  GatewayLoadDepositInfoSuccessAction,
  gatewayLoadDepositInfo,
  GatewaySelectAssetAction,
  GatewayLoadDepositInfoFailedAction,
  GatewayLoadGatewayInfoFailedAction,
  GatewaySelectFirstAssetAction,
  gatewaySelectAsset
} from "./gateway.actions";
import {
  switchMap,
  catchError,
  map,
  filter,
  takeLast,
  take
} from "rxjs/operators";
import { of, from, NEVER } from "rxjs";
import { IEffectDeps } from "../modes";
import { CoreState } from "..";
import { selectAuthSet, selectAuthStatus } from "../auth/auth.selectors";
import {
  authUnauthed,
  AuthLoginSuccessAction,
  AuthActions,
  AuthStatus,
  AuthLoginAction,
  AuthUnlockAction
} from "../auth";
import {
  selectGatewayCoinList,
  selectGatewayCurrentDepositInfo
} from "./gateway.selectors";
import { ActionCorePushNoti, corePushNoti } from "../core.actions";
import { Dict } from "../../providers/i18n";

export const loadGatewayInfoEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { gatewayFetcher }
) =>
  action$.pipe(
    ofType<AuthUnlockAction | AuthLoginAction | GatewayLoadGatewayInfoAction>(
      AuthActions.Unlock,
      AuthActions.Login,
      GatewayActions.LoadGatewayInfo
    ),
    switchMap(() =>
      from(gatewayFetcher.getCoinList()).pipe(
        map(gatewayLoadGatewayInfoSuccess),
        catchError(err => {
          console.error(err);
          return of(gatewayLoadGatewayInfoFailed());
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(gatewayLoadGatewayInfoFailed());
    })
  );
export const loadDpstAfterSelAssetEpic: Epic<
  any,
  any,
  CoreState,
  IEffectDeps
> = (action$, state$, { gatewayFetcher }) =>
  action$.pipe(
    ofType<GatewaySelectAssetAction>(GatewayActions.SelectAsset),
    switchMap(action =>
      state$.pipe(
        filter(state => !!selectGatewayCoinList(state).length),
        take(1),
        switchMap(state => {
          let authSet = selectAuthSet(state);
          if (!authSet) {
            return of(authUnauthed());
          }
          let coinInfo = selectGatewayCoinList(state).find(
            coinInfo => coinInfo.asset === action.payload
          );
          if (!coinInfo) {
            return NEVER;
          }
          let currentDepositInfo = selectGatewayCurrentDepositInfo(state);
          if (currentDepositInfo) {
            return NEVER;
          }
          return of(gatewayLoadDepositInfo(coinInfo.asset));
        }),
        catchError(err => {
          console.error(err);
          return of(gatewayLoadGatewayInfoFailed());
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(gatewayLoadGatewayInfoFailed());
    })
  );
export const selFirstAssetEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { gatewayFetcher }
) =>
  action$.pipe(
    ofType<GatewaySelectFirstAssetAction>(GatewayActions.SelectFirstAsset),
    switchMap(action =>
      state$.pipe(
        filter(state => !!selectGatewayCoinList(state).length),
        take(1),
        switchMap(state => {
          let authSet = selectAuthSet(state);
          if (!authSet) {
            return of(authUnauthed());
          }
          let coinInfo = selectGatewayCoinList(state)[0];
          return of(gatewaySelectAsset(coinInfo.asset));
        }),
        catchError(err => {
          console.error(err);
          return of(gatewayLoadGatewayInfoFailed());
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(gatewayLoadGatewayInfoFailed());
    })
  );

export const loadDepsoitInfoEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { gatewayFetcher }
) =>
  action$.pipe(
    ofType<GatewayLoadDepositInfoAction>(GatewayActions.LoadDepositInfo),
    switchMap(action =>
      state$.pipe(
        take(1),
        switchMap(state => {
          let authSet = selectAuthSet(state);
          if (!authSet) {
            return of(authUnauthed());
          }
          let coinInfo = selectGatewayCoinList(state).find(
            coinInfo => coinInfo.asset === action.payload
          );
          if (!coinInfo) {
            return NEVER;
          }
          let currentDepositInfo = selectGatewayCurrentDepositInfo(state);
          if (currentDepositInfo) {
            return NEVER;
          }
          return from(
            gatewayFetcher.getDepositInto(authSet.account, coinInfo.currency)
          ).pipe(
            map(res => {
              if (res !== null && res.getDepositAddress !== null) {
                return res.getDepositAddress;
              }
              throw new Error("No asset");
            }),
            map(gatewayLoadDepositInfoSuccess)
          );
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(gatewayLoadGatewayInfoFailed());
    })
  );

export const gatewayFailedEpic: Epic<
  any,
  ActionCorePushNoti,
  any,
  IEffectDeps
> = (action$, state$, { fetcher }) =>
  action$.pipe(
    ofType<
      GatewayLoadDepositInfoFailedAction | GatewayLoadGatewayInfoFailedAction
    >(
      GatewayActions.LoadGatewayInfoFailed,
      GatewayActions.LoadDepositInfoFailed
    ),
    map(action =>
      corePushNoti(Dict.NotiRegWrong_Gateway, {
        variant: "error"
      })
    )
  );
