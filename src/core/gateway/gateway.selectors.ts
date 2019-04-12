import { Selector, createSelector } from "reselect";
import { CoreState } from "..";
import { GatewayState } from "./gateway.models";
import { selectAuthSet } from "../auth/auth.selectors";

export const selectGateway: Selector<CoreState, GatewayState> = state =>
  state.gateway;

export const selectGatewayModalShow = createSelector(
  selectGateway,
  gateway => gateway.showModal
);

const PrimaryCoins = ["USDT", "ETH", "MT", "BTC"];
function findCoinIndex(coin: string) {
  let index = PrimaryCoins.indexOf(coin);
  return index === -1 ? coin : index;
}
function cmp(a: string | number, b: string | number) {
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
export const selectGatewayCoinList = createSelector(
  selectGateway,
  gateway =>
    gateway.info
      .filter(info => !info.isDisabled)
      .sort((prev, next) =>
        cmp(findCoinIndex(prev.currency), findCoinIndex(next.currency))
      )
);
export const selectGatewayCurrentAsset = createSelector(
  selectGateway,
  gateway => gateway.currentAsset
);
export const selectGatewayDepositInfoList = createSelector(
  selectGateway,
  gateway => gateway.depositInfoList
);

export const selectGatewayCurrentDepositInfo = createSelector(
  selectGatewayDepositInfoList,
  selectAuthSet,
  selectGatewayCurrentAsset,
  (list, authSet, currentAsset) =>
    list.find(
      info =>
        info.asset === currentAsset &&
        info.accountName === (authSet && authSet.account)
    )
);
