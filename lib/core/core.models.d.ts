import { AuthState } from "./auth";
import { MallState } from "./mall";
import { ReferState } from "./refer";
import { GatewayState } from "./gateway";
import { OptionsObject } from "notistack";
import { AssetPrice } from "../utils/fetcher";
export declare type NotiOptions = OptionsObject & {
    i18n?: boolean;
    transparams?: object;
};
export interface Serializable {
    serialize(): string;
}
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
    priceList: AssetPrice[];
    noties: Noti[];
    lockupTime: number;
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
