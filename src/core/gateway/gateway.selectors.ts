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
export const selectGatewayCoinList = createSelector(
  selectGateway,
  gateway =>
    gateway.info
      .filter(info => !info.isDisabled)
      .sort((prev, next) =>
        prev.currency > next.currency
          ? 1
          : prev.currency < next.currency
          ? -1
          : 0
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
