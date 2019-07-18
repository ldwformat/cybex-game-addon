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
import assert from "assert";
import { calcAmount } from "./calc";
import { PrivateKey, Aes } from "../cybex/ecc";
import { TransactionHelper, ChainTypes } from "../cybex/chain";
import { ops } from "../cybex/serializer";
import Transaction from "./transaction";
var CybexAssistant = /** @class */ (function () {
    function CybexAssistant(wsConnect) {
        var _this = this;
        this.wsConnect = wsConnect;
        this.simpleCache = {};
        this.genFetcher = function (api, cache) {
            if (cache === void 0) { cache = false; }
            return function (method) {
                var params = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    params[_i - 1] = arguments[_i];
                }
                return __awaiter(_this, void 0, void 0, function () {
                    var result;
                    var _this = this;
                    return __generator(this, function (_a) {
                        result = this.simpleCache[CybexAssistant.cacheKey(method, params)];
                        if (result && cache) {
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var counter = 0;
                                var impl = function () {
                                    _this.wsConnect
                                        .api(api).apply(void 0, [method].concat(params)).then(function (res) {
                                        if (cache) {
                                            _this.simpleCache[CybexAssistant.cacheKey(method, params)] = res;
                                        }
                                        resolve(res);
                                    })
                                        .catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(counter++ < 5 &&
                                                        error.message &&
                                                        /Connection/i.test(error.message))) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, this.wsConnect.connect()];
                                                case 1:
                                                    _a.sent();
                                                    impl();
                                                    return [3 /*break*/, 3];
                                                case 2:
                                                    console.warn(error, method, params);
                                                    reject(error);
                                                    _a.label = 3;
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                };
                                impl();
                            })];
                    });
                });
            };
        };
        this.db_api = this.genFetcher("database", false);
        this.db_api_cached = this.genFetcher("database", true);
    }
    CybexAssistant.cacheKey = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return JSON.stringify(args);
    };
    CybexAssistant.isObjectID = function (idOrNot) {
        return /^\d+\.\d+\.\d+$/.test(idOrNot);
    };
    CybexAssistant.encodeMemo = function (memoContent, privKey, toPubKeyStr) {
        var nonce = TransactionHelper.unique_nonce_uint64();
        return {
            from: privKey.toPublicKey().toPublicKeyString(),
            to: toPubKeyStr,
            nonce: nonce,
            message: Aes.encrypt_with_checksum(privKey, toPubKeyStr, nonce, Buffer.from(memoContent, "utf-8"))
        };
    };
    CybexAssistant.prototype.transfer = function (_a, keyStore) {
        var from = _a.from, to = _a.to, asset = _a.asset, value = _a.value, memo = _a.memo, fee = _a.fee;
        return __awaiter(this, void 0, void 0, function () {
            var _b, fromAccount, toAccount, _c, fromID, toID, _d, assetID, assetPrecision, assetAmount, memoContent, memoPrivKey, key;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        assert(keyStore, "No Login");
                        return [4 /*yield*/, this.getAccounts(from, to).then(function (accounts) {
                                assert(accounts.every(function (acc) { return !!acc; }));
                                return accounts;
                            })];
                    case 1:
                        _b = _e.sent(), fromAccount = _b[0], toAccount = _b[1];
                        _c = [fromAccount, toAccount].map(function (account) { return account.id; }), fromID = _c[0], toID = _c[1];
                        return [4 /*yield*/, this.getAssets(asset).then(function (assets) {
                                var asset = assets[0];
                                if (asset === null) {
                                    throw new Error("No Asset");
                                }
                                return [asset.id, asset.precision];
                            })];
                    case 2:
                        _d = _e.sent(), assetID = _d[0], assetPrecision = _d[1];
                        assetAmount = calcAmount(value, assetPrecision);
                        if (memo) {
                            memoPrivKey = keyStore.getPrivByPubStr(fromAccount.options.memo_key);
                            if (!memoPrivKey || !memoPrivKey.privKey) {
                                throw new Error("Memo key is missing!");
                            }
                            memoContent = CybexAssistant.encodeMemo(memo, memoPrivKey.privKey, toAccount.options.memo_key);
                        }
                        key = keyStore.keys["active"].privKey;
                        if (!key) {
                            throw new Error("Missing active key");
                        }
                        return [2 /*return*/, this.performTransaction("transfer", {
                                from: fromID,
                                to: toID,
                                fee: fee,
                                amount: {
                                    asset_id: assetID,
                                    amount: assetAmount
                                },
                                memo: memoContent
                            }, key)];
                }
            });
        });
    };
    CybexAssistant.prototype.getFakeTransferFee = function (asset, memoStr) {
        if (asset === void 0) { asset = "1.3.0"; }
        return __awaiter(this, void 0, void 0, function () {
            var _asset, assetID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAssets(asset)];
                    case 1:
                        _asset = (_a.sent())[0];
                        assetID = _asset && _asset.id;
                        return [2 /*return*/, this.getFeeOfOp("transfer", ops.transfer.toObject({
                                from: "1.2.1",
                                to: "1.2.1",
                                fee: {
                                    asset_id: assetID,
                                    amount: 0
                                },
                                amount: {
                                    asset_id: assetID,
                                    amount: 0
                                },
                                memo: memoStr
                                    ? CybexAssistant.encodeMemo(memoStr, PrivateKey.fromSeed("0000000000000000000000"), PrivateKey.fromSeed("0000000000000000000000")
                                        .toPublicKey()
                                        .toString())
                                    : undefined
                            }), assetID)];
                }
            });
        });
    };
    CybexAssistant.prototype.getFeeOfOp = function (opNameOrID, op, asset) {
        if (asset === void 0) { asset = "1.3.0"; }
        return __awaiter(this, void 0, void 0, function () {
            var _asset, assetID, opID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAssets(asset)];
                    case 1:
                        _asset = (_a.sent())[0];
                        assetID = _asset && _asset.id;
                        opID = typeof opNameOrID !== "number"
                            ? ChainTypes.operations[opNameOrID]
                            : opNameOrID;
                        return [4 /*yield*/, this.db_api("get_required_fees", [[opID, op]], assetID)];
                    case 2: return [2 /*return*/, (_a.sent())[0]];
                }
            });
        });
    };
    CybexAssistant.prototype.performTransaction = function (opName, op, privKey) {
        return __awaiter(this, void 0, void 0, function () {
            var tr, retry, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tr = new Transaction(this.wsConnect);
                        tr.add_type_operation(opName, op);
                        return [4 /*yield*/, tr.update_head_block()];
                    case 1:
                        _a.sent();
                        if (!(op && op.fee && !op.fee.amount)) return [3 /*break*/, 3];
                        return [4 /*yield*/, tr.set_required_fees()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, tr.update_head_block()];
                    case 4:
                        _a.sent();
                        tr.add_signer(privKey);
                        retry = 0;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 11]);
                        return [4 /*yield*/, tr.broadcast()];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        e_1 = _a.sent();
                        if (!(retry++ === 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.wsConnect.connect()];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, tr.broadcast()];
                    case 9: return [2 /*return*/, e_1];
                    case 10: return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    // FIXME: 查询动态数据时应不可缓存
    CybexAssistant.prototype.getObjects = function () {
        var objectIDs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objectIDs[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.db_api_cached("get_objects", objectIDs)];
            });
        });
    };
    CybexAssistant.prototype.getAssets = function () {
        var symbolOrIDs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            symbolOrIDs[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, CybexAssistant.isObjectID(symbolOrIDs[0])
                        ? this.getObjects.apply(this, symbolOrIDs) : this.db_api_cached("lookup_asset_symbols", symbolOrIDs)];
            });
        });
    };
    CybexAssistant.prototype.getAccounts = function () {
        var nameOrIDs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nameOrIDs[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, CybexAssistant.isObjectID(nameOrIDs[0])
                        ? this.getObjects.apply(this, nameOrIDs) : this.db_api_cached("lookup_account_names", nameOrIDs)];
            });
        });
    };
    return CybexAssistant;
}());
export { CybexAssistant };
