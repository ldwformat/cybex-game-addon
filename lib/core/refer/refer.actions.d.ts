import { Action } from "redux";
export declare enum ReferActions {
    LoadReferInfo = "[Refer] LoadReferInfo",
    LoadReferInfoSuccess = "[Refer] LoadReferInfoSuccess",
    LoadReferInfoFailed = "[Refer] LoadReferInfoFailed",
    Add = "[Refer] Add",
    AddSuccess = "[Refer] AddSuccess",
    AddFailed = "[Refer] AddFailed"
}
export declare class ReferLoadReferInfoAction implements Action {
    readonly type = ReferActions.LoadReferInfo;
}
export declare class ReferLoadReferInfoFailedAction implements Action {
    readonly type = ReferActions.LoadReferInfoFailed;
}
export declare class ReferLoadReferInfoSuccessAction implements Action {
    payload: Backend.ReferResult;
    readonly type = ReferActions.LoadReferInfoSuccess;
    constructor(payload: Backend.ReferResult);
}
export declare class ReferAddAction implements Action {
    payload: Backend.SetReferForm;
    readonly type = ReferActions.Add;
    constructor(payload: Backend.SetReferForm);
}
export declare class ReferAddSuccessAction implements Action {
    readonly type = ReferActions.AddSuccess;
}
export declare class ReferAddFailedAction implements Action {
    readonly type = ReferActions.AddFailed;
}
export declare const referLoadReferInfo: () => ReferLoadReferInfoAction;
export declare const referLoadReferInfoFailed: () => ReferLoadReferInfoFailedAction;
export declare const referLoadReferInfoSuccess: (referInfo: Backend.ReferResult) => ReferLoadReferInfoSuccessAction;
export declare const referAdd: (form: Backend.SetReferForm) => ReferAddAction;
export declare const referAddSuccess: () => ReferAddSuccessAction;
export declare const referAddFailed: () => ReferAddFailedAction;
export declare type ReferAction = ReferLoadReferInfoAction | ReferLoadReferInfoSuccessAction | ReferLoadReferInfoFailedAction | ReferAddAction | ReferAddFailedAction | ReferAddSuccessAction;
