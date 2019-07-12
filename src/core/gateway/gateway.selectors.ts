import { Selector, createSelector } from "reselect";
import { CoreState } from "..";
import {
  GatewayState,
  AddressVerifyState,
  GatewayModalState
} from "./gateway.models";
import { selectAuthSet } from "../auth/auth.selectors";

export const selectGateway: Selector<CoreState, GatewayState> = state =>
  state.gateway;

export const selectGatewayModalShow = createSelector(
  selectGateway,
  gateway => gateway.showModal
);
export const selectGatewayModalState = createSelector(
  selectGateway,
  gateway =>
    !gateway.showModal && !gateway.showWithdrawModal
      ? GatewayModalState.Closed
      : gateway.showWithdrawModal
      ? GatewayModalState.ShowWithdraw
      : GatewayModalState.ShowDeposit
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
export const selectGatewayAddressVerifications = createSelector(
  selectGateway,
  gateway => gateway.addressVerifyResult
);
export const selectGatewayAddressVerification = (
  coinType: string,
  address: string
) =>
  createSelector(
    selectGatewayAddressVerifications,
    results =>
      results[coinType] === undefined ||
      results[coinType][address] === undefined
        ? AddressVerifyState.Verifing
        : results[coinType][address]
        ? AddressVerifyState.Valid
        : AddressVerifyState.Invalid
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
export const selectGatewayCurrentCoinInfo = createSelector(
  selectGatewayCoinList,
  selectGatewayCurrentAsset,
  (list, currentAsset) => list.find(info => info.asset === currentAsset)
);
