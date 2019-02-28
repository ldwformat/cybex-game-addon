import { Reducer } from "redux";
import { CoreState, AppState } from "./core.models";
import { CoreAction } from "./core.actions";
export declare const app: Reducer<AppState, CoreAction>;
export declare const rootReducer: Reducer<CoreState>;
