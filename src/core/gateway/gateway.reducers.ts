import { Reducer } from "redux";
import { GatewayState } from "./gateway.models";
import { GatewayAction, GatewayActions } from "./gateway.actions";
import { AuthAction, AuthActions } from "../auth";

const isSameDpsInfo = (
  left: CybexGateway.GetDepositAddress,
  right: CybexGateway.GetDepositAddress
) => Object.keys(left).every(key => left[key] === right[key]);

export const gateway: Reducer<GatewayState, GatewayAction | AuthAction> = (
  state = new GatewayState(),
  action
) => {
  switch (action.type) {
    case AuthActions.LoginSuccess:
      return new GatewayState();
    case GatewayActions.SelectAsset:
      return {
        ...state,
        currentAsset: action.payload
      };
    case GatewayActions.LoadDepositInfoSuccess:
      return {
        ...state,
        depositInfoList: state.depositInfoList.find(info =>
          isSameDpsInfo(info, action.payload)
        )
          ? state.depositInfoList
          : [...state.depositInfoList, action.payload]
      };
    case GatewayActions.LoadGatewayInfoSuccess:
      return { ...state, info: action.payload };
    default:
      return state;
  }
};
