export interface ReferResult {
    referrers: Referrer[];
    referrals: TypesReferral[];
}
export interface ReferSingleRebate {
    transferred: number;
    should_transfer: number;
    asset_id: number;
}
export interface ReferSingleRebateWithValue extends ReferSingleRebate {
    transferredValue: number;
    should_transferValue: number;
    asset_id: number;
    asset: Cybex.Asset;
}
export interface TypesReferral {
    action: string;
    referrals: Referral[];
}
export declare type SetReferForm = {
    action: string;
    referrer: string;
    account: string;
    isRegister?: boolean;
};
export interface Referral {
    ts: string;
    referral: string;
}
export interface Referrer {
    action: string;
    referrer: string;
}
export declare class ReferState {
    isLoading: boolean;
    referrers: Referrer[];
    referrals: TypesReferral[];
    rebates: ReferSingleRebateWithValue[];
}
export declare enum SummaryAsset {
    USDT = "USDT"
}
