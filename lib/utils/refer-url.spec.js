import { getReferUrl, resolveNameFromReferUrl } from "./refer-url";
describe("测试引荐人URL工具函数", function () {
    var testUrlPrefix = "https://www.heereisatesturl.com/syn";
    var accountName = "someAccount";
    var referUrl = "https://www.heereisatesturl.com/syn?refer=someAccount";
    it("生成正确的引荐人链接", function () {
        expect(getReferUrl(testUrlPrefix, accountName)).toBe(referUrl);
    });
    it("解析正确的链接", function () {
        expect(resolveNameFromReferUrl(referUrl)).toBe(accountName);
    });
});
