export declare interface APIURL {
  mallBackend: string;
  referBackend: string;
  faucet: string;
  backend: string;
  gateway: string;
  cybexWs: string;
  cybexHttpServer: string;
}
export declare interface APIURLOptions {
  mallBackend?: string;
  referBackend?: string;
  faucet?: string;
  backend?: string;
  gateway?: string;
  cybexWs?: string;
  cybexHttpServer?: string;
}

export interface CybexAddonConfig {
  apiUrl: APIURL;
  game: string;
  lang: string;
  referUrl: string;
  lockupTime: number;
}
export interface CybexAddonConfigOptions {
  apiUrl?: APIURLOptions;
  game?: string;
  lang?: string;
  referUrl?: string;
  lockupTime?: number;
}

export const config: CybexAddonConfig = require("../config/config.dev.json");
