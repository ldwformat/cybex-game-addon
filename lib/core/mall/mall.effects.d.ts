import { Epic } from "redux-observable";
import { IEffectDeps } from "../modes";
import { CoreState } from "../core.models";
export declare const loadCountriesEpic: Epic<any, any, any, IEffectDeps>;
export declare const loadProvincesEpic: Epic<any, any, CoreState, IEffectDeps>;
export declare const loadAddressBookEpic: Epic<any, any, CoreState, IEffectDeps>;
export declare const addAddressEpic: Epic<any, any, CoreState, IEffectDeps>;
