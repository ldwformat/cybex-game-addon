var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import { ChainFetcher, MallFetcher, BackendFetcher, ReferFetcher, GatewayFetcher } from "./fetcher";
import { config } from "../config";
import PrivateKey from "../../src/cybex/ecc/src/PrivateKey";
describe("Test class ChainFetcher", function () {
    var fetcher;
    beforeAll(function () {
        fetcher = new ChainFetcher("wss://hangzhou.51nebula.com", "https://www.cybexluck.io");
    }, 5000);
    test("Get account \"harley\", which has an account name \"harley\"", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var account;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetcher.fetchAccount("harley")];
                case 1:
                    account = _a.sent();
                    expect(account.name).toEqual("harley");
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Get account \"null-null\", which doesn't exist", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var account;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetcher.fetchAccount("null-null")];
                case 1:
                    account = _a.sent();
                    expect(account).toBeNull();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Get asset \"CYB\", which has an symbol \"CYB\" and id \"1.3.0\"", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var asset;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetcher.fetchAsset("CYB")];
                case 1:
                    asset = _a.sent();
                    expect(asset.symbol).toEqual("CYB");
                    expect(asset.id).toEqual("1.3.0");
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Get asset \"CYBNULL\", which doesn't exist", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var asset;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetcher.fetchAsset("CYBNULL")];
                case 1:
                    asset = _a.sent();
                    expect(asset).toBeNull();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Test class MallFetcher", function () {
    var fetcher;
    beforeAll(function () { return (fetcher = new MallFetcher(config.apiUrl.mallBackend)); });
    it("测试获取所有国家列表", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var allCountries, angola;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetcher.getCountryList()];
                case 1:
                    allCountries = _a.sent();
                    expect(allCountries).toBeInstanceOf(Array);
                    angola = allCountries[0];
                    expect(angola.id).toBe(1);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it("测试获取中国省份列表", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var allCountries, china, provinces, beijing;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetcher.getCountryList()];
                case 1:
                    allCountries = _a.sent();
                    expect(allCountries).toBeInstanceOf(Array);
                    china = allCountries.find(function (country) { return country.country === "中国"; });
                    expect(china).not.toBeUndefined();
                    return [4 /*yield*/, fetcher.getProvinceList(china.id)];
                case 2:
                    provinces = _a.sent();
                    expect(provinces).toBeInstanceOf(Array);
                    beijing = provinces.find(function (province) { return province.id === 192; });
                    expect(beijing).not.toBeUndefined();
                    expect(beijing.provice).toBe("北京市");
                    return [4 /*yield*/, expect(fetcher.getProvinceList("wrongparams")).rejects.toThrow("")];
                case 3:
                    _a.sent();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Test class BackendFetcher", function () {
    var fetcher;
    var accountName = "create-test14";
    var privKey = PrivateKey.fromSeed("create-test14activeqwer1234qwer1234");
    beforeAll(function () { return (fetcher = new BackendFetcher(config.apiUrl.backend)); });
    it("测试增加与查询收货地址", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var fakeAddress, addRes, queryRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeAddress = {
                        loginName: accountName,
                        receiverName: "爱谁谁",
                        email: "example@domain.com",
                        qqNo: "example@domain.com",
                        wechatNo: "example@wechat1415",
                        proviceId: 192,
                        homeAddress: "某市某区某镇某乡某县某街道XXX号" // 收货人地址，使用UTF-8编码方式进行序列化
                    };
                    return [4 /*yield*/, fetcher.addAddress(fakeAddress, privKey)];
                case 1:
                    addRes = _a.sent();
                    expect(addRes).toBe("");
                    return [4 /*yield*/, fetcher.queryAddress(accountName, privKey)[0]];
                case 2:
                    queryRes = _a.sent();
                    expect(queryRes.country).toBe("中国");
                    expect(queryRes.provice).toBe("北京市");
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Test class ReferFetcher", function () {
    var fetcher;
    var accountName = "create-test14";
    var accountNameOne = "create-test12";
    var privKey = PrivateKey.fromSeed("create-test14activeqwer1234qwer1234");
    var privKeyOne = PrivateKey.fromSeed("create-test12activeqwer1234qwer1234");
    beforeAll(function () { return (fetcher = new ReferFetcher(config.apiUrl.referBackend)); });
    it("测试增加引荐人", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var setRefer, _e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setRefer = fetcher.setRefer(accountName, "harley", "cybexbet", privKey);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 5]);
                    return [4 /*yield*/, expect(setRefer).resolves.toBeUndefined()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    _e_1 = _a.sent();
                    return [4 /*yield*/, expect(setRefer).rejects.toThrowError("Referrer already set")];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 5:
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it("测试增加注册引荐人", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var setRefer, _e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setRefer = fetcher.setRegisterRefer(accountNameOne, "harley", "cybexbet", privKeyOne);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 5]);
                    return [4 /*yield*/, expect(setRefer).resolves.toBeUndefined()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    _e_2 = _a.sent();
                    return [4 /*yield*/, expect(setRefer).rejects.toThrowError("Referrer already set")];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 5:
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it("测试获取引荐人", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var refer, referOne;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    refer = fetcher.getRefer(accountName);
                    return [4 /*yield*/, expect(refer).resolves.toMatchObject({
                            referrals: [],
                            referrers: [{ action: "cybexbet", referrer: "harley" }]
                        })];
                case 1:
                    _a.sent();
                    referOne = fetcher.getRefer(accountNameOne);
                    return [4 /*yield*/, expect(referOne).resolves.toMatchObject({
                            referrals: [],
                            referrers: [
                                { action: "cybexbet", referrer: "harley" },
                                {
                                    action: "register",
                                    referrer: "harley"
                                }
                            ]
                        })];
                case 2:
                    _a.sent();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it("测试获取不存在账户的引荐人", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var refer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    refer = fetcher.getRefer(accountName + "NotExists");
                    return [4 /*yield*/, expect(refer).resolves.toMatchObject({
                            referrals: [],
                            referrers: []
                        })];
                case 1:
                    _a.sent();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Test class GatewayFetcher", function () {
    var fetcher;
    var accountName = "create-test14";
    var privKey = PrivateKey.fromSeed("create-test14activeqwer1234qwer1234");
    beforeAll(function () { return (fetcher = new GatewayFetcher(config.apiUrl.gateway)); });
    it("测试获取ETH地址", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var depositRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetcher.getDepositInto(accountName, "ETH")];
                case 1:
                    depositRes = _a.sent();
                    if (depositRes.getDepositAddress !== null) {
                        expect(depositRes.getDepositAddress.accountName).toBe(accountName);
                        expect(depositRes.getDepositAddress.address).toBe("0xf204095acc62c5b65e991729417d170512f9c8c8");
                        expect(depositRes.getDepositAddress.asset).toBe("JADE.ETH");
                        done();
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it("测试获取不存在资产地址", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var depositRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetcher.getDepositInto(accountName, "ETH.NOT.EXISTS")];
                case 1:
                    depositRes = _a.sent();
                    expect(depositRes.getDepositAddress).toBeNull();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it("测试获取不存在用户地址", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var depositRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetcher.getDepositInto("ETH.NOT.EXISTS", "ETH.NOT.EXISTS")];
                case 1:
                    depositRes = _a.sent();
                    expect(depositRes.getDepositAddress).toBeNull();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
