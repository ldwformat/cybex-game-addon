import { Epic } from "redux-observable";
import { IEffectDeps } from "../modes";
import { CoreState } from "..";
export declare const loadReferInfoEpic: Epic<any, any, CoreState, IEffectDeps>;
export declare const addReferEpic: Epic<any, any, CoreState, IEffectDeps>;
export declare const addReferAfterLoginEpic: Epic<any, any, CoreState, IEffectDeps>;
