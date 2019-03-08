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
import { map, switchMap, catchError, takeUntil, take, filter, debounceTime } from "rxjs/operators";
import { AuthActions, authLoginSuccess, authLoginFailed, authCloseModal, authUpdateBalance, authUpdateBalanceSuccess, authRegGetCaptchaSuccess, authRegGetCaptcha, authLogin, authRegImplFailed } from "./auth.actions";
import { of, from, interval, NEVER, merge } from "rxjs";
import assert from "assert";
import { authCheckFromSeed, getKeySet } from "../../utils/auth";
import { corePushNoti } from "../core.actions";
import { selectAuthSet, selectRegCaptcha, selectAuthModal } from "./auth.selectors";
import { calcValue } from "../../utils/calc";
import { selectLoginPanel, LoginPanel } from "./index";
import { selectGame } from "../core.selectors";
import { Dict } from "../../providers/i18n";
export var loginEpic = function (action$, state$, _a) {
    var fetcher = _a.fetcher;
    return action$.pipe(ofType(AuthActions.Login), debounceTime(500), switchMap(function (action) {
        return from(fetcher.fetchAccount(action.payload.accountName)).pipe(map(function (account) {
            assert(account, "没找到相应账户信息");
            var keyStore = authCheckFromSeed(action.payload, account);
            assert(keyStore, "登录验证失败");
            if (keyStore) {
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
    return action$.pipe(ofType(AuthActions.LoginSuccess), switchMap(function (action) {
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
    return action$.pipe(ofType(AuthActions.LoginFailed), map(function (_) { return corePushNoti(Dict.NotiLoginWrongPass, { variant: "error" }); }));
};
export var regPanelCaptchaEpic = function (action$, state$, _a) {
    var faucet = _a.faucet;
    return action$.pipe(ofType(AuthActions.LoginModalSwitchPanel, AuthActions.LoginModalShow), switchMap(function (_) {
        return state$.pipe(filter(function (state) {
            return selectLoginPanel(state) === LoginPanel.Register &&
                selectAuthModal(state);
        }), take(1), switchMap(function (_) {
            // merge(interval(3 * 1000), of(1)).pipe(
            return merge(interval(90 * 1000), of(1)).pipe(takeUntil(state$.pipe(filter(function (state) {
                return selectLoginPanel(state) === LoginPanel.Login ||
                    !selectAuthModal(state);
            }))), map(function (_) { return authRegGetCaptcha(); }));
        }));
    }));
};
export var captchaEpic = function (action$, state$, _a) {
    var faucet = _a.faucet;
    return action$.pipe(ofType(AuthActions.RegGetCaptcha, AuthActions.RegImplFailed), switchMap(function (_) {
        return from(faucet.getCaptcha()).pipe(map(function (captcha) { return authRegGetCaptchaSuccess(captcha); }), catchError(function (err) {
            console.error(err);
            return NEVER;
        }));
    }));
};
export var authRegEpic = function (action$, state$, _a) {
    var faucet = _a.faucet;
    return action$.pipe(ofType(AuthActions.RegImpl), debounceTime(500), switchMap(function (action) {
        return state$.pipe(take(1), switchMap(function (state) {
            var _a = action.payload, accountName = _a.accountName, password = _a.password, captcha = _a.captcha, referer = _a.referer;
            var currentCaptchaInfo = selectRegCaptcha(state);
            if (!currentCaptchaInfo || !accountName || !password || !captcha) {
                throw new Error("No Captcha");
            }
            var keySet = getKeySet(accountName, password);
            return from(faucet.postRegistInfo({
                cap: {
                    id: currentCaptchaInfo.id,
                    captcha: captcha
                },
                account: {
                    name: accountName,
                    active_key: keySet.owner,
                    owner_key: keySet.active,
                    memo_key: keySet.owner
                }
            })).pipe(
            // delay(3000),
            switchMap(function (regRes) {
                if (!accountName || !password) {
                    throw new Error("no account");
                }
                return of(authLogin({
                    accountName: accountName,
                    password: password,
                    refer: referer
                        ? {
                            referrer: referer,
                            action: selectGame(state),
                            isRegister: true
                        }
                        : undefined
                }));
            }), catchError(function (err) {
                console.error(err);
                return of(authRegImplFailed(err));
            }));
        }), catchError(function (err) {
            console.error(err);
            return of(authRegImplFailed(err));
        }));
    }));
};
export var regFailedEpic = function (action$, state$, _a) {
    var fetcher = _a.fetcher;
    return action$.pipe(ofType(AuthActions.RegImplFailed), map(function (action) {
        return corePushNoti(Dict["NotiRegWrong_" + action.payload.code] || Dict.NotiRegWrong, {
            variant: "error"
        });
    }));
};
export var loginCloseEpic = function (action$, state$, _a) {
    var fetcher = _a.fetcher;
    return action$.pipe(ofType(AuthActions.LoginSuccess), map(function (action) { return authCloseModal(); }));
};
