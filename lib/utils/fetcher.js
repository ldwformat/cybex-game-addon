var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import fetch from "isomorphic-fetch";
import { WsConnection } from "./connect";
import { resolvePath } from "./path";
import Signature from "../../src/cybex/ecc/src/signature";
import { query_address, set_address, set_refer } from "../../src/cybex/serializer/src/operations";
var simpleCache = {};
var getKey = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return JSON.stringify(args);
};
var ws;
export var fetchWithRetry = function (url, method) {
    var params = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        params[_i - 2] = arguments[_i];
    }
    return __awaiter(_this, void 0, void 0, function () {
        var result, wss, counter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = simpleCache[getKey(method, params)];
                    if (result) {
                        return [2 /*return*/, result];
                    }
                    if (!!ws) return [3 /*break*/, 2];
                    wss = new WsConnection({
                        url: url
                    });
                    return [4 /*yield*/, wss.connect()];
                case 1:
                    _a.sent();
                    ws = wss;
                    _a.label = 2;
                case 2:
                    counter = 0;
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            function impl() {
                                var _this = this;
                                ws.api("database").apply(void 0, [method].concat(params)).then(function (res) {
                                    simpleCache[getKey(method, params)] = res;
                                    resolve(res);
                                })
                                    .catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                if (!(counter++ < 5)) return [3 /*break*/, 3];
                                                _a = ws;
                                                if (!_a) return [3 /*break*/, 2];
                                                return [4 /*yield*/, ws.connect()];
                                            case 1:
                                                _a = (_b.sent());
                                                _b.label = 2;
                                            case 2:
                                                _a;
                                                impl();
                                                return [3 /*break*/, 4];
                                            case 3:
                                                console.warn(error, method, params);
                                                reject(error);
                                                _b.label = 4;
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }
                            impl();
                        })];
                case 3: return [2 /*return*/, (_a.sent())];
            }
        });
    });
};
var getAccountFromChain = function (url) { return function (accountName) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, fetchWithRetry(url, "get_account_by_name", accountName)];
}); }); }; };
var getAccountFromBackend = function (url) { return function (accountName) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, fetch(url + "/api/cybex/account/" + accountName)
                .then(function (res) { return res.json(); })
                .then(function (res) { return (res.code ? null : res); })
                .catch(function (err) {
                console.error(err);
                return null;
            })];
    });
}); }; };
var getAssetFromBackend = function (url) { return function (assetName) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, fetch(url + "/api/cybex/asset/" + assetName)
                .then(function (res) { return res.json(); })
                .then(function (res) { return (res.code ? null : res); })
                .catch(function (err) {
                console.error(err);
                return null;
            })];
    });
}); }; };
var getAssetFromChain = function (url) { return function (assetName) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, fetchWithRetry(url, "lookup_asset_symbols", [assetName]).then(function (res) { return res[0]; })];
}); }); }; };
var combineFetchWithCache = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    var cache = {};
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () {
            var cacheKey, res, _a, fns_1, fn, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cacheKey = getKey(args);
                        if (cacheKey in cache) {
                            return [2 /*return*/, cache[cacheKey]];
                        }
                        res = null;
                        _a = 0, fns_1 = fns;
                        _b.label = 1;
                    case 1:
                        if (!(_a < fns_1.length)) return [3 /*break*/, 6];
                        fn = fns_1[_a];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        if (res) {
                            cache[cacheKey] = res;
                            return [3 /*break*/, 6];
                        }
                        return [4 /*yield*/, fn.apply(void 0, args)];
                    case 3:
                        res = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5:
                        _a++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, res];
                }
            });
        });
    };
};
var combineFetch = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () {
            var res, _a, fns_2, fn, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        res = null;
                        _a = 0, fns_2 = fns;
                        _b.label = 1;
                    case 1:
                        if (!(_a < fns_2.length)) return [3 /*break*/, 6];
                        fn = fns_2[_a];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        if (res) {
                            return [3 /*break*/, 6];
                        }
                        return [4 /*yield*/, fn.apply(void 0, args)];
                    case 3:
                        res = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _b.sent();
                        console.error(e_2);
                        return [3 /*break*/, 5];
                    case 5:
                        _a++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, res];
                }
            });
        });
    };
};
var ChainFetcher = /** @class */ (function () {
    function ChainFetcher(wsUrl, proxyServiceUrl) {
        this.wsUrl = wsUrl;
        this.proxyServiceUrl = proxyServiceUrl;
        this.fetchAccount = combineFetchWithCache(getAccountFromChain(this.wsUrl), getAccountFromBackend(this.proxyServiceUrl));
        this.fetchAsset = combineFetchWithCache(getAssetFromChain(this.wsUrl), getAssetFromBackend(this.proxyServiceUrl));
    }
    return ChainFetcher;
}());
export { ChainFetcher };
var MallFetcher = /** @class */ (function () {
    function MallFetcher(mallBackend) {
        this.mallBackend = mallBackend;
    }
    MallFetcher.prototype.fetch = function (path, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fetch(resolvePath(this.mallBackend, path), {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "post",
                        body: JSON.stringify(body)
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (res) {
                        if (res.returnCode === 10000) {
                            return res.data;
                        }
                        throw new Error(res.returnMsg);
                    })];
            });
        });
    };
    MallFetcher.prototype.getCountryList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch("allCountrys")];
            });
        });
    };
    MallFetcher.prototype.getProvinceList = function (countryID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch("countryAreas/" + countryID)];
            });
        });
    };
    return MallFetcher;
}());
export { MallFetcher };
var BackendFetcher = /** @class */ (function () {
    function BackendFetcher(backendUrl) {
        this.backendUrl = backendUrl;
    }
    BackendFetcher.signOperation = function (originOp, serializer, key, expiration) {
        if (expiration === void 0) { expiration = 30 * 1000; }
        var op = __assign({}, originOp, { expiration: originOp["expiration"] || Math.ceil((Date.now() + expiration) / 1000) });
        var opToBuffer = serializer.fromObject(op);
        var buffer = serializer.toBuffer(opToBuffer);
        var signature = Signature.signBuffer(buffer, key).toHex();
        op.signature = signature;
        return op;
    };
    BackendFetcher.prototype.fetch = function (path, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fetch(resolvePath(this.backendUrl, path), {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "post",
                        body: JSON.stringify(body)
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (res) {
                        console.debug("Fetch Res: ", res);
                        if (res.success) {
                            return res.data;
                        }
                        throw new Error(res.reason);
                    })];
            });
        });
    };
    BackendFetcher.prototype.queryAddress = function (loginName, key) {
        return __awaiter(this, void 0, void 0, function () {
            var op;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        op = BackendFetcher.signOperation({
                            loginName: loginName
                        }, query_address, key);
                        op.method = "query";
                        return [4 /*yield*/, this.fetch("user/", op)];
                    case 1: return [2 /*return*/, [_a.sent()]];
                }
            });
        });
    };
    BackendFetcher.prototype.addAddress = function (addressConfig, key) {
        return __awaiter(this, void 0, void 0, function () {
            var op;
            return __generator(this, function (_a) {
                op = BackendFetcher.signOperation(addressConfig, set_address, key);
                op.method = "create";
                return [2 /*return*/, this.fetch("user/", op)];
            });
        });
    };
    return BackendFetcher;
}());
export { BackendFetcher };
var ReferFetcher = /** @class */ (function () {
    function ReferFetcher(referBackendUrl) {
        var _this = this;
        this.referBackendUrl = referBackendUrl;
        this.setRefer = function (account, referrer, action, key) { return __awaiter(_this, void 0, void 0, function () {
            var op;
            return __generator(this, function (_a) {
                op = ReferFetcher.signOperation({ account: account, action: action, referrer: referrer }, set_refer, key);
                return [2 /*return*/, this.post("refer/", op)];
            });
        }); };
        this.setRegisterRefer = function (account, referrer, action, key) { return __awaiter(_this, void 0, void 0, function () {
            var op;
            return __generator(this, function (_a) {
                op = ReferFetcher.signOperation({ account: account, action: "register|" + action, referrer: referrer }, set_refer, key);
                return [2 /*return*/, this.post("refer/", op)];
            });
        }); };
        this.getRefer = function (account) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch("refer/?account=" + account + "&&action=all")];
            });
        }); };
    }
    ReferFetcher.signOperation = function (originOp, serializer, key, expiration) {
        if (expiration === void 0) { expiration = 300 * 1000; }
        var op = __assign({}, originOp, { expiration: originOp["expiration"] || Math.ceil((Date.now() + expiration) / 1000) });
        var opToBuffer = serializer.fromObject(op);
        var buffer = serializer.toBuffer(opToBuffer);
        var signature = Signature.signBuffer(buffer, key).toHex();
        op.signature = signature;
        return op;
    };
    ReferFetcher.prototype.post = function (path, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fetch(resolvePath(this.referBackendUrl, path), {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "post",
                        body: JSON.stringify(body)
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (res) {
                        console.debug("Fetch Res: ", res, "Request: ", JSON.stringify(body));
                        if (res.success) {
                            return res.data;
                        }
                        throw new Error(res.reason);
                    })];
            });
        });
    };
    ReferFetcher.prototype.fetch = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fetch(resolvePath(this.referBackendUrl, path))
                        .then(function (res) { return res.json(); })
                        .then(function (res) {
                        if (res.success) {
                            return res.result;
                        }
                        throw new Error(res.reason);
                    })];
            });
        });
    };
    return ReferFetcher;
}());
export { ReferFetcher };
var GatewayFetcher = /** @class */ (function () {
    function GatewayFetcher(gatewayUrl) {
        this.gatewayUrl = gatewayUrl;
    }
    GatewayFetcher.prototype.fetch = function (path, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fetch(resolvePath(this.gatewayUrl, path), {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "post",
                        body: JSON.stringify(body)
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (res) {
                        if (res.data) {
                            return res.data;
                        }
                        throw new Error("Fetch Gateway Error");
                    })];
            });
        });
    };
    GatewayFetcher.prototype.getCoinList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fetch("https://gateway-query.cybex.io/public/coin-info?currency=1&isDisabled=1&asset=1").then(function (res) { return res.json(); })];
            });
        });
    };
    GatewayFetcher.prototype.getDepositInto = function (accountName, coinType) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                body = {
                    operationName: "GetAddress",
                    variables: { accountName: accountName, asset: coinType },
                    query: "query GetAddress($accountName: String!, $asset: String!) {\n  getDepositAddress(accountName: $accountName, asset: $asset) {\n    address\n    accountName\n    asset\n    type\n    createAt\n    projectInfo {\n      projectName\n      logoUrl\n      contractAddress\n      contractExplorerUrl\n      __typename\n    }\n    __typename\n  }\n}\n"
                };
                return [2 /*return*/, this.fetch("gateway", body)];
            });
        });
    };
    return GatewayFetcher;
}());
export { GatewayFetcher };
