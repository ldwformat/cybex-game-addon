import { Action, ActionCreator } from "redux";

export enum ReferActions {
  LoadReferInfo = "[Refer] LoadReferInfo",
  LoadReferInfoSuccess = "[Refer] LoadReferInfoSuccess",
  LoadReferInfoFailed = "[Refer] LoadReferInfoFailed",
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
  constructor(public payload: Backend.ReferResult) {}
}
export class ReferAddAction implements Action {
  readonly type = ReferActions.Add;
  constructor(public payload: Backend.SetReferForm) {}
}
export class ReferAddSuccessAction implements Action {
  readonly type = ReferActions.AddSuccess;
}
export class ReferAddFailedAction implements Action {
  readonly type = ReferActions.AddFailed;
}

export const referLoadReferInfo: () => ReferLoadReferInfoAction = () => ({
  type: ReferActions.LoadReferInfo
});
export const referLoadReferInfoFailed: () => ReferLoadReferInfoFailedAction = () => ({
  type: ReferActions.LoadReferInfoFailed
});
export const referLoadReferInfoSuccess: (
  referInfo: Backend.ReferResult
) => ReferLoadReferInfoSuccessAction = referInfo => ({
  type: ReferActions.LoadReferInfoSuccess,
  payload: referInfo
});
export const referAdd: (
  form: Backend.SetReferForm
) => ReferAddAction = form => ({
  type: ReferActions.Add,
  payload: form
});
export const referAddSuccess: () => ReferAddSuccessAction = () => ({
  type: ReferActions.AddSuccess
});
export const referAddFailed: () => ReferAddFailedAction = () => ({
  type: ReferActions.AddFailed
});

export type ReferAction =
  | ReferLoadReferInfoAction
  | ReferLoadReferInfoSuccessAction
  | ReferLoadReferInfoFailedAction
  | ReferAddAction
  | ReferAddFailedAction
  | ReferAddSuccessAction;
