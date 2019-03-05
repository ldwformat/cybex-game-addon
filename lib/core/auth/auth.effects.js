var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { ofType } from "redux-observable";
import { tap, map, switchMap, catchError, takeUntil, take, filter, debounceTime } from "rxjs/operators";
import { AuthActions, authLoginSuccess, authLoginFailed, authCloseModal, authUpdateBalance, authUpdateBalanceSuccess, authRegGetCaptchaSuccess, authRegGetCaptcha } from "./auth.actions";
import { of, from, interval, NEVER, merge } from "rxjs";
import assert from "assert";
import { authCheckFromSeed } from "../../utils/auth";
import { corePushNoti } from "../core.actions";
import { selectAuthSet } from "./auth.selectors";
import { calcValue } from "../../utils/calc";
import { selectLoginPanel, LoginPanel } from "./index";
export var loginEpic = function (action$, state$, _a) {
    var fetcher = _a.fetcher;
    return action$.pipe(ofType(AuthActions.Login), debounceTime(500), switchMap(function (action) {
        return from(fetcher.fetchAccount(action.payload.accountName)).pipe(map(function (account) {
            console.debug("Login Action: ", account);
            assert(account, "没找到相应账户信息");
            var keyStore = authCheckFromSeed(action.payload, account);
            assert(keyStore, "登录验证失败");
            if (keyStore) {
                console.debug("LoginSuccess: ", action.payload.refer);
                return authLoginSuccess({
                    accountName: action.payload.accountName,
                    account: account,
                    keyStore: keyStore,
                    refer: action.payload.refer
                });
            }
            return authLoginFailed();
        }), catchError(function (err) {
            console.error("[Login Effect] Login Failed", err.message);
            return of(authLoginFailed());
        }));
    }));
};
export var authUpdateBalanceEpic = function (action$, state$, _a) {
    var chainAssisant = _a.chainAssisant;
    return action$.pipe(ofType(AuthActions.LoginSuccess), tap(function (action) { return console.debug("SUCCESS!!!!!!!!", action); }), switchMap(function (action) {
        return interval(3000).pipe(takeUntil(action$.pipe(ofType(AuthActions.Logout))), map(function (interval) { return authUpdateBalance(); }));
    }));
};
export var updateBalanceEpic = function (action$, state$, _a) {
    var chainAssisant = _a.chainAssisant, fetcher = _a.fetcher;
    return action$.pipe(ofType(AuthActions.UpdateBalance), switchMap(function (action) {
        return state$.pipe(filter(function (state) { return !!selectAuthSet(state); }), take(1), map(selectAuthSet), switchMap(function (state) {
            return from(chainAssisant
                .db_api("get_named_account_balances", state && state.account, [])
                .catch(function (err) {
                console.error(err);
                return [];
            })
                .then(function (bals) {
                return Promise.all(bals.map(function (bal) {
                    return fetcher.fetchAsset(bal.asset_id).then(function (asset) { return ({
                        asset_id: bal.asset_id,
                        asset: asset.symbol,
                        value: calcValue(bal.amount, asset.precision)
                    }); });
                }));
            })).pipe(map(function (bals) {
                return authUpdateBalanceSuccess(bals.reduce(function (balObj, bal) {
                    var _a;
                    return (__assign({}, balObj, (_a = {}, _a[bal.asset] = bal, _a)));
                }, {}));
            }));
        }));
    }));
};
export var loginFailedEpic = function (action$, state$, _a) {
    var fetcher = _a.fetcher;
    return action$.pipe(ofType(AuthActions.LoginFailed), map(function (_) { return corePushNoti("请检查用户名密码是否正确", { variant: "error" }); }));
};
export var regPanelCaptchaEpic = function (action$, state$, _a) {
    var faucet = _a.faucet;
    return action$.pipe(ofType(AuthActions.LoginModalSwitchPanel), switchMap(function (_) {
        return state$.pipe(filter(function (state) { return selectLoginPanel(state) === LoginPanel.Register; }), take(1), switchMap(function (_) {
            return merge(interval(90 * 1000), of(1)).pipe(takeUntil(state$.pipe(filter(function (state) { return selectLoginPanel(state) === LoginPanel.Login; }))), map(function (_) { return authRegGetCaptcha(); }));
        }));
    }));
};
export var captchaEpic = function (action$, state$, _a) {
    var faucet = _a.faucet;
    return action$.pipe(ofType(AuthActions.RegGetCaptcha), switchMap(function (_) {
        return from(faucet.getCaptcha()).pipe(map(function (captcha) { return authRegGetCaptchaSuccess(captcha); }), catchError(function (err) {
            console.error(err);
            return NEVER;
        }));
    }));
};
export var loginCloseEpic = function (action$, state$, _a) {
    var fetcher = _a.fetcher;
    return action$.pipe(ofType(AuthActions.LoginSuccess), map(function (action) { return authCloseModal(); }));
};
