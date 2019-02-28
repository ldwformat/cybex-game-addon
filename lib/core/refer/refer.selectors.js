import { createSelector } from "reselect";
import { selectGame } from "../core.selectors";
import { NAME_OF_ACTION_REGISTER } from "../auth";
export var selectRefer = function (state) {
    return state.refer;
};
export var selectMyRegisterReferrer = createSelector(selectRefer, function (refer) {
    return refer.referrers.find(function (referrer) { return referrer.action === NAME_OF_ACTION_REGISTER; });
});
export var selectMyRegisterReferral = createSelector(selectRefer, function (refer) {
    return refer.referrals.find(function (referrer) { return referrer.action === NAME_OF_ACTION_REGISTER; });
});
export var selectMyGameReferrer = createSelector(selectRefer, selectGame, function (refer, game) { return refer.referrers.find(function (referrer) { return referrer.action === game; }); });
export var selectMyGameReferral = createSelector(selectRefer, selectGame, function (refer, game) { return refer.referrals.find(function (referrer) { return referrer.action === game; }); });
