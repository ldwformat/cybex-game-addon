import { configureStore, CoreState } from ".";
import { Store } from "redux";
import { IAuthResult, authLoginSuccess, authLogout, authLogin } from "./auth";
import { KeyStore } from "./auth/keystore/keystore";
import { delay } from "../utils";
import { mallLoadCountries, mallLoadProvinces } from "./mall";
import {
  selectCountryList,
  selectMallPrvsByCountryID
} from "./mall/mall.selectors";

import { config } from "./../config";

describe("核心状态Store", () => {
  it("创建Store", async done => {
    const store = await configureStore(config)();
    const state = store.getState();
    expect(state.auth.isAuthed).toStrictEqual(false);
    done();
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
  beforeEach(async done => {
    store = await configureStore(config)();
    done();
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

describe("Mall测试", () => {
  let store: Store<CoreState>;
  beforeEach(async done => {
    store = await configureStore(config)();
    done();
  });
  it("测试更新国家列表", async done => {
    store.dispatch(mallLoadCountries());
    await delay(1000);
    let stateAfterCountry = store.getState();
    expect(selectCountryList(stateAfterCountry)).toBeInstanceOf(Array);
    expect(selectCountryList(stateAfterCountry).length).toBeGreaterThan(0);

    const COUNTRY_CHINA = 37;
    store.dispatch(mallLoadProvinces(COUNTRY_CHINA));
    await delay(1000);
    let stateAfterState = store.getState();
    const selectChinaPrvs = selectMallPrvsByCountryID(COUNTRY_CHINA)(
      stateAfterState
    );
    expect(selectChinaPrvs).toBeInstanceOf(Array);
    expect(selectChinaPrvs.length).toBeGreaterThan(0);
    expect(selectChinaPrvs[0].id).toBe(192);

    done();
  }, 6000);
});

describe("LoginRefer引荐人测试", () => {
  let store: Store<CoreState>;
  const loginAccountName = "create-test2";
  const loginAccountPassword = "qwer1234qwer1234";
  beforeAll(async done => {
    store = await configureStore(config)({ game: "cybexbet" });
    done();
  });
  it(
    "测试登录增加引荐人",
    async done => {
      let currentState = store.getState();
      store.dispatch(
        authLogin({
          accountName: loginAccountName,
          password: loginAccountPassword,
          refer: {
            action: currentState.game,
            referrer: "harley",
            isRegister: false
          }
        })
      );
      await delay(5000);
      let stateAfterLogin = store.getState();
      expect(stateAfterLogin.refer).toMatchObject({
        referrals: [],
        referrers: [{ action: "cybexbet", referrer: "harley" }]
      });

      done();
    },
    10 * 1000
  );
});
