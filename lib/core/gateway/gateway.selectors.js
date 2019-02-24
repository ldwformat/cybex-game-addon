import { createSelector } from "reselect";
import { selectAuthSet } from "../auth/auth.selectors";
export var selectGateway = function (state) {
    return state.gateway;
};
export var selectGatewayCoinList = createSelector(selectGateway, function (gateway) { return gateway.info.filter(function (info) { return !info.isDisabled; }); });
export var selectGatewayCurrentAsset = createSelector(selectGateway, function (gateway) { return gateway.currentAsset; });
export var selectGatewayDepositInfoList = createSelector(selectGateway, function (gateway) { return gateway.depositInfoList; });
export var selectGatewayCurrentDepositInfo = createSelector(selectGatewayDepositInfoList, selectAuthSet, selectGatewayCurrentAsset, function (list, authSet, currentAsset) {
    return list.find(function (info) {
        return info.asset === currentAsset &&
            info.accountName === (authSet && authSet.account);
    });
});
