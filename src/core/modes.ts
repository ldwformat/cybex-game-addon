import {
  ChainFetcher,
  MallFetcher,
  BackendFetcher,
  GatewayFetcher,
  ReferFetcher
} from "../utils/fetcher";
import { CybexAssistant } from "src/utils/cybex-assistant";

export interface IEffectDeps {
  fetcher: ChainFetcher;
  chainAssisant: CybexAssistant;
  backendFetcher: BackendFetcher;
  referFetcher: ReferFetcher;
  gatewayFetcher: GatewayFetcher;
  mallFetcher: MallFetcher;
}
