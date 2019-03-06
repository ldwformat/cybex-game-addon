import { Epic, ofType } from "redux-observable";
import {
  tap,
  map,
  switchMap,
  catchError,
  takeUntil,
  take,
  filter,
  debounceTime,
  delay
} from "rxjs/operators";
import {
  AuthActions,
  AuthLoginAction,
  authLoginSuccess,
  authLoginFailed,
  AuthLoginSuccessAction,
  AuthLoginFailedAction,
  authCloseModal,
  AuthUpdateBalanceSuccessAction,
  AuthUpdateBalanceAction,
  AuthLogoutAction,
  authUpdateBalance,
  authUpdateBalanceSuccess,
  authRegGetCaptchaSuccess,
  authRegGetCaptcha,
  AuthRegImpl,
  authLogin,
  AuthRegImplFailed,
  authRegImplFailed,
  AuthLoginModalShowAction
} from "./auth.actions";
import { of, from, interval, NEVER, merge } from "rxjs";
import assert from "assert";
import { authCheckFromSeed, getKeyStore, getKeySet } from "../../utils/auth";
import { IEffectDeps } from "../modes";
import { ActionCorePushNoti, corePushNoti } from "../core.actions";
import {
  selectAuthSet,
  selectRegCaptcha,
  selectAuthModal
} from "./auth.selectors";
import { calcValue } from "../../utils/calc";
import {
  AuthRegGetCaptcha,
  AuthRegGetCaptchaSuccess,
  AuthLoginModalSwitchPanel,
  selectLoginPanel,
  LoginPanel
} from "./index";
import { referAdd } from "../refer";
import { selectGame } from "../core.selectors";

export const loginEpic: Epic<
  any,
  AuthLoginSuccessAction | AuthLoginFailedAction,
  any,
  IEffectDeps
> = (action$, state$, { fetcher }) =>
  action$.pipe(
    ofType<AuthLoginAction>(AuthActions.Login),
    debounceTime(500),
    switchMap(action => {
      return from(fetcher.fetchAccount(action.payload.accountName)).pipe(
        map(account => {
          assert(account, "没找到相应账户信息");
          let keyStore = authCheckFromSeed(action.payload, account);
          assert(keyStore, "登录验证失败");
          if (keyStore) {
            return authLoginSuccess({
              accountName: action.payload.accountName,
              account,
              keyStore,
              refer: action.payload.refer
            });
          }
          return authLoginFailed();
        }),
        catchError(err => {
          console.error("[Login Effect] Login Failed", err.message);
          return of(authLoginFailed());
        })
      );
    })
  );

export const authUpdateBalanceEpic: Epic<
  AuthLoginSuccessAction | AuthLogoutAction | AuthUpdateBalanceAction,
  AuthUpdateBalanceAction,
  any,
  IEffectDeps
> = (action$, state$, { chainAssisant }) =>
  action$.pipe(
    ofType(AuthActions.LoginSuccess),
    switchMap(action =>
      interval(3000).pipe(
        takeUntil(action$.pipe(ofType(AuthActions.Logout))),
        map(interval => authUpdateBalance())
      )
    )
  );

export const updateBalanceEpic: Epic<
  AuthUpdateBalanceSuccessAction | AuthUpdateBalanceAction,
  AuthUpdateBalanceSuccessAction,
  any,
  IEffectDeps
> = (action$, state$, { chainAssisant, fetcher }) =>
  action$.pipe(
    ofType(AuthActions.UpdateBalance),
    switchMap(action =>
      state$.pipe(
        filter(state => !!selectAuthSet(state)),
        take(1),
        map(selectAuthSet),
        switchMap(state =>
          from(
            chainAssisant
              .db_api<Cybex.AccountBalance[]>(
                "get_named_account_balances",
                state && state.account,
                []
              )
              .catch(err => {
                console.error(err);
                return [] as Cybex.AccountBalance[];
              })
              .then(bals =>
                Promise.all(
                  bals.map(bal =>
                    fetcher.fetchAsset(bal.asset_id).then(asset => ({
                      asset_id: bal.asset_id,
                      asset: asset.symbol,
                      value: calcValue(bal.amount, asset.precision)
                    }))
                  )
                )
              )
          ).pipe(
            map(bals =>
              authUpdateBalanceSuccess(
                bals.reduce(
                  (balObj, bal) => ({ ...balObj, [bal.asset]: bal }),
                  {}
                )
              )
            )
          )
        )
      )
    )
  );

export const loginFailedEpic: Epic<
  any,
  ActionCorePushNoti,
  any,
  IEffectDeps
> = (action$, state$, { fetcher }) =>
  action$.pipe(
    ofType<AuthLoginFailedAction>(AuthActions.LoginFailed),
    map(_ => corePushNoti("请检查用户名密码是否正确", { variant: "error" }))
  );

export const regPanelCaptchaEpic: Epic<
  AuthLoginModalSwitchPanel | AuthLoginModalShowAction,
  any,
  any,
  IEffectDeps
> = (action$, state$, { faucet }) =>
  action$.pipe(
    ofType(AuthActions.LoginModalSwitchPanel, AuthActions.LoginModalShow),
    switchMap(_ =>
      state$.pipe(
        filter(
          state =>
            selectLoginPanel(state) === LoginPanel.Register &&
            selectAuthModal(state)
        ),
        take(1),
        switchMap(_ =>
          // merge(interval(3 * 1000), of(1)).pipe(
          merge(interval(90 * 1000), of(1)).pipe(
            takeUntil(
              state$.pipe(
                filter(
                  state =>
                    selectLoginPanel(state) === LoginPanel.Login ||
                    !selectAuthModal(state)
                )
              )
            ),
            map(_ => authRegGetCaptcha())
          )
        )
      )
    )
  );
export const captchaEpic: Epic<
  AuthRegGetCaptcha | AuthRegImplFailed,
  any,
  any,
  IEffectDeps
> = (action$, state$, { faucet }) =>
  action$.pipe(
    ofType(AuthActions.RegGetCaptcha, AuthActions.RegImplFailed),
    switchMap(_ =>
      from(faucet.getCaptcha()).pipe(
        map(captcha => authRegGetCaptchaSuccess(captcha)),
        catchError(err => {
          console.error(err);
          return NEVER;
        })
      )
    )
  );
export const authRegEpic: Epic<AuthRegImpl, any, any, IEffectDeps> = (
  action$,
  state$,
  { faucet }
) =>
  action$.pipe(
    ofType<AuthRegImpl>(AuthActions.RegImpl),
    debounceTime(500),
    switchMap(action =>
      state$.pipe(
        take(1),
        switchMap(state => {
          let { accountName, password, captcha, referer } = action.payload;
          let currentCaptchaInfo = selectRegCaptcha(state);
          if (!currentCaptchaInfo || !accountName || !password || !captcha) {
            throw new Error("No Captcha");
          }
          let keySet = getKeySet(accountName, password);
          return from(
            faucet.postRegistInfo({
              cap: {
                id: currentCaptchaInfo.id,
                captcha
              },
              account: {
                name: accountName,
                active_key: keySet.owner,
                owner_key: keySet.active,
                memo_key: keySet.owner
              }
            })
          ).pipe(
            // delay(3000),
            switchMap(regRes => {
              if (!accountName || !password) {
                throw new Error("no account");
              }
              return of(
                authLogin({
                  accountName,
                  password,
                  refer: referer
                    ? {
                        referrer: referer,
                        action: selectGame(state),
                        isRegister: true
                      }
                    : undefined
                })
              );
            }),
            catchError(err => {
              console.error(err);
              return of(authRegImplFailed(err));
            })
          );
        }),
        catchError(err => {
          console.error(err);
          return of(authRegImplFailed(err));
        })
      )
    )
  );
export const regFailedEpic: Epic<any, ActionCorePushNoti, any, IEffectDeps> = (
  action$,
  state$,
  { fetcher }
) =>
  action$.pipe(
    ofType<AuthRegImplFailed>(AuthActions.RegImplFailed),
    map(action =>
      corePushNoti(`注册失败，错误码: ${action.payload.code}`, {
        variant: "error"
      })
    )
  );

export const loginCloseEpic: Epic<any, any, any, IEffectDeps> = (
  action$,
  state$,
  { fetcher }
) =>
  action$.pipe(
    ofType<AuthLoginSuccessAction>(AuthActions.LoginSuccess),
    map(action => authCloseModal())
  );
