import { WsConnection } from "./connect";
import { CybexAssistant } from "./cybex-assistant";
import { KeyStore } from "../../src/core/auth/keystore/keystore";
import { PrivateKey } from "../../src/cybex/ecc";

const NORMAL_TIMEOUT = 30 * 1000;

describe("CybexAssistant类测试", () => {
  let ws: WsConnection;
  let cybex: CybexAssistant;
  beforeAll(async done => {
    ws = new WsConnection({
      url: "wss://shenzhen.51nebula.com"
    });
    await ws.connect();
    cybex = new CybexAssistant(ws);
    done();
  }, NORMAL_TIMEOUT);

  test(
    "查询全局参数",
    async done => {
      let res = await cybex.getObjects("2.0.0");
      expect(res).toBeInstanceOf(Array);
      expect(res[0].id).toBe("2.0.0");
      done();
    },
    NORMAL_TIMEOUT
  );

  test(
    "查询获取资产",
    async done => {
      let assetID = "1.3.0";
      let assetSymbol = "CYB";
      let resByID = await cybex.getAssets(assetID);
      expect(resByID).toBeInstanceOf(Array);
      expect((resByID[0] as Cybex.Asset).symbol).toBe(assetSymbol);
      let resBySymbol = await cybex.getAssets(assetID);
      expect(resBySymbol).toBeInstanceOf(Array);
      expect((resBySymbol[0] as Cybex.Asset).id).toBe(assetID);
      done();
    },
    NORMAL_TIMEOUT
  );

  test(
    "查询获取用户信息",
    async done => {
      // 账户存在
      let accountID = "1.2.0";
      let accountName = "committee-account";
      let resByID = await cybex.getAccounts(accountID);
      expect(resByID).toBeInstanceOf(Array);
      expect((resByID[0] as Cybex.Account).name).toBe(accountName);
      let resBySymbol = await cybex.getAccounts(accountName);
      expect(resBySymbol).toBeInstanceOf(Array);
      expect((resBySymbol[0] as Cybex.Account).id).toBe(accountID);

      // 账户不存在
      let accountIDFake = "1.2.9999999";
      let accountNameFake = "null-exists-account";
      let resByIDFake = await cybex.getAccounts(accountID, accountIDFake);
      expect(resByIDFake).toBeInstanceOf(Array);
      expect((resByIDFake[0] as Cybex.Account).name).toBe(accountName);
      expect(resByIDFake[1]).toBeNull();
      let resBySymbolFake = await cybex.getAccounts(
        accountName,
        accountNameFake
      );
      expect(resBySymbolFake).toBeInstanceOf(Array);
      expect((resBySymbolFake[0] as Cybex.Account).id).toBe(accountID);
      expect(resBySymbolFake[1]).toBeNull();
      done();
    },
    NORMAL_TIMEOUT
  );

  test(
    "简单转账测试用户信息",
    async done => {
      let accountName = "create-test";
      let seed = "create-testownerqwer1234qwer1234";
      let keyStore = new KeyStore([PrivateKey.fromSeed(seed)]);
      let accounts = await cybex.getAccounts(accountName);
      let account = accounts[0] as Cybex.Account;
      expect(account.name).toBe(accountName);
      keyStore.loginAccount(account);
      await cybex.transfer(
        {
          from: accountName,
          to: "ldw-format",
          value: 0.00001,
          asset: "CYB",
          memo: "这是一个测试消息"
        },
        keyStore
      );
      await cybex.transfer(
        {
          from: "1.2.346",
          to: "1.2.139",
          value: 0.00002,
          asset: "CYB",
          memo: "这是另一个测试消息"
        },
        keyStore
      );
      // TODO: 增加发送细节验证
      done();
    },
    NORMAL_TIMEOUT
  );
});
