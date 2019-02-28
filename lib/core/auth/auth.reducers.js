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
import { AuthState } from "./auth.models";
import { AuthActions } from "./auth.actions";
export var auth = function (state, action) {
    if (state === void 0) { state = new AuthState(); }
    switch (action.type) {
        case AuthActions.Login:
            return __assign({}, state, { isLogging: true });
        case AuthActions.LoginFailed:
            return __assign({}, state, { isLogging: false });
        case AuthActions.LoginSuccess:
            return __assign({}, state, { isLogging: false, isAuthed: true }, action.payload);
        case AuthActions.UpdateBalanceSuccess:
            return __assign({}, state, { balances: action.payload });
        case AuthActions.LoginModalShow:
            return __assign({}, state, { showModal: true });
        case AuthActions.LoginModalClose:
            return __assign({}, state, { showModal: false });
        case AuthActions.Logout:
            return new AuthState();
        default:
            return state;
    }
};
