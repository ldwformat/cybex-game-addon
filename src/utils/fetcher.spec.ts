import {
  ChainFetcher,
  MallFetcher,
  BackendFetcher,
  ReferFetcher,
  GatewayFetcher,
  MallBackendCountry,
  MallBackendProvince
} from "./fetcher";
import { config } from "../config";
import PrivateKey from "../../src/cybex/ecc/src/PrivateKey";

describe("Test class ChainFetcher", () => {
  let fetcher: ChainFetcher;
  beforeAll(() => {
    fetcher = new ChainFetcher(
      "wss://hangzhou.51nebula.com",
      "https://www.cybexluck.io"
    );
  }, 5000);

  test(`Get account "harley", which has an account name "harley"`, async done => {
    let account = await fetcher.fetchAccount("harley");
    expect(account.name).toEqual("harley");
    done();
  });

  test(`Get account "null-null", which doesn't exist`, async done => {
    let account = await fetcher.fetchAccount("null-null");
    expect(account).toBeNull();
    done();
  });

  test(`Get asset "CYB", which has an symbol "CYB" and id "1.3.0"`, async done => {
    let asset = await fetcher.fetchAsset("CYB");
    expect(asset.symbol).toEqual("CYB");
    expect(asset.id).toEqual("1.3.0");
    done();
  });

  test(`Get asset "CYBNULL", which doesn't exist`, async done => {
    let asset = await fetcher.fetchAsset("CYBNULL");
    expect(asset).toBeNull();
    done();
  });
});

describe("Test class MallFetcher", () => {
  let fetcher: MallFetcher;

  beforeAll(() => (fetcher = new MallFetcher(config.apiUrl.mallBackend)));

  it("测试获取所有国家列表", async done => {
    let allCountries = await fetcher.getCountryList();
    expect(allCountries).toBeInstanceOf(Array);
    let angola = allCountries[0];
    expect(angola.id).toBe(1);
    done();
  });

  it("测试获取中国省份列表", async done => {
    let allCountries = await fetcher.getCountryList();
    expect(allCountries).toBeInstanceOf(Array);
    let china = (allCountries.find(
      country => country.country === "中国"
    ) as unknown) as MallBackendCountry;
    expect(china).not.toBeUndefined();
    let provinces = await fetcher.getProvinceList(china.id);
    expect(provinces).toBeInstanceOf(Array);
    let beijing = (provinces.find(
      province => province.id === 192
    ) as unknown) as MallBackendProvince;
    expect(beijing).not.toBeUndefined();
    expect(beijing.provice).toBe("北京市");

    await expect(fetcher.getProvinceList("wrongparams")).rejects.toThrow("");

    done();
  });
});

describe("Test class BackendFetcher", () => {
  let fetcher: BackendFetcher;
  let accountName = "create-test14";
  let privKey = PrivateKey.fromSeed("create-test14activeqwer1234qwer1234");

  beforeAll(() => (fetcher = new BackendFetcher(config.apiUrl.backend)));

  it("测试增加与查询收货地址", async done => {
    let fakeAddress = {
      loginName: accountName, // cybex帐户名
      receiverName: "爱谁谁", // 收货人姓名，使用UTF-8编码方式进行序列化
      email: "example@domain.com", // 收货人邮箱地址
      qqNo: "example@domain.com", // 收货人qq号码
      wechatNo: "example@wechat1415", // 收货人微信号
      proviceId: 192, // 北京
      homeAddress: "某市某区某镇某乡某县某街道XXX号" // 收货人地址，使用UTF-8编码方式进行序列化
    };
    let addRes = await fetcher.addAddress(fakeAddress, privKey);
    expect(addRes).toBe("");
    let queryRes = await fetcher.queryAddress(accountName, privKey)[0];
    expect(queryRes.country).toBe("中国");
    expect(queryRes.provice).toBe("北京市");
    done();
  });
});

describe("Test class ReferFetcher", () => {
  let fetcher: ReferFetcher;
  let accountName = "create-test14";
  let accountNameOne = "create-test12";
  let privKey = PrivateKey.fromSeed("create-test14activeqwer1234qwer1234");
  let privKeyOne = PrivateKey.fromSeed("create-test12activeqwer1234qwer1234");

  beforeAll(() => (fetcher = new ReferFetcher(config.apiUrl.referBackend)));

  it("测试增加引荐人", async done => {
    const setRefer = fetcher.setRefer(
      accountName,
      "harley",
      "cybexbet",
      privKey
    );
    try {
      await expect(setRefer).resolves.toBeUndefined();
    } catch (_e) {
      await expect(setRefer).rejects.toThrowError("Referrer already set");
    }
    done();
  });

  it("测试增加注册引荐人", async done => {
    let setRefer = fetcher.setRegisterRefer(
      accountNameOne,
      "harley",
      "cybexbet",
      privKeyOne
    );
    try {
      await expect(setRefer).resolves.toBeUndefined();
    } catch (_e) {
      await expect(setRefer).rejects.toThrowError("Referrer already set");
    }
    done();
  });
  it("测试获取引荐人", async done => {
    let refer = fetcher.getRefer(accountName);
    await expect(refer).resolves.toMatchObject({
      referrals: [],
      referrers: [{ action: "cybexbet", referrer: "harley" }]
    });

    let referOne = fetcher.getRefer(accountNameOne);
    await expect(referOne).resolves.toMatchObject({
      referrals: [],
      referrers: [
        { action: "cybexbet", referrer: "harley" },
        {
          action: "register",
          referrer: "harley"
        }
      ]
    });

    done();
  });
  it("测试获取不存在账户的引荐人", async done => {
    let refer = fetcher.getRefer(accountName + "NotExists");
    await expect(refer).resolves.toMatchObject({
      referrals: [],
      referrers: []
    });
    done();
  });
});

describe("Test class GatewayFetcher", () => {
  let fetcher: GatewayFetcher;
  let accountName = "create-test14";
  let privKey = PrivateKey.fromSeed("create-test14activeqwer1234qwer1234");

  beforeAll(() => (fetcher = new GatewayFetcher(config.apiUrl.gateway)));

  it("测试获取ETH地址", async done => {
    let depositRes = await fetcher.getDepositInto(accountName, "ETH");
    if (depositRes.getDepositAddress !== null) {
      expect(depositRes.getDepositAddress.accountName).toBe(accountName);
      expect(depositRes.getDepositAddress.address).toBe(
        "0xf204095acc62c5b65e991729417d170512f9c8c8"
      );
      expect(depositRes.getDepositAddress.asset).toBe("JADE.ETH");
      done();
    }
  });

  it("测试获取不存在资产地址", async done => {
    let depositRes = await fetcher.getDepositInto(
      accountName,
      "ETH.NOT.EXISTS"
    );
    expect(depositRes.getDepositAddress).toBeNull();
    done();
  });

  it("测试获取不存在用户地址", async done => {
    let depositRes = await fetcher.getDepositInto(
      "ETH.NOT.EXISTS",
      "ETH.NOT.EXISTS"
    );
    expect(depositRes.getDepositAddress).toBeNull();
    done();
  });
});
