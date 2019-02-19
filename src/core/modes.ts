import { ChainFetcher, MallFetcher } from "../utils/fetcher";

export interface IEffectDeps {
  fetcher: ChainFetcher;
  mallFetcher: MallFetcher;
}
