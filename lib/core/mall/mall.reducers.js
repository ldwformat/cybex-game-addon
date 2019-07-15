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
import { MallState, Chore } from "./mall.models";
import { MallActions } from "./mall.actions";
var proviceMap = function (state, action) {
    var _a;
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case MallActions.LoadProvincesSuccess:
            return __assign({}, state, (_a = {}, _a[action.payload.countryID] = action.payload.provinces, _a));
        default:
            return state;
    }
};
var chore = function (state, action) {
    if (state === void 0) { state = new Chore(); }
    switch (action.type) {
        case MallActions.LoadCountriesSuccess:
            return __assign({}, state, { countryList: action.payload });
        case MallActions.LoadProvincesSuccess:
            return __assign({}, state, { proviceMap: proviceMap(state.proviceMap, action) });
        default:
            return state;
    }
};
export var mall = function (state, action) {
    if (state === void 0) { state = new MallState(); }
    return ({
        chore: chore(state.chore, action)
    });
};
