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
import { combineReducers } from "redux";
import { AppState } from "./core.models";
import { auth } from "./auth";
import { mall } from "./mall";
import { refer } from "./refer";
import { gateway } from "./gateway";
import { reducer as formReducer } from "redux-form";
import { CoreActions } from "./core.actions";
export var app = function (state, action) {
    if (state === void 0) { state = new AppState(); }
    switch (action.type) {
        case CoreActions.PushNoti:
            return __assign({}, state, { noties: state.noties.concat([action.payload]) });
        case CoreActions.RemoveNoti:
            return __assign({}, state, { noties: state.noties.filter(function (noti) { return noti.key !== action.payload; }) });
        default:
            return state;
    }
};
export var rootReducer = combineReducers({
    auth: auth,
    mall: mall,
    refer: refer,
    gateway: gateway,
    form: formReducer,
    app: app,
    game: function (state) {
        if (state === void 0) { state = ""; }
        return state;
    },
    referUrl: function (state) {
        if (state === void 0) { state = ""; }
        return state;
    }
});
