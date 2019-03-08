export interface ReferResult {
    referrers: Referrer[];
    referrals: TypesReferral[];
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
}
