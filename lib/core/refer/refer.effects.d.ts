import { Epic } from "redux-observable";
import { IEffectDeps } from "../modes";
import { CoreState } from "..";
import { ActionCorePushNoti } from "../core.actions";
export declare const loadReferInfoEpic: Epic<any, any, CoreState, IEffectDeps>;
export declare const addReferEpic: Epic<any, any, CoreState, IEffectDeps>;
export declare const addRefFailedEpic: Epic<any, ActionCorePushNoti, any, IEffectDeps>;
export declare const addReferAfterLoginEpic: Epic<any, any, CoreState, IEffectDeps>;
