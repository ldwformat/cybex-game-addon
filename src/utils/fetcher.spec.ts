import { ChainFetcher, MallFetcher } from "./fetcher";
import { config } from "../config";

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
    ) as unknown) as MallBackend.Country;
    expect(china).not.toBeUndefined();
    let provinces = await fetcher.getProvinceList(china.id);
    expect(provinces).toBeInstanceOf(Array);
    let beijing = (provinces.find(
      province => province.id === 192
    ) as unknown) as MallBackend.Province;
    expect(beijing).not.toBeUndefined();
    expect(beijing.provice).toBe("北京市");

    await expect(fetcher.getProvinceList("wrongparams")).rejects.toThrow("");

    done();
  });
});
