import { ofType } from "redux-observable";
import { ReferActions, referLoadReferInfoSuccess, referLoadReferInfoFailed, referAddSuccess, referAddFailed } from "./refer.actions";
import { switchMap, catchError, map, filter, take } from "rxjs/operators";
import { of, from } from "rxjs";
import { selectAuthSet } from "../auth/auth.selectors";
import { authUnauthed, AuthActions } from "../auth";
import { corePushNoti } from "../core.actions";
import { Dict } from "../../providers/i18n";
export var loadReferInfoEpic = function (action$, state$, _a) {
    var referFetcher = _a.referFetcher;
    return action$.pipe(ofType(AuthActions.LoginSuccess, ReferActions.LoadReferInfo, ReferActions.AddSuccess), switchMap(function () {
        return state$.pipe(take(1), switchMap(function (state) {
            var authSet = selectAuthSet(state);
            if (!authSet) {
                return of(authUnauthed());
            }
            return from(referFetcher.getRefer(authSet.account)).pipe(map(referLoadReferInfoSuccess));
        }));
    }), catchError(function (err) {
        console.error(err);
        return of(referLoadReferInfoFailed());
    }));
};
export var addReferEpic = function (action$, state$, _a) {
    var referFetcher = _a.referFetcher;
    return action$.pipe(ofType(ReferActions.Add), switchMap(function (reduxAction) {
        return state$.pipe(take(1), switchMap(function (state) {
            var authSet = selectAuthSet(state);
            if (!authSet) {
                return of(authUnauthed());
            }
            var _a = reduxAction.payload, account = _a.account, action = _a.action, referrer = _a.referrer, isRegister = _a.isRegister;
            return from((!isRegister
                ? referFetcher.setRefer
                : referFetcher.setRegisterRefer)(account, referrer, action, authSet.key)).pipe(map(referAddSuccess), catchError(function (err) {
                console.error(err);
                return of(referAddFailed(reduxAction.payload.withNoti));
            }));
        }), catchError(function (err) {
            console.error(err);
            return of(referAddFailed(reduxAction.payload.withNoti));
        }));
    }), catchError(function (err) {
        console.error(err);
        return of(referAddFailed());
    }));
};
export var addRefFailedEpic = function (action$, state$, _a) {
    var fetcher = _a.fetcher;
    return action$.pipe(ofType(ReferActions.AddFailed), filter(function (action) { return !!action.payload.withNoti; }), map(function (action) {
        return corePushNoti(Dict.NotiAddReferWrong, {
            variant: "error"
        });
    }));
};
export var addReferAfterLoginEpic = function (action$, state$, _a) {
    var referFetcher = _a.referFetcher;
    return action$.pipe(ofType(AuthActions.LoginSuccess), filter(function (action) { return !!action.payload.refer; }), switchMap(function (action) {
        return from(referFetcher.getRefer(action.payload.accountName)).pipe(filter(function (referInfo) {
            return referInfo.referrers.every(function (referrer) {
                return !referrer.action.includes(action.payload.refer.action);
            });
        }), map(function (_referral) { return action; }), take(1));
    }), switchMap(function (reduxAction) {
        return state$.pipe(take(1), switchMap(function (state) {
            var authSet = selectAuthSet(state);
            if (!authSet) {
                return of(authUnauthed());
            }
            var account = reduxAction.payload.accountName;
            var _a = reduxAction.payload
                .refer, action = _a.action, isRegister = _a.isRegister, referrer = _a.referrer;
            return from((!isRegister
                ? referFetcher.setRefer
                : referFetcher.setRegisterRefer)(account, referrer, action, authSet.key)).pipe(map(referAddSuccess));
        }));
    }), catchError(function (err) {
        console.error(err);
        return of(referAddFailed());
    }));
};
