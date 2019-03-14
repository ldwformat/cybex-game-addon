import {
  ChainFetcher,
  MallFetcher,
  BackendFetcher,
  GatewayFetcher,
  ReferFetcher,
  FaucetFetcher
} from "../utils/fetcher";
import { CybexAssistant } from "../utils/cybex-assistant";
import { EventEmitter } from "events";
import { AddonStorage } from "../utils/storage";

export interface IEffectDeps {
  backendFetcher: BackendFetcher;
  chainAssisant: CybexAssistant;
  fetcher: ChainFetcher;
  faucet: FaucetFetcher;
  gatewayFetcher: GatewayFetcher;
  mallFetcher: MallFetcher;
  notifier: EventEmitter;
  referFetcher: ReferFetcher;
  storage: AddonStorage;
}

export const EVENT_ACTION = "EVENT_ACTION";
