import { configureStore, CoreState } from ".";
import { Store } from "redux";
import { IAuthResult, authLoginSuccess, authLogout } from "./auth";
import { KeyStore } from "./auth/keystore/keystore";

describe("核心状态Store", () => {
  it("创建Store", () => {
    const store = configureStore();
    const state = store.getState();
    expect(state.auth.isAuthed).toStrictEqual(false);
  });
});

describe("AuthReducer", () => {
  const loginAccountName = "create-test14";
  const loginResult: IAuthResult = {
    accountName: loginAccountName,
    keyStore: new KeyStore()
  };

  let store: Store<CoreState>;
  beforeEach(() => {
    store = configureStore();
  });

  it("Login登录, Logout登出", () => {
    store.dispatch(authLoginSuccess(loginResult));
    let stateAfterLogin = store.getState();
    expect(stateAfterLogin.auth.isAuthed).toStrictEqual(true);
    expect(stateAfterLogin.auth.accountName).toStrictEqual(loginAccountName);
    store.dispatch(authLogout());
    let stateAfterLogout = store.getState();
    expect(stateAfterLogout.auth.isAuthed).toStrictEqual(false);
    expect(stateAfterLogout.auth.keyStore).toBeNull();
    expect(stateAfterLogout.auth.accountName).toBeNull();
  });
});
