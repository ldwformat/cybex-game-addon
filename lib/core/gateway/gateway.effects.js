import { ofType } from "redux-observable";
import { GatewayActions, gatewayLoadGatewayInfoSuccess, gatewayLoadGatewayInfoFailed, gatewayLoadDepositInfoSuccess, gatewayLoadDepositInfo } from "./gateway.actions";
import { switchMap, catchError, map, filter, take } from "rxjs/operators";
import { of, from, NEVER } from "rxjs";
import { selectAuthSet } from "../auth/auth.selectors";
import { authUnauthed, AuthActions } from "../auth";
import { selectGatewayCoinList, selectGatewayCurrentDepositInfo } from "./gateway.selectors";
export var loadGatewayInfoEpic = function (action$, state$, _a) {
    var gatewayFetcher = _a.gatewayFetcher;
    return action$.pipe(ofType(AuthActions.LoginSuccess, GatewayActions.LoadGatewayInfo), switchMap(function () {
        return state$.pipe(filter(function (state) { return !!selectAuthSet(state); }), take(1), switchMap(function (state) {
            var authSet = selectAuthSet(state);
            if (!authSet) {
                return of(authUnauthed());
            }
            return from(gatewayFetcher.getCoinList()).pipe(map(gatewayLoadGatewayInfoSuccess));
        }), catchError(function (err) {
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
            return from(gatewayFetcher.getDepositInto(authSet.account, coinInfo.currency)).pipe(map(function (res) {
                if (res !== null && res.getDepositAddress !== null) {
                    return res.getDepositAddress;
                }
                throw new Error("No asset");
            }), map(gatewayLoadDepositInfoSuccess));
        }));
    }), catchError(function (err) {
        console.error(err);
        return of(gatewayLoadGatewayInfoFailed());
    }));
};
