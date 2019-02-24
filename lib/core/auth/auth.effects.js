import { ofType } from "redux-observable";
import { map, switchMap, catchError } from "rxjs/operators";
import { AuthActions, authLoginSuccess, authLoginFailed } from "./auth.actions";
import { of, from } from "rxjs";
import assert from "assert";
import { authCheckFromSeed } from "../../utils/auth";
export var loginEpic = function (action$, state$, _a) {
    var fetcher = _a.fetcher;
    return action$.pipe(ofType(AuthActions.Login), switchMap(function (action) {
        return from(fetcher.fetchAccount(action.payload.accountName)).pipe(map(function (account) {
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
        }));
    }), catchError(function (err) {
        console.error("[Login Effect] Login Failed", err);
        return of(authLoginFailed());
    }));
};
