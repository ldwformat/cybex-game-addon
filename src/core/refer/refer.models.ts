import Serializer from "../../cybex/serializer/src/serializer";
import types from "../../cybex/serializer/src/types";

export interface ReferResult {
  referrers: Referrer[];
  referrals: TypesReferral[];
}

export interface TypesReferral {
  action: string;
  referrals: Referral[];
}

export type SetReferForm = {
  action: string; // 活动名称
  referrer: string; // 引荐人
  account: string; // 注册人
  isRegister?: boolean; // 是否为注册引荐人
};

export interface Referral {
  ts: string;
  referral: string;
}

export interface Referrer {
  action: string;
  referrer: string;
}
export class ReferState {
  isLoading = false;
  referrers: Referrer[] = [];
  referrals: TypesReferral[] = [];
}
