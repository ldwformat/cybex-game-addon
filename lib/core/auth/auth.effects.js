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
import { tap, map, switchMap, catchError, takeUntil, take, filter, debounceTime, mergeMap } from "rxjs/operators";
import { AuthActions, authLoginSuccess, authLoginFailed, authCloseModal, authUpdateBalance, authUpdateBalanceSuccess, authRegGetCaptchaSuccess, authRegGetCaptcha, authLogin, authRegImplFailed, authDisplayWalletPassModal, authSetWalletPassFailed, authSetWalletPassSuccess, authDismissWalletPassModal, authUnlockSuccess, authUnlockFailed, authLock, authShowModal, authLogout } from "./auth.actions";
import { of, from, interval, NEVER, merge } from "rxjs";
import assert from "assert";
import { authCheckFromSeed, getKeySet } from "../../utils/auth";
import { corePushNoti, CoreActions } from "../core.actions";
import { selectRegCaptcha, selectAuthModal, selectAuthStatus, selectCurrentKeystore, selectKeyStoreCipher, selectCurrentAccount, selectUnlockCounter } from "./auth.selectors";
import { calcValue } from "../../utils/calc";
import { selectLoginPanel, LoginPanel } from "./index";
import { selectGame, selectLockupTime } from "../core.selectors";
import { Dict } from "../../providers/i18n";
import { AuthStatus } from "./auth.models";
import { AddonStorage } from "../../utils/storage";
import { encryptKeyStore, decryptKeyStore } from "../../utils/key-utils";
import { GatewayActions } from "../gateway";
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
        return state$.pipe(filter(function (state) { return selectAuthStatus(state) !== AuthStatus.NOT_LOGIN; }), take(1), map(selectCurrentAccount), switchMap(function (accountName) {
            return from(chainAssisant
                .db_api("get_named_account_balances", accountName, [])
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
export var displaySetPasswordAfterLoginEpic = function (action$, state$) {
    return action$.pipe(ofType(AuthActions.LoginSuccess), switchMap(function (_) {
        return state$.pipe(take(1), filter(function (state) { return !selectKeyStoreCipher(state); }), map(function (_) { return authDisplayWalletPassModal(); }));
    }));
};
export var dismissPasswordModalAfterSuccessEpic = function (action$) {
    return action$.pipe(ofType(AuthActions.WalletPassSetSuccess), map(function (_) { return authDismissWalletPassModal(); }));
};
export var setPasswordEpic = function (action$, state$, _a) {
    var storage = _a.storage;
    return action$.pipe(ofType(AuthActions.WalletPassSet), switchMap(function (action) {
        return state$.pipe(filter(function (state) { return selectAuthStatus(state) === AuthStatus.LOGIN_NORMAL; }), take(1), map(function (state) {
            var keyStore = selectCurrentKeystore(state);
            if (!keyStore) {
                throw new Error("403");
            }
            var cipher = encryptKeyStore(action.payload.password, keyStore);
            storage.setItem(AddonStorage.CommonKeys.KeyStore, cipher);
            storage.setItem(AddonStorage.CommonKeys.AccountName, (keyStore.account && keyStore.account.name) || "");
            storage.setItem(AddonStorage.CommonKeys.UnlockCount, action.payload.count);
            return authSetWalletPassSuccess(cipher, action.payload.count);
        }), catchError(function (err) {
            console.error(err);
            return of(authSetWalletPassFailed());
        }));
    }));
};
export var logoutClearCipherEpic = function (action$, state$, _a) {
    var storage = _a.storage;
    return action$.pipe(ofType(AuthActions.Logout), tap(function (action) { return storage.cleanStorage(); }), map(function () { return corePushNoti(Dict.AuthLogout); }));
};
export var unauthDisplayLoginEpic = function (action$, state$, _a) {
    var storage = _a.storage;
    return action$.pipe(ofType(AuthActions.Unauthed), map(authShowModal));
};
export var unlockEpic = function (action$, state$, _a) {
    var storage = _a.storage;
    return action$.pipe(ofType(AuthActions.Unlock), switchMap(function (action) {
        return state$.pipe(
        // filter(state => !!selectKeyStoreCipher(state)),
        take(1), map(function (state) {
            var cipher = selectKeyStoreCipher(state);
            if (!cipher) {
                throw new Error("403");
            }
            var keyStore = decryptKeyStore(action.payload, cipher);
            return authUnlockSuccess(keyStore);
        }), catchError(function (err) { return of(authUnlockFailed()); }));
    }));
};
export var lockTimerEpic = function (action$, state$, _a) {
    var storage = _a.storage;
    return action$.pipe(ofType(AuthActions.LoginSuccess, AuthActions.WalletPassSetSuccess), switchMap(function (action) {
        return state$.pipe(take(1), mergeMap(function (state) {
            return merge(of(1), action$.pipe(ofType(CoreActions.RefreshLockup, GatewayActions.LoadDepositInfo, GatewayActions.LoadGatewayInfo, GatewayActions.SelectAsset))).pipe(debounceTime(selectLockupTime(state)), switchMap(function (_) {
                return state$.pipe(take(1), filter(function (state) { return !!selectKeyStoreCipher(state); }));
            }), takeUntil(action$.pipe(ofType(AuthActions.Logout, AuthActions.Lock))), map(authLock));
        }));
    }));
};
export var unlockSuccessEpic = function (action$, state$, _a) {
    var storage = _a.storage;
    return action$.pipe(ofType(AuthActions.UnlockSuccess), map(function (action) {
        var keyStore = action.payload;
        var account = keyStore.account;
        if (!account || !account.name) {
            throw new Error("403");
        }
        return authLoginSuccess({
            account: account,
            accountName: account.name,
            keyStore: keyStore
        });
    }), catchError(function (err) {
        console.error(err);
        return of(authUnlockFailed());
    }));
};
export var unlockSuccessNotiEpic = function (action$, state$, _a) {
    var storage = _a.storage;
    return action$.pipe(ofType(AuthActions.UnlockSuccess), map(function (action) { return corePushNoti(Dict.UnlockSuccess, { variant: "success" }); }), catchError(function (err) {
        console.error(err);
        return of(authUnlockFailed());
    }));
};
export var unlockFailedEpic = function (action$, state$, _a) {
    var storage = _a.storage;
    return action$.pipe(ofType(AuthActions.UnlockFailed), switchMap(function (action) {
        return state$.pipe(take(1), map(function (state) { return selectUnlockCounter(state); }), map(function (count) {
            var newCount = count - 1;
            if (newCount > 0) {
                console.debug("NewCount: ", newCount);
                storage.setItem(AddonStorage.CommonKeys.UnlockCount, newCount);
                return corePushNoti(Dict.UnlockFaileWithCounter, {
                    variant: "error",
                    transparams: { count: newCount }
                });
            }
            return authLogout();
        }));
    }));
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
