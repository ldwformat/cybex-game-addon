import { AuthState } from "./auth";
import { MallState } from "./mall";
import { ReferState } from "./refer";
import { GatewayState } from "./gateway";
import { OptionsObject } from "notistack";
type NotiOptions = OptionsObject & {
  i18n?: boolean;
};
export class Noti {
  key =
    "$" + Date.now() + "|" + (10000000 + Math.floor(Math.random() * 100000000));
  options: NotiOptions = { i18n: true };
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
