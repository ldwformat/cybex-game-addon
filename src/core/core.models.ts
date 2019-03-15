import { AuthState } from "./auth";
import { MallState } from "./mall";
import { ReferState } from "./refer";
import { GatewayState } from "./gateway";
import { OptionsObject } from "notistack";

export type NotiOptions = OptionsObject & {
  i18n?: boolean;
  transparams?: object;
};

export interface Serializable {
  serialize(): string;
}

export class Noti {
  key =
    "$" + Date.now() + "|" + (10000000 + Math.floor(Math.random() * 100000000));
  options: NotiOptions = { i18n: true, transparams: {} };
  constructor(public message: string, options: NotiOptions = {}) {
    this.options = { ...this.options, ...options };
  }
}
export type WithNotiOptions = {
  withNoti?: boolean;
};
export function withNotiOptions(withNoti: boolean = false): WithNotiOptions {
  return {
    withNoti
  };
}

export class AppState {
  public noties: Noti[] = [];
}

// RootState
export class CoreState {
  constructor(public game: string, public referUrl: string) {}
  public auth = new AuthState();
  public mall = new MallState();
  public refer = new ReferState();
  public gateway = new GatewayState();
  public app: AppState = new AppState();
}
