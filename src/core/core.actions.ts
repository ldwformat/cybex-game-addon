import { Action } from "redux";
import { Noti } from "./core.models";
import { OptionsObject } from "notistack";

export enum CoreActions {
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

export const corePushNoti = (noti: string, options = {}) =>
  ({
    type: CoreActions.PushNoti,
    payload: { ...new Noti(noti, options) }
  } as ActionCorePushNoti);
export const coreRemoveNoti = (key: string) =>
  ({ type: CoreActions.RemoveNoti, payload: key } as ActionCoreRemoveNoti);

export type CoreAction = ActionCorePushNoti | ActionCoreRemoveNoti;
