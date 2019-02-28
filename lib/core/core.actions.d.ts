import { Action } from "redux";
import { Noti } from "./core.models";
import { OptionsObject } from "notistack";
export declare enum CoreActions {
    PushNoti = "[CoreActions] PushNoti",
    RemoveNoti = "[CoreActions] RemoveNoti"
}
export declare class ActionCorePushNoti implements Action {
    payload: Noti;
    readonly type = CoreActions.PushNoti;
    constructor(payload: Noti);
}
export declare class ActionCoreRemoveNoti implements Action {
    payload: string;
    readonly type = CoreActions.RemoveNoti;
    constructor(payload: string);
}
export declare const corePushNoti: (noti: string, options?: OptionsObject) => ActionCorePushNoti;
export declare const coreRemoveNoti: (key: string) => ActionCoreRemoveNoti;
export declare type CoreAction = ActionCorePushNoti | ActionCoreRemoveNoti;
