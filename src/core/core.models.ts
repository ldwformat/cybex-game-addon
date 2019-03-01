import { AuthState } from "./auth";
import { MallState } from "./mall";
import { ReferState } from "./refer";
import { GatewayState } from "./gateway";
import { FormStateMap } from "redux-form";
import { OptionsObject } from "notistack";

export class Noti {
  key =
    "$" + Date.now() + "|" + (10000000 + Math.floor(Math.random() * 100000000));
  constructor(public message: string, public options: OptionsObject = {}) {}
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
  public form: FormStateMap = {};
  public app: AppState = new AppState();
}
