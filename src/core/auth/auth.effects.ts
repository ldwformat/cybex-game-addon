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
  delay,
  mergeMap
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
  AuthLoginModalShowAction,
  AuthWalletPassModalDisplay,
  authDisplayWalletPassModal,
  AuthWalletPassSet,
  authSetWalletPassFailed,
  authSetWalletPassSuccess,
  AuthWalletPassSetSuccess,
  authDismissWalletPassModal,
  AuthUnlockSuccessAction,
  AuthUnlockFailedAction,
  AuthUnlockAction,
  authUnlockSuccess,
  authUnlockFailed,
  AuthLockAction,
  authUnlock,
  authLock,
  authShowModal,
  AuthUnauthedAction,
  authLogout
} from "./auth.actions";
import { of, from, interval, NEVER, merge } from "rxjs";
import assert from "assert";
import { authCheckFromSeed, getKeyStore, getKeySet } from "../../utils/auth";
import { IEffectDeps } from "../modes";
import { ActionCorePushNoti, corePushNoti } from "../core.actions";
import {
  selectAuthSet,
  selectRegCaptcha,
  selectAuthModal,
  selectAuthStatus,
  selectCurrentKeystore,
  selectKeyStoreCipher,
  selectCurrentAccount,
  selectUnlockCounter
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
import { selectGame, selectLockupTime } from "../core.selectors";
import { Dict } from "../../providers/i18n";
import { AuthStatus } from "./auth.models";
import { AddonStorage } from "../../utils/storage";
import { encryptKeyStore, decryptKeyStore } from "../../utils/key-utils";
import { GatewayActions } from "../gateway";

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
        filter(state => selectAuthStatus(state) !== AuthStatus.NOT_LOGIN),
        take(1),
        map(selectCurrentAccount),
        switchMap(accountName =>
          from(
            chainAssisant
              .db_api<Cybex.AccountBalance[]>(
                "get_named_account_balances",
                accountName,
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
    map(_ => corePushNoti(Dict.NotiLoginWrongPass, { variant: "error" }))
  );

export const displaySetPasswordAfterLoginEpic: Epic<
  AuthLoginSuccessAction,
  any,
  any,
  IEffectDeps
> = (action$, state$) =>
  action$.pipe(
    ofType<AuthLoginSuccessAction>(AuthActions.LoginSuccess),
    switchMap(_ =>
      state$.pipe(
        take(1),
        filter(state => !selectKeyStoreCipher(state)),
        map(_ => authDisplayWalletPassModal())
      )
    )
  );
export const dismissPasswordModalAfterSuccessEpic: Epic<
  AuthWalletPassSetSuccess,
  any,
  any,
  IEffectDeps
> = action$ =>
  action$.pipe(
    ofType<AuthWalletPassSetSuccess>(AuthActions.WalletPassSetSuccess),
    map(_ => authDismissWalletPassModal())
  );

export const setPasswordEpic: Epic<AuthWalletPassSet, any, any, IEffectDeps> = (
  action$,
  state$,
  { storage }
) =>
  action$.pipe(
    ofType<AuthWalletPassSet>(AuthActions.WalletPassSet),
    switchMap(action =>
      state$.pipe(
        filter(state => selectAuthStatus(state) === AuthStatus.LOGIN_NORMAL),
        take(1),
        map(state => {
          let keyStore = selectCurrentKeystore(state);
          if (!keyStore) {
            throw new Error("403");
          }
          let cipher = encryptKeyStore(action.payload.password, keyStore);
          storage.setItem(AddonStorage.CommonKeys.KeyStore, cipher);
          storage.setItem(
            AddonStorage.CommonKeys.UnlockCount,
            action.payload.count
          );

          return authSetWalletPassSuccess(cipher, action.payload.count);
        }),
        catchError(err => {
          console.error(err);
          return of(authSetWalletPassFailed());
        })
      )
    )
  );

export const logoutClearCipherEpic: Epic<any, any, any, IEffectDeps> = (
  action$,
  state$,
  { storage }
) =>
  action$.pipe(
    ofType<AuthLogoutAction>(AuthActions.Logout),
    tap(action => storage.cleanStorage()),
    map(() => corePushNoti(Dict.AuthLogout))
  );
export const unauthDisplayLoginEpic: Epic<
  any,
  AuthLoginModalShowAction,
  any,
  IEffectDeps
> = (action$, state$, { storage }) =>
  action$.pipe(
    ofType<AuthUnauthedAction>(AuthActions.Unauthed),
    map(authShowModal)
  );

export const unlockEpic: Epic<
  any,
  AuthUnlockSuccessAction | AuthUnlockFailedAction,
  any,
  IEffectDeps
> = (action$, state$, { storage }) =>
  action$.pipe(
    ofType<AuthUnlockAction>(AuthActions.Unlock),
    switchMap(action =>
      state$.pipe(
        // filter(state => !!selectKeyStoreCipher(state)),
        take(1),
        map(state => {
          let cipher = selectKeyStoreCipher(state);
          if (!cipher) {
            throw new Error("403");
          }
          let keyStore = decryptKeyStore(action.payload, cipher);
          return authUnlockSuccess(keyStore);
        }),
        catchError(err => of(authUnlockFailed()))
      )
    )
  );

export const lockTimerEpic: Epic<any, any, any, IEffectDeps> = (
  action$,
  state$,
  { storage }
) =>
  action$.pipe(
    ofType<any>(AuthActions.LoginSuccess, AuthActions.WalletPassSetSuccess),
    switchMap(action =>
      state$.pipe(
        take(1),
        mergeMap(state =>
          merge(
            of(1),
            action$.pipe(
              ofType<any>(
                GatewayActions.LoadDepositInfo,
                GatewayActions.LoadGatewayInfo,
                GatewayActions.SelectAsset
              )
            )
          ).pipe(
            debounceTime(selectLockupTime(state)),
            // debounceTime(5 * 60 * 1000),
            switchMap(_ =>
              state$.pipe(
                take(1),
                filter(state => !!selectKeyStoreCipher(state))
              )
            ),
            takeUntil(
              action$.pipe(ofType(AuthActions.Logout, AuthActions.Lock))
            ),
            map(authLock)
          )
        )
      )
    )
  );
export const unlockSuccessEpic: Epic<
  any,
  AuthLoginSuccessAction | AuthUnlockFailedAction,
  any,
  IEffectDeps
> = (action$, state$, { storage }) =>
  action$.pipe(
    ofType<AuthUnlockSuccessAction>(AuthActions.UnlockSuccess),
    map(action => {
      let keyStore = action.payload;
      let { account } = keyStore;
      if (!account || !account.name) {
        throw new Error("403");
      }
      return authLoginSuccess({
        account,
        accountName: account.name,
        keyStore
      });
    }),
    catchError(err => {
      console.error(err);
      return of(authUnlockFailed());
    })
  );
export const unlockFailedEpic: Epic<
  any,
  ActionCorePushNoti | AuthLogoutAction,
  any,
  IEffectDeps
> = (action$, state$, { storage }) =>
  action$.pipe(
    ofType<AuthUnlockFailedAction>(AuthActions.UnlockFailed),
    switchMap(action =>
      state$.pipe(
        take(1),
        map(state => selectUnlockCounter(state)),
        map(count => {
          let newCount = count - 1;
          if (newCount > 0) {
            console.debug("NewCount: ", newCount);
            storage.setItem(AddonStorage.CommonKeys.UnlockCount, newCount);
            return corePushNoti(Dict.UnlockFaileWithCounter, {
              variant: "error",
              transparams: { count: newCount }
            });
          }
          return authLogout();
        })
      )
    )
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
      corePushNoti(
        Dict[`NotiRegWrong_${action.payload.code}`] || Dict.NotiRegWrong,
        {
          variant: "error"
        }
      )
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
