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
        case AuthActions.LoginSuccess:
            return __assign({}, state, { isAuthed: true }, action.payload);
        case AuthActions.Logout:
            return new AuthState();
        default:
            return state;
    }
};
