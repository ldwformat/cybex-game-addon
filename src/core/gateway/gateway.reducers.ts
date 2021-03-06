import { Reducer } from "redux";
import { GatewayState } from "./gateway.models";
import { GatewayAction, GatewayActions } from "./gateway.actions";
import { AuthAction, AuthActions } from "../auth";
import { GetDepositAddress } from "../../utils/fetcher";

const isSameDpsInfo = (left: GetDepositAddress, right: GetDepositAddress) =>
  Object.keys(left).every(key => left[key] === right[key]);

export const gateway: Reducer<GatewayState, GatewayAction | AuthAction> = (
  state = new GatewayState(),
  action
) => {
  switch (action.type) {
    case GatewayActions.GatewayModalShow:
      return {
        ...state,
        showModal: true
      };
    case GatewayActions.GatewayModalClose:
      return {
        ...state,
        showModal: false
      };
    case AuthActions.Login:
    case AuthActions.RegImpl:
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
