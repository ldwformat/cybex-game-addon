import { Epic, ofType } from "redux-observable";
import { tap, map, switchMap, catchError } from "rxjs/operators";
import {
  AuthActions,
  AuthLoginAction,
  authLoginSuccess,
  authLoginFailed,
  AuthLoginSuccessAction,
  AuthLoginFailedAction,
  authCloseModal
} from "./auth.actions";
import { Observable, of, from } from "rxjs";
import { KeyStore } from "./keystore/keystore";
import { CoreState } from "../core.models";
import { ChainFetcher } from "../../utils/fetcher";
import assert from "assert";
import { authCheckFromSeed } from "../../utils/auth";
import { IEffectDeps } from "../modes";

export const loginEpic: Epic<
  any,
  AuthLoginSuccessAction | AuthLoginFailedAction,
  any,
  IEffectDeps
> = (action$, state$, { fetcher }) =>
  action$.pipe(
    ofType<AuthLoginAction>(AuthActions.Login),
    switchMap(action => {
      return from(fetcher.fetchAccount(action.payload.accountName)).pipe(
        map(account => {
          console.debug("Login Action: ", account);
          assert(account, "没找到相应账户信息");
          let keyStore = authCheckFromSeed(action.payload, account);
          assert(keyStore, "登录验证失败");
          if (keyStore) {
            console.debug("LoginSuccess: ", action.payload.refer);
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

export const loginCloseEpic: Epic<any, any, any, IEffectDeps> = (
  action$,
  state$,
  { fetcher }
) =>
  action$.pipe(
    ofType<AuthLoginSuccessAction>(AuthActions.LoginSuccess),
    map(action => authCloseModal())
  );
