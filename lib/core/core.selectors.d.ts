import { Selector } from "reselect";
import { CoreState, AppState } from "./core.models";
import { AssetPrice } from "../utils/fetcher";
export declare const selectApp: Selector<CoreState, AppState>;
export declare const selectNoties: import("reselect").OutputSelector<CoreState, import("./core.models").Noti[], (res: AppState) => import("./core.models").Noti[]>;
export declare const selectLockupTime: import("reselect").OutputSelector<CoreState, number, (res: AppState) => number>;
export declare const selectPriceList: import("reselect").OutputSelector<CoreState, AssetPrice[], (res: AppState) => AssetPrice[]>;
export declare const selectPriceListByAsset: (asset: string) => import("reselect").OutputSelector<CoreState, {
    rawValue: number;
    value: number;
    name: string;
    time: number;
}[], (res: AssetPrice[]) => {
    rawValue: number;
    value: number;
    name: string;
    time: number;
}[]>;
export declare const selectGame: Selector<CoreState, string>;
export declare const selectReferUrl: Selector<CoreState, string>;
