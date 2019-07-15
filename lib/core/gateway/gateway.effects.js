import { ofType } from "redux-observable";
import { GatewayActions, gatewayLoadGatewayInfoSuccess, gatewayLoadGatewayInfoFailed, gatewayLoadDepositInfoSuccess, gatewayLoadDepositInfo, gatewaySelectAsset, gatewayVerifyAddressSuccess, gatewayVerifyAddressFailed, gatewayWithdrawSuccess, gatewayWithdrawFailed } from "./gateway.actions";
import { switchMap, catchError, map, filter, take, debounceTime } from "rxjs/operators";
import { of, from, NEVER } from "rxjs";
import { selectAuthSet, selectCurrentKeystore } from "../auth/auth.selectors";
import { authUnauthed, AuthActions } from "../auth";
import { selectGatewayCoinList, selectGatewayCurrentDepositInfo, selectGatewayAddressVerification } from "./gateway.selectors";
import { corePushNoti } from "../core.actions";
import { Dict } from "../../providers/i18n";
export var loadGatewayInfoEpic = function (action$, state$, _a) {
    var gatewayFetcher = _a.gatewayFetcher;
    return action$.pipe(ofType(AuthActions.Unlock, AuthActions.Login, GatewayActions.LoadGatewayInfo), switchMap(function () {
        return from(gatewayFetcher.getCoinList()).pipe(map(gatewayLoadGatewayInfoSuccess), catchError(function (err) {
            console.error(err);
            return of(gatewayLoadGatewayInfoFailed());
        }));
    }), catchError(function (err) {
        console.error(err);
        return of(gatewayLoadGatewayInfoFailed());
    }));
};
export var loadDpstAfterSelAssetEpic = function (action$, state$, _a) {
    var gatewayFetcher = _a.gatewayFetcher;
    return action$.pipe(ofType(GatewayActions.SelectAsset), switchMap(function (action) {
        return state$.pipe(filter(function (state) { return !!selectGatewayCoinList(state).length; }), take(1), switchMap(function (state) {
            var authSet = selectAuthSet(state);
            if (!authSet) {
                return of(authUnauthed());
            }
            var coinInfo = selectGatewayCoinList(state).find(function (coinInfo) { return coinInfo.asset === action.payload; });
            if (!coinInfo) {
                return NEVER;
            }
            var currentDepositInfo = selectGatewayCurrentDepositInfo(state);
            if (currentDepositInfo) {
                return NEVER;
            }
            return of(gatewayLoadDepositInfo(coinInfo.asset));
        }), catchError(function (err) {
            console.error(err);
            return of(gatewayLoadGatewayInfoFailed());
        }));
    }), catchError(function (err) {
        console.error(err);
        return of(gatewayLoadGatewayInfoFailed());
    }));
};
export var selFirstAssetEpic = function (action$, state$, _a) {
    var gatewayFetcher = _a.gatewayFetcher;
    return action$.pipe(ofType(GatewayActions.SelectFirstAsset), switchMap(function (action) {
        return state$.pipe(filter(function (state) { return !!selectGatewayCoinList(state).length; }), take(1), switchMap(function (state) {
            var authSet = selectAuthSet(state);
            if (!authSet) {
                return of(authUnauthed());
            }
            var coinInfo = selectGatewayCoinList(state)[0];
            return of(gatewaySelectAsset(coinInfo.asset));
        }), catchError(function (err) {
            console.error(err);
            return of(gatewayLoadGatewayInfoFailed());
        }));
    }), catchError(function (err) {
        console.error(err);
        return of(gatewayLoadGatewayInfoFailed());
    }));
};
export var loadDepsoitInfoEpic = function (action$, state$, _a) {
    var gatewayFetcher = _a.gatewayFetcher;
    return action$.pipe(ofType(GatewayActions.LoadDepositInfo), switchMap(function (action) {
        return state$.pipe(take(1), switchMap(function (state) {
            var authSet = selectAuthSet(state);
            if (!authSet) {
                return of(authUnauthed());
            }
            var coinInfo = selectGatewayCoinList(state).find(function (coinInfo) { return coinInfo.asset === action.payload; });
            if (!coinInfo) {
                return NEVER;
            }
            var currentDepositInfo = selectGatewayCurrentDepositInfo(state);
            if (currentDepositInfo) {
                return NEVER;
            }
            return from(gatewayFetcher.getDepositInto(authSet.account, coinInfo.currency, authSet.key)).pipe(map(gatewayLoadDepositInfoSuccess));
        }));
    }), catchError(function (err) {
        console.error(err);
        return of(gatewayLoadGatewayInfoFailed());
    }));
};
export var verifyAddressEpic = function (action$, state$, _a) {
    var gatewayFetcher = _a.gatewayFetcher;
    return action$.pipe(ofType(GatewayActions.VerifyAddress), debounceTime(300), switchMap(function (action) {
        return state$.pipe(take(1), switchMap(function (state) {
            var authSet = selectAuthSet(state);
            var _a = action.payload, coinType = _a.coinType, address = _a.address;
            if (!authSet) {
                return of(authUnauthed());
            }
            var result = selectGatewayAddressVerification(coinType, address)(state);
            if (result) {
                return NEVER;
            }
            return from(gatewayFetcher.verifyAddress(coinType, address)).pipe(map(function (_a) {
                var coinType = _a.coinType, address = _a.address, valid = _a.valid;
                return valid
                    ? gatewayVerifyAddressSuccess(coinType, address)
                    : gatewayVerifyAddressFailed(coinType, address);
            }), catchError(function (err) {
                console.error(err);
                return of(gatewayVerifyAddressFailed(coinType, address));
            }));
        }));
    }), catchError(function (err) {
        console.error(err);
        return of(gatewayVerifyAddressFailed("-1", "-1"));
    }));
};
export var withdrawEpic = function (action$, state$, _a) {
    var chainAssisant = _a.chainAssisant;
    return action$.pipe(ofType(GatewayActions.Withdraw), debounceTime(300), switchMap(function (action) {
        return state$.pipe(take(1), switchMap(function (state) {
            var authSet = selectAuthSet(state);
            var keyStore = selectCurrentKeystore(state);
            if (!authSet || !keyStore) {
                return of(authUnauthed());
            }
            return from(chainAssisant.transfer({
                from: authSet.account,
                to: action.payload.to,
                asset: action.payload.asset,
                value: action.payload.value,
                memo: "\"" + action.payload.memoPrefix + ":" + action.payload.coinType + ":" + action.payload.address
            }, keyStore)).pipe(map(gatewayWithdrawSuccess), catchError(function (err) {
                console.error(err);
                return of(gatewayWithdrawFailed());
            }));
        }));
    }), catchError(function (err) {
        console.error(err);
        return of(gatewayWithdrawFailed());
    }));
};
export var gatewayFailedEpic = function (action$, state$, _a) {
    var fetcher = _a.fetcher;
    return action$.pipe(ofType(GatewayActions.LoadGatewayInfoFailed, GatewayActions.LoadDepositInfoFailed), map(function (action) {
        return corePushNoti(Dict.NotiRegWrong_Gateway, {
            variant: "error"
        });
    }));
};
export var gatewayWithdrawFailedEpic = function (action$, state$, _a) {
    var fetcher = _a.fetcher;
    return action$.pipe(ofType(GatewayActions.WithdrawFailed), map(function (action) {
        return corePushNoti(Dict.NotiRegWrong_Gateway_Withdraw, {
            variant: "error"
        });
    }));
};
export var gatewayWithdrawSuccessEpic = function (action$, state$, _a) {
    var fetcher = _a.fetcher;
    return action$.pipe(ofType(GatewayActions.WithdrawSuccess), map(function (action) {
        return corePushNoti(Dict.Gateway_Withdraw_Done, {
            variant: "success"
        });
    }));
};
