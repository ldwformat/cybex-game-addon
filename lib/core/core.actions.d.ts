import { Action } from "redux";
import { Noti, NotiOptions } from "./core.models";
import { AssetPrice } from "../utils/fetcher";
export declare enum CoreActions {
    SetRefUrl = "[CoreActions] SetRefUrl",
    LoadPriceList = "[CoreActions] LoadPriceList",
    LoadPriceListSuccess = "[CoreActions] LoadPriceListSuccess",
    LoadPriceListFailed = "[CoreActions] LoadPriceListFailed",
    RefreshLockup = "[CoreActions] RefreshLockup",
    PushNoti = "[CoreActions] PushNoti",
    RemoveNoti = "[CoreActions] RemoveNoti"
}
export declare class ActionCoreLoadPriceList implements Action {
    readonly type = CoreActions.LoadPriceList;
}
export declare class ActionCoreRefreshLockup implements Action {
    readonly type = CoreActions.RefreshLockup;
}
export declare class ActionCoreLoadPriceListSuccess implements Action {
    payload: AssetPrice[];
    readonly type = CoreActions.LoadPriceListSuccess;
    constructor(payload: AssetPrice[]);
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
export declare class ActionSetRefUrl implements Action {
    payload: string;
    readonly type = CoreActions.SetRefUrl;
    constructor(payload: string);
}
export declare const loadPriceList: () => {
    type: CoreActions.LoadPriceList;
};
export declare const coreRefreshLockup: () => {
    type: CoreActions.RefreshLockup;
};
export declare const loadPriceListSuccess: (priceList: AssetPrice[]) => {
    type: CoreActions.LoadPriceListSuccess;
    payload: AssetPrice[];
};
export declare const corePushNoti: (noti: string, options?: NotiOptions) => ActionCorePushNoti;
export declare const coreRemoveNoti: (key: string) => ActionCoreRemoveNoti;
export declare const setRefUrl: (url: string) => {
    type: CoreActions.SetRefUrl;
    payload: string;
};
export declare type CoreAction = ActionCoreLoadPriceList | ActionCoreLoadPriceListSuccess | ActionCorePushNoti | ActionCoreRemoveNoti | ActionCoreRefreshLockup | ActionSetRefUrl;
