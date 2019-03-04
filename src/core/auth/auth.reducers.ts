import { AuthState, LoginPanel } from "./auth.models";
import { AuthAction, AuthActions } from "./auth.actions";
import { Reducer } from "redux";

export const auth: Reducer<AuthState, AuthAction> = (
  state = new AuthState(),
  action
) => {
  switch (action.type) {
    case AuthActions.Login:
      return {
        ...state,
        isLogging: true
      };
    case AuthActions.LoginFailed:
      return {
        ...state,
        isLogging: false
      };
    case AuthActions.LoginSuccess:
      return {
        ...state,
        isLogging: false,
        isAuthed: true,
        ...action.payload
      };
    case AuthActions.UpdateBalanceSuccess:
      return {
        ...state,
        balances: action.payload
      };
    case AuthActions.LoginModalShow:
      return {
        ...state,
        showModal: true
      };
    case AuthActions.LoginModalClose:
      return {
        ...state,
        showModal: false
      };
    case AuthActions.Logout:
      return new AuthState();
    case AuthActions.RegGetCaptchaSuccess:
      return {
        ...state,
        captcha: action.payload
      };
    case AuthActions.LoginModalSwitchPanel:
      return {
        ...state,
        loginPanel:
          state.loginPanel === LoginPanel.Register
            ? LoginPanel.Login
            : LoginPanel.Register
      };
    default:
      return state;
  }
};
