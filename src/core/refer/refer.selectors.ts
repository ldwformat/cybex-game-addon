import { Selector, createSelector } from "reselect";
import { CoreState } from "..";
import { ReferState } from "./refer.models";
import { selectAuthSet, selectCurrentAccount } from "../auth/auth.selectors";
import {
  selectGame,
  selectPriceList,
  selectPriceListByAsset,
  selectReferUrl
} from "../core.selectors";
import { NAME_OF_ACTION_REGISTER } from "../auth";
import BN from "bignumber.js";
import { normalizeAssetName } from "../../utils/asset-name";
import { getReferUrl } from "../../utils/refer-url";

export const selectRefer: Selector<CoreState, ReferState> = state =>
  state.refer;

export const selectReferLoading = createSelector(
  selectRefer,
  refer => refer.isLoading
);
export const selectReferRebates = createSelector(
  selectRefer,
  refer => refer.rebates
);

export const selectTotalRebatesByAsset = (asset: string) =>
  createSelector(
    selectReferRebates,
    selectPriceListByAsset(asset),
    (rebates, priceList) =>
      rebates.reduce((total, rebate) => {
        let price = priceList.find(
          price => price.name === normalizeAssetName(rebate.asset.symbol)
        );
        if (!price) {
          return total;
        }
        return (
          total + new BN(rebate.transferredValue).times(price.value).toNumber()
        );
      }, 0)
  );

export const selectMyRegisterReferrer = createSelector(
  selectRefer,
  refer =>
    refer.referrers.find(
      referrer => referrer.action === NAME_OF_ACTION_REGISTER
    )
);
export const selectMyRegisterReferral = createSelector(
  selectRefer,
  refer =>
    refer.referrals.find(
      referrer => referrer.action === NAME_OF_ACTION_REGISTER
    )
);
export const selectMyGameReferrer = createSelector(
  selectRefer,
  selectGame,
  (refer, game) => refer.referrers.find(referrer => referrer.action === game)
);
export const selectMyGameReferral = createSelector(
  selectRefer,
  selectGame,
  (refer, game) => refer.referrals.find(referrer => referrer.action === game)
);

export const selectAccountReferUrl = createSelector(
  selectCurrentAccount,
  selectReferUrl,
  (accountName, urlPrefix) =>
    accountName ? getReferUrl(urlPrefix, accountName).trim() : null
);
