import { AuthState, LoginPanel, AuthDefaultUnlockCount } from "./auth.models";
import { AuthAction, AuthActions } from "./auth.actions";
import { Reducer } from "redux";

export const auth: Reducer<AuthState, AuthAction> = (
  state = new AuthState(),
  action
) => {
  switch (action.type) {
    case AuthActions.UnlockModalDisplay:
      return {
        ...state,
        showUnlock: true
      };
    case AuthActions.UnlockModalDismiss:
      return {
        ...state,
        showUnlock: false
      };
    case AuthActions.UnlockFailed:
      return {
        ...state,
        unlockCounter: state.unlockCounter - 1
      };
    case AuthActions.WalletPassModalDisplay:
      return {
        ...state,
        showSetPassword: true
      };
    case AuthActions.WalletPassModalDismiss:
      return {
        ...state,
        showSetPassword: false
      };
    case AuthActions.WalletPassSetSuccess:
      return {
        ...state,
        unlockCounter: action.payload.count,
        keyStoreCipher: action.payload.cipher
      };
    case AuthActions.Login:
    case AuthActions.RegImpl:
      return {
        ...state,
        keyStore: null,
        isAuthed: false,
        keyStoreCipher: null,
        account: null,
        accountName: null,
        isLogging: true
      };
    case AuthActions.LoginFailed:
    case AuthActions.RegImplFailed:
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
        loginPanel: LoginPanel.Login,
        showModal: true
      };
    case AuthActions.LoginModalClose:
      return {
        ...state,
        showModal: false
      };
    case AuthActions.Logout:
      return new AuthState();
    case AuthActions.Lock:
      return {
        ...state,
        keyStore: null
      };
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
