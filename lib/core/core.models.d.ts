import { AuthState } from "./auth";
import { MallState } from "./mall";
import { ReferState } from "./refer";
import { GatewayState } from "./gateway";
import { OptionsObject } from "notistack";
declare type NotiOptions = OptionsObject & {
    i18n?: boolean;
};
export declare class Noti {
    message: string;
    key: string;
    options: NotiOptions;
    constructor(message: string, options?: NotiOptions);
}
export declare type WithNotiOptions = {
    withNoti?: boolean;
};
export declare function withNotiOptions(withNoti?: boolean): WithNotiOptions;
export declare class AppState {
    noties: Noti[];
}
export declare class CoreState {
    game: string;
    referUrl: string;
    constructor(game: string, referUrl: string);
    auth: AuthState;
    mall: MallState;
    refer: ReferState;
    gateway: GatewayState;
    app: AppState;
}
export {};
