import { createSelector } from "reselect";
export var selectApp = function (state) { return state.app; };
export var selectNoties = createSelector(selectApp, function (app) { return app.noties; });
export var selectGame = function (state) { return state.game; };
export var selectReferUrl = function (state) {
    return state.referUrl;
};
