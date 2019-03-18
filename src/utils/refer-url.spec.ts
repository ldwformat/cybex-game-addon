import { getReferUrl, resolveNameFromReferUrl } from "./refer-url";

describe("测试引荐人URL工具函数", () => {
  const testUrlPrefix = "https://www.heereisatesturl.com/syn";
  const testUrlPrefixOne = "https://www.heereisatesturl.com/syn/?$|refer|#asdf";
  const accountName = "someAccount";
  const referUrl = "https://www.heereisatesturl.com/syn?refer=someAccount";
  const referUrlOne =
    "https://www.heereisatesturl.com/syn/?refer=someAccount#asdf";

  it("生成正确的引荐人链接", () => {
    expect(getReferUrl(testUrlPrefix, accountName)).toBe(referUrl);
  });
  it("生成正确的引荐人链接1", () => {
    expect(getReferUrl(testUrlPrefixOne, accountName)).toBe(referUrlOne);
  });
  it("解析正确的链接", () => {
    expect(resolveNameFromReferUrl(referUrl)).toBe(accountName);
  });
  it("解析正确的链接1", () => {
    expect(resolveNameFromReferUrl(referUrlOne)).toBe(accountName);
  });
});
