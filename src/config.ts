export declare interface APIURL {
  mallBackend: string;
  referBackend: string;
  faucet: string;
  backend: string;
  gateway: string;
  cybexWs: string;
  cybexHttpServer: string;
}

export interface CybexAddonConfig {
  apiUrl: APIURL;
  game: string;
  lang: string;
  referUrl: string;
}

export const config: CybexAddonConfig = require("../config/config.dev.json");
