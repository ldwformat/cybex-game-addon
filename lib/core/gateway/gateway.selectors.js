import { createSelector } from "reselect";
import { AddressVerifyState, GatewayModalState } from "./gateway.models";
import { selectAuthSet } from "../auth/auth.selectors";
export var selectGateway = function (state) {
    return state.gateway;
};
export var selectGatewayModalShow = createSelector(selectGateway, function (gateway) { return gateway.showModal; });
export var selectGatewayModalState = createSelector(selectGateway, function (gateway) {
    return !gateway.showModal && !gateway.showWithdrawModal
        ? GatewayModalState.Closed
        : gateway.showWithdrawModal
            ? GatewayModalState.ShowWithdraw
            : GatewayModalState.ShowDeposit;
});
var PrimaryCoins = ["USDT", "ETH", "MT", "BTC"];
function findCoinIndex(coin) {
    var index = PrimaryCoins.indexOf(coin);
    return index === -1 ? coin : index;
}
function cmp(a, b) {
    if (typeof a === "string" && typeof b === "number") {
        return 1;
    }
    if (typeof a === "number" && typeof b === "string") {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
}
export var selectGatewayCoinList = createSelector(selectGateway, function (gateway) {
    return gateway.info
        .filter(function (info) { return !info.isDisabled; })
        .sort(function (prev, next) {
        return cmp(findCoinIndex(prev.currency), findCoinIndex(next.currency));
    });
});
export var selectGatewayCurrentAsset = createSelector(selectGateway, function (gateway) { return gateway.currentAsset; });
export var selectGatewayDepositInfoList = createSelector(selectGateway, function (gateway) { return gateway.depositInfoList; });
export var selectGatewayAddressVerifications = createSelector(selectGateway, function (gateway) { return gateway.addressVerifyResult; });
export var selectGatewayAddressVerification = function (coinType, address) {
    return createSelector(selectGatewayAddressVerifications, function (results) {
        return results[coinType] === undefined ||
            results[coinType][address] === undefined
            ? AddressVerifyState.Verifing
            : results[coinType][address]
                ? AddressVerifyState.Valid
                : AddressVerifyState.Invalid;
    });
};
export var selectGatewayCurrentDepositInfo = createSelector(selectGatewayDepositInfoList, selectAuthSet, selectGatewayCurrentAsset, function (list, authSet, currentAsset) {
    return list.find(function (info) {
        return info.asset === currentAsset &&
            info.accountName === (authSet && authSet.account);
    });
});
export var selectGatewayCurrentCoinInfo = createSelector(selectGatewayCoinList, selectGatewayCurrentAsset, function (list, currentAsset) { return list.find(function (info) { return info.asset === currentAsset; }); });
