import { Epic } from "redux-observable";
import { CoreState } from "./core.models";
import { IEffectDeps } from "./modes";
export declare const loadPriceListEpic: Epic<any, any, CoreState, IEffectDeps>;
export declare const notifierEpic: Epic<any, any, CoreState, IEffectDeps>;
