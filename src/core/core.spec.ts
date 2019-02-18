import { configureStore, CoreState } from ".";
import { Store } from "redux";
import { IAuthResult, authLoginSuccess, authLogout, authLogin } from "./auth";
import { KeyStore } from "./auth/keystore/keystore";
import { delay } from "../utils";

describe("核心状态Store", () => {
  it("创建Store", () => {
    const store = configureStore();
    const state = store.getState();
    expect(state.auth.isAuthed).toStrictEqual(false);
  });
});

describe("认证测试", () => {
  const loginAccountName = "create-test14";
  const loginAccountPassword = "qwer1234qwer1234";
  const loginResult: IAuthResult = {
    accountName: loginAccountName,
    account: (null as unknown) as Cybex.Account,
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

  it("Login Effects Failed", async done => {
    store.dispatch(
      authLogin({
        accountName: loginAccountName + "Null",
        password: loginAccountPassword
      })
    );
    await delay(1000);
    let stateAfterLogin = store.getState();
    console.debug("State: ", stateAfterLogin);
    expect(stateAfterLogin.auth.isAuthed).toStrictEqual(false);
    done();
  });

  it("Login Effects Success", async done => {
    store.dispatch(
      authLogin({
        accountName: loginAccountName,
        password: loginAccountPassword
      })
    );
    await delay(1000);
    let stateAfterLogin = store.getState();
    expect(stateAfterLogin.auth.isAuthed).toStrictEqual(true);
    expect(stateAfterLogin.auth.accountName).toStrictEqual(loginAccountName);
    done();
  });
});
