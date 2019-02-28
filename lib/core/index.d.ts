/// <reference types="node" />
import { DeepPartial } from "redux";
import { ChainFetcher, MallFetcher, BackendFetcher, ReferFetcher, GatewayFetcher } from "../utils/fetcher";
import { CybexAssistant } from "../utils/cybex-assistant";
import { EventEmitter } from "events";
import { CoreState } from "./core.models";
export * from "./core.models";
export declare const configureStore: (config: CybexAddonConfig) => (preloadState?: DeepPartial<CoreState> | undefined) => Promise<{
    store: import("redux").Store<CoreState, import("redux").AnyAction> & {
        dispatch: {};
    };
    notifier: EventEmitter;
    toolset: {
        fetcher: ChainFetcher;
        mallFetcher: MallFetcher;
        gatewayFetcher: GatewayFetcher;
        backendFetcher: BackendFetcher;
        referFetcher: ReferFetcher;
        chainAssisant: CybexAssistant;
        notifier: EventEmitter;
    };
}>;
