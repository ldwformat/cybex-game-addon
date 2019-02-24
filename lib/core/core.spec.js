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
import { configureStore } from ".";
import { authLoginSuccess, authLogout, authLogin } from "./auth";
import { KeyStore } from "./auth/keystore/keystore";
import { delay } from "../utils";
import { mallLoadCountries, mallLoadProvinces } from "./mall";
import { selectCountryList, selectMallPrvsByCountryID } from "./mall/mall.selectors";
import { config } from "./../config";
describe("核心状态Store", function () {
    it("创建Store", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var store, state;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, configureStore(config)()];
                case 1:
                    store = _a.sent();
                    state = store.getState();
                    expect(state.auth.isAuthed).toStrictEqual(false);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("认证测试", function () {
    var loginAccountName = "create-test14";
    var loginAccountPassword = "qwer1234qwer1234";
    var loginResult = {
        accountName: loginAccountName,
        account: null,
        keyStore: new KeyStore()
    };
    var store;
    beforeEach(function (done) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, configureStore(config)()];
                case 1:
                    store = _a.sent();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Login登录, Logout登出", function () {
        store.dispatch(authLoginSuccess(loginResult));
        var stateAfterLogin = store.getState();
        expect(stateAfterLogin.auth.isAuthed).toStrictEqual(true);
        expect(stateAfterLogin.auth.accountName).toStrictEqual(loginAccountName);
        store.dispatch(authLogout());
        var stateAfterLogout = store.getState();
        expect(stateAfterLogout.auth.isAuthed).toStrictEqual(false);
        expect(stateAfterLogout.auth.keyStore).toBeNull();
        expect(stateAfterLogout.auth.accountName).toBeNull();
    });
    it("Login Effects Failed", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var stateAfterLogin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store.dispatch(authLogin({
                        accountName: loginAccountName + "Null",
                        password: loginAccountPassword
                    }));
                    return [4 /*yield*/, delay(1000)];
                case 1:
                    _a.sent();
                    stateAfterLogin = store.getState();
                    console.debug("State: ", stateAfterLogin);
                    expect(stateAfterLogin.auth.isAuthed).toStrictEqual(false);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Login Effects Success", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var stateAfterLogin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store.dispatch(authLogin({
                        accountName: loginAccountName,
                        password: loginAccountPassword
                    }));
                    return [4 /*yield*/, delay(1000)];
                case 1:
                    _a.sent();
                    stateAfterLogin = store.getState();
                    expect(stateAfterLogin.auth.isAuthed).toStrictEqual(true);
                    expect(stateAfterLogin.auth.accountName).toStrictEqual(loginAccountName);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Mall测试", function () {
    var store;
    beforeEach(function (done) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, configureStore(config)()];
                case 1:
                    store = _a.sent();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it("测试更新国家列表", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var stateAfterCountry, COUNTRY_CHINA, stateAfterState, selectChinaPrvs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store.dispatch(mallLoadCountries());
                    return [4 /*yield*/, delay(1000)];
                case 1:
                    _a.sent();
                    stateAfterCountry = store.getState();
                    expect(selectCountryList(stateAfterCountry)).toBeInstanceOf(Array);
                    expect(selectCountryList(stateAfterCountry).length).toBeGreaterThan(0);
                    COUNTRY_CHINA = 37;
                    store.dispatch(mallLoadProvinces(COUNTRY_CHINA));
                    return [4 /*yield*/, delay(1000)];
                case 2:
                    _a.sent();
                    stateAfterState = store.getState();
                    selectChinaPrvs = selectMallPrvsByCountryID(COUNTRY_CHINA)(stateAfterState);
                    expect(selectChinaPrvs).toBeInstanceOf(Array);
                    expect(selectChinaPrvs.length).toBeGreaterThan(0);
                    expect(selectChinaPrvs[0].id).toBe(192);
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, 6000);
});
describe("LoginRefer引荐人测试", function () {
    var store;
    var loginAccountName = "create-test2";
    var loginAccountPassword = "qwer1234qwer1234";
    beforeAll(function (done) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, configureStore(config)({ game: "cybexbet" })];
                case 1:
                    store = _a.sent();
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it("测试登录增加引荐人", function (done) { return __awaiter(_this, void 0, void 0, function () {
        var currentState, stateAfterLogin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentState = store.getState();
                    store.dispatch(authLogin({
                        accountName: loginAccountName,
                        password: loginAccountPassword,
                        refer: {
                            action: currentState.game,
                            referrer: "harley",
                            isRegister: false
                        }
                    }));
                    return [4 /*yield*/, delay(5000)];
                case 1:
                    _a.sent();
                    stateAfterLogin = store.getState();
                    expect(stateAfterLogin.refer).toMatchObject({
                        referrals: [],
                        referrers: [{ action: "cybexbet", referrer: "harley" }]
                    });
                    done();
                    return [2 /*return*/];
            }
        });
    }); }, 10 * 1000);
});
