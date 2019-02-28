/// <reference types="node" />
import { ChainFetcher, MallFetcher, BackendFetcher, GatewayFetcher, ReferFetcher } from "../utils/fetcher";
import { CybexAssistant } from "src/utils/cybex-assistant";
import { EventEmitter } from "events";
export interface IEffectDeps {
    fetcher: ChainFetcher;
    chainAssisant: CybexAssistant;
    backendFetcher: BackendFetcher;
    referFetcher: ReferFetcher;
    gatewayFetcher: GatewayFetcher;
    mallFetcher: MallFetcher;
    notifier: EventEmitter;
}
export declare const EVENT_ACTION = "EVENT_ACTION";
