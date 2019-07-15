import { getReferUrl, resolveNameFromReferUrl } from "./refer-url";
describe("测试引荐人URL工具函数", function () {
    var testUrlPrefix = "https://www.heereisatesturl.com/syn";
    var testUrlPrefixOne = "https://www.heereisatesturl.com/syn/?$|refer|#asdf";
    var accountName = "someAccount";
    var referUrl = "https://www.heereisatesturl.com/syn?refer=someAccount";
    var referUrlOne = "https://www.heereisatesturl.com/syn/?refer=someAccount#asdf";
    it("生成正确的引荐人链接", function () {
        expect(getReferUrl(testUrlPrefix, accountName)).toBe(referUrl);
    });
    it("生成正确的引荐人链接1", function () {
        expect(getReferUrl(testUrlPrefixOne, accountName)).toBe(referUrlOne);
    });
    it("解析正确的链接", function () {
        expect(resolveNameFromReferUrl(referUrl)).toBe(accountName);
    });
    it("解析正确的链接1", function () {
        expect(resolveNameFromReferUrl(referUrlOne)).toBe(accountName);
    });
});
