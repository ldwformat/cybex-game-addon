import Serializer from "../../cybex/serializer/src/serializer";
import types from "../../cybex/serializer/src/types";

export class ReferState {
  isLoading = false;
  referrers: Backend.Referrer[] = [];
  referrals: Backend.TypesReferral[] = [];
}
