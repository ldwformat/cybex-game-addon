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
  gatewaySelectAsset,
  GatewayVerifyAddressAction,
  gatewayVerifyAddressSuccess,
  gatewayVerifyAddressFailed,
  GatewayWithdrawAction,
  gatewayWithdrawSuccess,
  gatewayWithdrawFailed,
  GatewayWithdrawFailedAction,
  GatewayWithdrawSuccessAction
} from "./gateway.actions";
import {
  switchMap,
  catchError,
  map,
  filter,
  takeLast,
  take,
  debounceTime
} from "rxjs/operators";
import { of, from, NEVER } from "rxjs";
import { IEffectDeps } from "../modes";
import { CoreState } from "..";
import {
  selectAuthSet,
  selectAuthStatus,
  selectCurrentKeystore
} from "../auth/auth.selectors";
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
  selectGatewayCurrentDepositInfo,
  selectGatewayAddressVerification
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
            gatewayFetcher.getDepositInto(
              authSet.account,
              coinInfo.currency,
              authSet.key
            )
          ).pipe(map(gatewayLoadDepositInfoSuccess));
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(gatewayLoadGatewayInfoFailed());
    })
  );
export const verifyAddressEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { gatewayFetcher }
) =>
  action$.pipe(
    ofType<GatewayVerifyAddressAction>(GatewayActions.VerifyAddress),
    debounceTime(300),
    switchMap(action =>
      state$.pipe(
        take(1),
        switchMap(state => {
          let authSet = selectAuthSet(state);
          let { coinType, address } = action.payload;
          if (!authSet) {
            return of(authUnauthed());
          }
          let result = selectGatewayAddressVerification(coinType, address)(
            state
          );
          if (result) {
            return NEVER;
          }
          return from(gatewayFetcher.verifyAddress(coinType, address)).pipe(
            map(({ coinType, address, valid }) =>
              valid
                ? gatewayVerifyAddressSuccess(coinType, address)
                : gatewayVerifyAddressFailed(coinType, address)
            ),
            catchError(err => {
              console.error(err);
              return of(gatewayVerifyAddressFailed(coinType, address));
            })
          );
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(gatewayVerifyAddressFailed("-1", "-1"));
    })
  );
export const withdrawEpic: Epic<any, any, CoreState, IEffectDeps> = (
  action$,
  state$,
  { chainAssisant }
) =>
  action$.pipe(
    ofType<GatewayWithdrawAction>(GatewayActions.Withdraw),
    debounceTime(300),
    switchMap(action =>
      state$.pipe(
        take(1),
        switchMap(state => {
          let authSet = selectAuthSet(state);
          let keyStore = selectCurrentKeystore(state);
          if (!authSet || !keyStore) {
            return of(authUnauthed());
          }
          return from(
            chainAssisant.transfer(
              {
                from: authSet.account,
                to: action.payload.to,
                asset: action.payload.asset,
                value: action.payload.value,
                memo: `${action.payload.memoPrefix}:${
                  action.payload.coinType
                }:${action.payload.address}`,
                fee: action.payload.fee
              },
              keyStore
            )
          ).pipe(
            map(gatewayWithdrawSuccess),
            catchError(err => {
              console.error(err);
              return of(gatewayWithdrawFailed());
            })
          );
        })
      )
    ),
    catchError(err => {
      console.error(err);
      return of(gatewayWithdrawFailed());
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
export const gatewayWithdrawFailedEpic: Epic<
  any,
  ActionCorePushNoti,
  any,
  IEffectDeps
> = (action$, state$, { fetcher }) =>
  action$.pipe(
    ofType<GatewayWithdrawFailedAction>(GatewayActions.WithdrawFailed),
    map(action =>
      corePushNoti(Dict.NotiRegWrong_Gateway_Withdraw, {
        variant: "error"
      })
    )
  );
export const gatewayWithdrawSuccessEpic: Epic<
  any,
  ActionCorePushNoti,
  any,
  IEffectDeps
> = (action$, state$, { fetcher }) =>
  action$.pipe(
    ofType<GatewayWithdrawSuccessAction>(GatewayActions.WithdrawSuccess),
    map(action =>
      corePushNoti(Dict.Gateway_Withdraw_Done, {
        variant: "success"
      })
    )
  );
