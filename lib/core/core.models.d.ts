import { AuthState } from "./auth";
import { MallState } from "./mall";
import { ReferState } from "./refer";
import { GatewayState } from "./gateway";
import { FormStateMap } from "redux-form";
import { OptionsObject } from "notistack";
export declare class Noti {
    message: string;
    options: OptionsObject;
    key: string;
    constructor(message: string, options?: OptionsObject);
}
export declare class AppState {
    noties: Noti[];
}
export declare class CoreState {
    game: string;
    constructor(game: string);
    auth: AuthState;
    mall: MallState;
    refer: ReferState;
    gateway: GatewayState;
    form: FormStateMap;
    app: AppState;
}
