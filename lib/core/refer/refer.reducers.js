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
import { ReferState } from "./refer.models";
import { ReferActions } from "./refer.actions";
export var refer = function (state, action) {
    if (state === void 0) { state = new ReferState(); }
    switch (action.type) {
        case ReferActions.Add:
            return __assign({}, state, { isLoading: true });
        case ReferActions.AddSuccess:
        case ReferActions.AddFailed:
            return __assign({}, state, { isLoading: false });
        case ReferActions.LoadReferInfoSuccess:
            return __assign({}, state, action.payload);
        case ReferActions.LoadRebateSuccess:
            return __assign({}, state, { rebates: action.payload });
        case ReferActions.HidePoster:
            return __assign({}, state, { isShowPoster: action.payload });
        default:
            return state;
    }
};
