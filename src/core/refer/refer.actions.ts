import { Action, ActionCreator } from "redux";
import {
  ReferResult,
  SetReferForm,
  ReferSingleRebateWithValue
} from "./refer.models";
import { WithNotiOptions, withNotiOptions } from "../core.models";

export enum ReferActions {
  LoadReferInfo = "[Refer] LoadReferInfo",
  LoadReferInfoSuccess = "[Refer] LoadReferInfoSuccess",
  LoadReferInfoFailed = "[Refer] LoadReferInfoFailed",
  LoadRebateFailed = "[Refer] LoadRebateFailed",
  LoadRebateSuccess = "[Refer] LoadRebateSuccess",
  LoadRebate = "[Refer] LoadRebate",
  Add = "[Refer] Add",
  AddSuccess = "[Refer] AddSuccess",
  AddFailed = "[Refer] AddFailed"
}

export class ReferLoadReferInfoAction implements Action {
  readonly type = ReferActions.LoadReferInfo;
}
export class ReferLoadReferInfoFailedAction implements Action {
  readonly type = ReferActions.LoadReferInfoFailed;
}
export class ReferLoadReferInfoSuccessAction implements Action {
  readonly type = ReferActions.LoadReferInfoSuccess;
  constructor(public payload: ReferResult) {}
}
export class ReferLoadRebateAction implements Action {
  readonly type = ReferActions.LoadRebate;
}
export class ReferLoadRebateSuccessAction implements Action {
  readonly type = ReferActions.LoadRebateSuccess;
  constructor(public payload: ReferSingleRebateWithValue[]) {}
}
export class ReferLoadRebateFailedAction implements Action {
  readonly type = ReferActions.LoadRebateFailed;
}
export class ReferAddAction implements Action {
  readonly type = ReferActions.Add;
  constructor(public payload: SetReferForm & WithNotiOptions) {}
}
export class ReferAddSuccessAction implements Action {
  readonly type = ReferActions.AddSuccess;
  constructor(public payload: WithNotiOptions = withNotiOptions()) {}
}
export class ReferAddFailedAction implements Action {
  readonly type = ReferActions.AddFailed;
  constructor(public payload: WithNotiOptions = withNotiOptions()) {}
}

export const referLoadReferInfo: () => ReferLoadReferInfoAction = () => ({
  type: ReferActions.LoadReferInfo
});
export const referLoadReferInfoFailed: () => ReferLoadReferInfoFailedAction = () => ({
  type: ReferActions.LoadReferInfoFailed
});
export const referLoadReferInfoSuccess: (
  referInfo: ReferResult
) => ReferLoadReferInfoSuccessAction = referInfo => ({
  type: ReferActions.LoadReferInfoSuccess,
  payload: referInfo
});
export const referLoadRebate: () => ReferLoadRebateAction = () => ({
  ...new ReferLoadRebateAction()
});
export const referLoadRebateFailed: () => ReferLoadRebateFailedAction = () => ({
  ...new ReferLoadRebateFailedAction()
});
export const referLoadRebateSuccess: (
  rebateDetails: ReferSingleRebateWithValue[]
) => ReferLoadRebateSuccessAction = rebateDetails => ({
  ...new ReferLoadRebateSuccessAction(rebateDetails)
});
export const referAdd: (
  form: SetReferForm & WithNotiOptions
) => ReferAddAction = form => ({
  type: ReferActions.Add,
  payload: form
});
export const referAddSuccess: (withNoti?: boolean) => ReferAddSuccessAction = (
  withNoti = false
) => ({
  type: ReferActions.AddSuccess,
  payload: withNotiOptions(withNoti)
});
export const referAddFailed: (withNoti?: boolean) => ReferAddFailedAction = (
  withNoti = false
) => ({
  type: ReferActions.AddFailed,
  payload: withNotiOptions(withNoti)
});

export type ReferAction =
  | ReferLoadReferInfoAction
  | ReferLoadReferInfoSuccessAction
  | ReferLoadReferInfoFailedAction
  | ReferLoadRebateAction
  | ReferLoadRebateSuccessAction
  | ReferLoadRebateFailedAction
  | ReferAddAction
  | ReferAddFailedAction
  | ReferAddSuccessAction;
