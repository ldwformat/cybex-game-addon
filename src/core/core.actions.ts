import { Action } from "redux";
import { Noti, NotiOptions } from "./core.models";
import { OptionsObject } from "notistack";

export enum CoreActions {
  SetRefUrl = "[CoreActions] SetRefUrl",
  PushNoti = "[CoreActions] PushNoti",
  RemoveNoti = "[CoreActions] RemoveNoti"
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

export const corePushNoti = (noti: string, options: NotiOptions = {}) =>
  ({
    type: CoreActions.PushNoti,
    payload: { ...new Noti(noti, options) }
  } as ActionCorePushNoti);
export const coreRemoveNoti = (key: string) =>
  ({ type: CoreActions.RemoveNoti, payload: key } as ActionCoreRemoveNoti);
export const setRefUrl = (url: string) => ({ ...new ActionSetRefUrl(url) });

export type CoreAction =
  | ActionCorePushNoti
  | ActionCoreRemoveNoti
  | ActionSetRefUrl;
