import { Selector } from "reselect";
import { CoreState } from "..";
import { ReferState } from "./refer.models";
export declare const selectRefer: Selector<CoreState, ReferState>;
export declare const selectMyRegisterReferrer: import("reselect").OutputSelector<CoreState, Backend.Referrer | undefined, (res: ReferState) => Backend.Referrer | undefined>;
export declare const selectMyRegisterReferral: import("reselect").OutputSelector<CoreState, Backend.TypesReferral | undefined, (res: ReferState) => Backend.TypesReferral | undefined>;
export declare const selectMyGameReferrer: import("reselect").OutputSelector<CoreState, Backend.Referrer | undefined, (res1: ReferState, res2: string) => Backend.Referrer | undefined>;
export declare const selectMyGameReferral: import("reselect").OutputSelector<CoreState, Backend.TypesReferral | undefined, (res1: ReferState, res2: string) => Backend.TypesReferral | undefined>;
