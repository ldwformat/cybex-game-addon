import { Selector, createSelector } from "reselect";
import { CoreState, AppState } from "./core.models";
import BN from "bignumber.js";
import { AssetPrice } from "../utils/fetcher";

export const selectApp: Selector<CoreState, AppState> = state => state.app;

export const selectNoties = createSelector(
  selectApp,
  app => app.noties
);
export const selectLockupTime = createSelector(
  selectApp,
  app => app.lockupTime
);

export const selectPriceList = createSelector(
  selectApp,
  app => app.priceList
);

export const selectPriceListByAsset = (asset: string) =>
  createSelector(
    selectPriceList,
    priceList => {
      let usdtPrice = priceList.find(price => price.name === asset);
      if (!usdtPrice) {
        return [];
      }
      return priceList.map(price => ({
        ...price,
        rawValue: price.value,
        value: new BN(price.value)
          .div((usdtPrice as AssetPrice).value)
          .toNumber()
      }));
    }
  );

export const selectGame: Selector<CoreState, string> = state => state.game;
export const selectReferUrl: Selector<CoreState, string> = state =>
  state.referUrl;
