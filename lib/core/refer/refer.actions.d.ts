import { Action } from "redux";
import { ReferResult, SetReferForm, ReferSingleRebateWithValue } from "./refer.models";
import { WithNotiOptions } from "../core.models";
export declare enum ReferActions {
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
export declare class ReferLoadReferInfoAction implements Action {
    readonly type = ReferActions.LoadReferInfo;
}
export declare class ReferLoadReferInfoFailedAction implements Action {
    readonly type = ReferActions.LoadReferInfoFailed;
}
export declare class ReferLoadReferInfoSuccessAction implements Action {
    payload: ReferResult;
    readonly type = ReferActions.LoadReferInfoSuccess;
    constructor(payload: ReferResult);
}
export declare class ReferLoadRebateAction implements Action {
    readonly type = ReferActions.LoadRebate;
}
export declare class ReferLoadRebateSuccessAction implements Action {
    payload: ReferSingleRebateWithValue[];
    readonly type = ReferActions.LoadRebateSuccess;
    constructor(payload: ReferSingleRebateWithValue[]);
}
export declare class ReferLoadRebateFailedAction implements Action {
    readonly type = ReferActions.LoadRebateFailed;
}
export declare class ReferAddAction implements Action {
    payload: SetReferForm & WithNotiOptions;
    readonly type = ReferActions.Add;
    constructor(payload: SetReferForm & WithNotiOptions);
}
export declare class ReferAddSuccessAction implements Action {
    payload: WithNotiOptions;
    readonly type = ReferActions.AddSuccess;
    constructor(payload?: WithNotiOptions);
}
export declare class ReferAddFailedAction implements Action {
    payload: WithNotiOptions;
    readonly type = ReferActions.AddFailed;
    constructor(payload?: WithNotiOptions);
}
export declare const referLoadReferInfo: () => ReferLoadReferInfoAction;
export declare const referLoadReferInfoFailed: () => ReferLoadReferInfoFailedAction;
export declare const referLoadReferInfoSuccess: (referInfo: ReferResult) => ReferLoadReferInfoSuccessAction;
export declare const referLoadRebate: () => ReferLoadRebateAction;
export declare const referLoadRebateFailed: () => ReferLoadRebateFailedAction;
export declare const referLoadRebateSuccess: (rebateDetails: ReferSingleRebateWithValue[]) => ReferLoadRebateSuccessAction;
export declare const referAdd: (form: SetReferForm & WithNotiOptions) => ReferAddAction;
export declare const referAddSuccess: (withNoti?: boolean) => ReferAddSuccessAction;
export declare const referAddFailed: (withNoti?: boolean) => ReferAddFailedAction;
export declare type ReferAction = ReferLoadReferInfoAction | ReferLoadReferInfoSuccessAction | ReferLoadReferInfoFailedAction | ReferLoadRebateAction | ReferLoadRebateSuccessAction | ReferLoadRebateFailedAction | ReferAddAction | ReferAddFailedAction | ReferAddSuccessAction;
