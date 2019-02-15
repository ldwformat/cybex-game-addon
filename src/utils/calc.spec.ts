import { calcAmount, calcValue } from "./calc";
import { ChainFetcher } from "./fetcher";

describe("测试资产精度相关工具函数", () => {
  let assetName = "CYB";
  let asset: Cybex.Asset;
  let fetcher = new ChainFetcher("wss://hangzhou.51nebula.com", "");

  beforeAll(async done => {
    asset = await fetcher.fetchAsset(assetName);
    done();
  }, 5000);

  test("Value转Amount", () => {
    expect(calcAmount(0.00001, asset.precision)).toStrictEqual(1);
    expect(calcAmount(0.33333, asset.precision)).toStrictEqual(33333);
    expect(calcAmount(3.33333, asset.precision)).toStrictEqual(333333);
    expect(calcAmount(0.0001, asset.precision)).toStrictEqual(10);
    expect(calcAmount(0.00029, asset.precision)).toStrictEqual(29);
    expect(calcAmount(0.0000001, asset.precision)).toStrictEqual(0);
    expect(calcAmount(-1, asset.precision)).toStrictEqual(-100000);
  });

  test("Amount转Value", () => {
    expect(calcValue(100000, asset.precision)).toStrictEqual(1);
    expect(calcValue(1, asset.precision)).toStrictEqual(0.00001);
    expect(calcValue(3, asset.precision)).toStrictEqual(0.00003);
    expect(calcValue(29, asset.precision)).toStrictEqual(0.00029);
    expect(calcValue(899999999, asset.precision)).toStrictEqual(8999.99999);
  });
});
