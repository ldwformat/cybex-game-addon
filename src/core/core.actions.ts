import { Action } from "redux";
import { Noti, NotiOptions } from "./core.models";
import { OptionsObject } from "notistack";
import { AssetPrice } from "../utils/fetcher";

export enum CoreActions {
  SetRefUrl = "[CoreActions] SetRefUrl",
  LoadPriceList = "[CoreActions] LoadPriceList",
  LoadPriceListSuccess = "[CoreActions] LoadPriceListSuccess",
  LoadPriceListFailed = "[CoreActions] LoadPriceListFailed",
  PushNoti = "[CoreActions] PushNoti",
  RemoveNoti = "[CoreActions] RemoveNoti"
}
export class ActionCoreLoadPriceList implements Action {
  readonly type = CoreActions.LoadPriceList;
}
export class ActionCoreLoadPriceListSuccess implements Action {
  readonly type = CoreActions.LoadPriceListSuccess;
  constructor(public payload: AssetPrice[]) {}
}
export class ActionCorePushNoti implements Action {
  readonly type = CoreActions.PushNoti;
  constructor(public payload: Noti) {}
}
export class ActionCoreRemoveNoti implements Action {
  readonly type = CoreActions.RemoveNoti;
  constructor(public payload: string) {}
}
export class ActionSetRefUrl implements Action {
  readonly type = CoreActions.SetRefUrl;
  constructor(public payload: string) {}
}

export const loadPriceList = () => ({ ...new ActionCoreLoadPriceList() });
export const loadPriceListSuccess = (priceList: AssetPrice[]) => ({
  ...new ActionCoreLoadPriceListSuccess(priceList)
});

export const corePushNoti = (noti: string, options: NotiOptions = {}) =>
  ({
    type: CoreActions.PushNoti,
    payload: { ...new Noti(noti, options) }
  } as ActionCorePushNoti);
export const coreRemoveNoti = (key: string) =>
  ({ type: CoreActions.RemoveNoti, payload: key } as ActionCoreRemoveNoti);
export const setRefUrl = (url: string) => ({ ...new ActionSetRefUrl(url) });

export type CoreAction =
  | ActionCoreLoadPriceList
  | ActionCoreLoadPriceListSuccess
  | ActionCorePushNoti
  | ActionCoreRemoveNoti
  | ActionSetRefUrl;
