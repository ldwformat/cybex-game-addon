/// <reference types="node" />
import { DeepPartial } from "redux";
import { IEffectDeps } from "./modes";
import { EventEmitter } from "events";
import { CoreState } from "./core.models";
import { CybexAddonConfig } from "../config";
export * from "./core.models";
export declare const configureStore: (config: CybexAddonConfig) => (preloadState?: DeepPartial<CoreState> | undefined) => Promise<{
    store: import("redux").Store<CoreState, import("redux").AnyAction>;
    notifier: EventEmitter;
    toolset: IEffectDeps;
}>;
