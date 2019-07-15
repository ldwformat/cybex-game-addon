import { Epic } from "redux-observable";
import { IEffectDeps } from "../modes";
import { CoreState } from "..";
import { ActionCorePushNoti } from "../core.actions";
export declare const loadGatewayInfoEpic: Epic<any, any, CoreState, IEffectDeps>;
export declare const loadDpstAfterSelAssetEpic: Epic<any, any, CoreState, IEffectDeps>;
export declare const selFirstAssetEpic: Epic<any, any, CoreState, IEffectDeps>;
export declare const loadDepsoitInfoEpic: Epic<any, any, CoreState, IEffectDeps>;
export declare const verifyAddressEpic: Epic<any, any, CoreState, IEffectDeps>;
export declare const withdrawEpic: Epic<any, any, CoreState, IEffectDeps>;
export declare const gatewayFailedEpic: Epic<any, ActionCorePushNoti, any, IEffectDeps>;
export declare const gatewayWithdrawFailedEpic: Epic<any, ActionCorePushNoti, any, IEffectDeps>;
export declare const gatewayWithdrawSuccessEpic: Epic<any, ActionCorePushNoti, any, IEffectDeps>;