import { createSelector } from "reselect";
import { selectCurrentAccount } from "../auth/auth.selectors";
import { selectGame, selectPriceListByAsset, selectReferUrl } from "../core.selectors";
import { NAME_OF_ACTION_REGISTER } from "../auth";
import BN from "bignumber.js";
import { normalizeAssetName } from "../../utils/asset-name";
import { getReferUrl } from "../../utils/refer-url";
export var selectRefer = function (state) {
    return state.refer;
};
export var selectReferLoading = createSelector(selectRefer, function (refer) { return refer.isLoading; });
export var selectReferRebates = createSelector(selectRefer, function (refer) { return refer.rebates; });
export var selectTotalRebatesByAsset = function (asset) {
    return createSelector(selectReferRebates, selectPriceListByAsset(asset), function (rebates, priceList) {
        return rebates.reduce(function (total, rebate) {
            var price = priceList.find(function (price) { return price.name === normalizeAssetName(rebate.asset.symbol); });
            if (!price) {
                return total;
            }
            return (total + new BN(rebate.transferredValue).times(price.value).toNumber());
        }, 0);
    });
};
export var selectMyRegisterReferrer = createSelector(selectRefer, function (refer) {
    return refer.referrers.find(function (referrer) { return referrer.action === NAME_OF_ACTION_REGISTER; });
});
export var selectMyRegisterReferral = createSelector(selectRefer, function (refer) {
    return refer.referrals.find(function (referrer) { return referrer.action === NAME_OF_ACTION_REGISTER; });
});
export var selectMyGameReferrer = createSelector(selectRefer, selectGame, function (refer, game) { return refer.referrers.find(function (referrer) { return referrer.action === game; }); });
export var selectMyGameReferral = createSelector(selectRefer, selectGame, function (refer, game) { return refer.referrals.find(function (referrer) { return referrer.action === game; }); });
export var selectAccountReferUrl = createSelector(selectCurrentAccount, selectReferUrl, function (accountName, urlPrefix) {
    return accountName ? getReferUrl(urlPrefix, accountName).trim() : null;
});
