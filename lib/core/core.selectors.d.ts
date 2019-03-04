import { Selector } from "reselect";
import { CoreState, AppState } from "./core.models";
export declare const selectApp: Selector<CoreState, AppState>;
export declare const selectNoties: import("reselect").OutputSelector<CoreState, import("./core.models").Noti[], (res: AppState) => import("./core.models").Noti[]>;
export declare const selectGame: Selector<CoreState, string>;
export declare const selectReferUrl: Selector<CoreState, string>;
