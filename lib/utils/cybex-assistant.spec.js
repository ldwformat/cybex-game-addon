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
import { WsConnection } from "./connect";
import { CybexAssistant } from "./cybex-assistant";
import { KeyStore } from "../core/auth/keystore/keystore";
import { PrivateKey } from "../cybex/ecc";
var NORMAL_TIMEOUT = 30 * 1000;
describe("CybexAssistant类测试", function () {
    var ws;
    var cybex;
    beforeAll(function (done) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ws = new WsConnection({
                        url: "wss://shenzhen.51nebula.com"
                    });
                    return [4 /*yield*/, ws.connect()];
                case 1:
                    _a.sent();
                    cybex = new CybexAssistant(ws);
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, NORMAL_TIMEOUT);
    test("查询全局参数", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cybex.getObjects("2.0.0")];
                case 1:
                    res = _a.sent();
                    expect(res).toBeInstanceOf(Array);
                    expect(res[0].id).toBe("2.0.0");
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, NORMAL_TIMEOUT);
    test("查询获取资产", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var assetID, assetSymbol, resByID, resBySymbol;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    assetID = "1.3.0";
                    assetSymbol = "CYB";
                    return [4 /*yield*/, cybex.getAssets(assetID)];
                case 1:
                    resByID = _a.sent();
                    expect(resByID).toBeInstanceOf(Array);
                    expect(resByID[0].symbol).toBe(assetSymbol);
                    return [4 /*yield*/, cybex.getAssets(assetID)];
                case 2:
                    resBySymbol = _a.sent();
                    expect(resBySymbol).toBeInstanceOf(Array);
                    expect(resBySymbol[0].id).toBe(assetID);
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, NORMAL_TIMEOUT);
    test("查询获取用户信息", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var accountID, accountName, resByID, resBySymbol, accountIDFake, accountNameFake, resByIDFake, resBySymbolFake;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountID = "1.2.0";
                    accountName = "committee-account";
                    return [4 /*yield*/, cybex.getAccounts(accountID)];
                case 1:
                    resByID = _a.sent();
                    expect(resByID).toBeInstanceOf(Array);
                    expect(resByID[0].name).toBe(accountName);
                    return [4 /*yield*/, cybex.getAccounts(accountName)];
                case 2:
                    resBySymbol = _a.sent();
                    expect(resBySymbol).toBeInstanceOf(Array);
                    expect(resBySymbol[0].id).toBe(accountID);
                    accountIDFake = "1.2.9999999";
                    accountNameFake = "null-exists-account";
                    return [4 /*yield*/, cybex.getAccounts(accountID, accountIDFake)];
                case 3:
                    resByIDFake = _a.sent();
                    expect(resByIDFake).toBeInstanceOf(Array);
                    expect(resByIDFake[0].name).toBe(accountName);
                    expect(resByIDFake[1]).toBeNull();
                    return [4 /*yield*/, cybex.getAccounts(accountName, accountNameFake)];
                case 4:
                    resBySymbolFake = _a.sent();
                    expect(resBySymbolFake).toBeInstanceOf(Array);
                    expect(resBySymbolFake[0].id).toBe(accountID);
                    expect(resBySymbolFake[1]).toBeNull();
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, NORMAL_TIMEOUT);
    test("简单转账测试用户信息", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var accountName, seed, keyStore, accounts, account;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountName = "create-test";
                    seed = "create-testownerqwer1234qwer1234";
                    keyStore = new KeyStore([PrivateKey.fromSeed(seed)]);
                    return [4 /*yield*/, cybex.getAccounts(accountName)];
                case 1:
                    accounts = _a.sent();
                    account = accounts[0];
                    expect(account.name).toBe(accountName);
                    keyStore.loginAccount(account);
                    return [4 /*yield*/, cybex.transfer({
                            from: accountName,
                            to: "ldw-format",
                            value: 0.00001,
                            asset: "CYB",
                            memo: "这是一个测试消息"
                        }, keyStore)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, cybex.transfer({
                            from: "1.2.346",
                            to: "1.2.139",
                            value: 0.00002,
                            asset: "CYB",
                            memo: "这是另一个测试消息"
                        }, keyStore)];
                case 3:
                    _a.sent();
                    // TODO: 增加发送细节验证
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, NORMAL_TIMEOUT);
    test("Fake Transfer Fee", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var withoutMemoRes, withMemoRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cybex.getFakeTransferFee("1.3.2")];
                case 1:
                    withoutMemoRes = _a.sent();
                    expect(withoutMemoRes.amount).toBe(10);
                    expect(withoutMemoRes.asset_id).toBe("1.3.2");
                    return [4 /*yield*/, cybex.getFakeTransferFee("1.3.2", "hereisafakememo")];
                case 2:
                    withMemoRes = _a.sent();
                    expect(withMemoRes.amount).toBeGreaterThan(10);
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, NORMAL_TIMEOUT);
});
