import { Selector } from "reselect";
import { CoreState } from "..";
import { ReferState } from "./refer.models";
export declare const selectRefer: Selector<CoreState, ReferState>;
export declare const selectReferLoading: import("reselect").OutputSelector<CoreState, boolean, (res: ReferState) => boolean>;
export declare const selectReferRebates: import("reselect").OutputSelector<CoreState, import("./refer.models").ReferSingleRebateWithValue[], (res: ReferState) => import("./refer.models").ReferSingleRebateWithValue[]>;
export declare const selectTotalRebatesByAsset: (asset: string) => import("reselect").OutputSelector<CoreState, number, (res1: import("./refer.models").ReferSingleRebateWithValue[], res2: {
    rawValue: number;
    value: number;
    name: string;
    time: number;
}[]) => number>;
export declare const selectMyRegisterReferrer: import("reselect").OutputSelector<CoreState, import("./refer.models").Referrer | undefined, (res: ReferState) => import("./refer.models").Referrer | undefined>;
export declare const selectMyRegisterReferral: import("reselect").OutputSelector<CoreState, import("./refer.models").TypesReferral | undefined, (res: ReferState) => import("./refer.models").TypesReferral | undefined>;
export declare const selectMyGameReferrer: import("reselect").OutputSelector<CoreState, import("./refer.models").Referrer | undefined, (res1: ReferState, res2: string) => import("./refer.models").Referrer | undefined>;
export declare const selectMyGameReferral: import("reselect").OutputSelector<CoreState, import("./refer.models").TypesReferral | undefined, (res1: ReferState, res2: string) => import("./refer.models").TypesReferral | undefined>;
export declare const selectAccountReferUrl: import("reselect").OutputSelector<CoreState, string | null, (res1: string | null, res2: string) => string | null>;