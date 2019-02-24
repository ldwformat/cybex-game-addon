var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import assert from "assert";
import { EventEmitter } from "events";
import ReconnectingWebSocket from "reconnecting-websocket";
var DEFAULT_OPTIONS = {
    apis: ["database", "history", "network_broadcast"]
};
var WsConnection = /** @class */ (function (_super) {
    __extends(WsConnection, _super);
    function WsConnection(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this._callId = 1;
        _this.apiIds = {};
        _this.msgHandler = function (e) {
            // console.debug("Msg: ", e.data);
            try {
                var msg = JSON.parse(e.data);
                if ("result" in msg) {
                    _this.emit(WsConnection.getEventNameById(msg.id), msg.result);
                    _this.emit(WsConnection.EVENT_RESULT, msg);
                }
                else if ("method" in msg) {
                    _this.emit(WsConnection.getEventNameById(msg.params[0]), msg.params[1]);
                    _this.emit(WsConnection.EVENT_NOTICE, msg);
                }
                else if ("error" in msg) {
                    _this.emit(WsConnection.getRejectEventNameById(msg.id), msg.error);
                }
            }
            catch (e) { }
        };
        _this.api = function (api) { return function (method) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var id, call, callStr;
                var _this = this;
                return __generator(this, function (_a) {
                    assert(method === "login" || this.apiIds[api]);
                    id = this.callId;
                    if (WsConnection.CallbackMethods.has(method)) {
                        params.unshift(id);
                    }
                    call = {
                        id: id,
                        method: "call",
                        params: [this.apiIds[api] || 1, method, params]
                    };
                    callStr = JSON.stringify(call);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (_this.rws && _this.rws.readyState === ReconnectingWebSocket.OPEN) {
                                // console.debug("CALLSTR: ", callStr);
                                _this.rws.send(callStr);
                                var ev_1 = WsConnection.getEventNameById(id);
                                var rejectEv_1 = WsConnection.getRejectEventNameById(id);
                                var resHandle_1;
                                var rejectHandle_1;
                                resHandle_1 = function (result) {
                                    resolve(result);
                                    _this.removeListener(WsConnection.EVENT_DISCONNECT, rejectHandle_1);
                                };
                                rejectHandle_1 = function (err) {
                                    reject(err || new Error("Connection error, request failed"));
                                    _this.removeListener(ev_1, resHandle_1);
                                    _this.removeListener(rejectEv_1, rejectHandle_1);
                                };
                                _this.once(ev_1, resHandle_1);
                                _this.once(WsConnection.EVENT_DISCONNECT, rejectHandle_1);
                                _this.once(rejectEv_1, function (err) {
                                    _this.removeListener(WsConnection.EVENT_DISCONNECT, rejectHandle_1);
                                    rejectHandle_1(err);
                                });
                            }
                            else {
                                throw Error("Connection is not opened yet");
                            }
                        })];
                });
            });
        }; };
        _this.setMaxListeners(2000);
        _this.options = __assign({}, DEFAULT_OPTIONS, options);
        return _this;
    }
    Object.defineProperty(WsConnection.prototype, "callId", {
        // self-increased ID
        get: function () {
            return this._callId++;
        },
        enumerable: true,
        configurable: true
    });
    WsConnection.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _openEvent;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert(this.options.url, "Ws url must be provided");
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.rws = new WebSocket(
                                // this.rws = new ReconnectingWebSocket(
                                _this.options.url, _this.options.protocol
                                // this.options
                                );
                                console.debug("WsConnect Init");
                                _this.rws.addEventListener("open", function (e) {
                                    console.debug("WsConnect Open");
                                    resolve(e);
                                });
                                _this.rws.addEventListener("close", function (e) {
                                    _this.emit(WsConnection.EVENT_DISCONNECT, e);
                                });
                                _this.rws.addEventListener("message", _this.msgHandler);
                            })];
                    case 1:
                        _openEvent = _a.sent();
                        return [4 /*yield*/, this.login()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WsConnection.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var apis, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        assert(this.rws && this.rws.readyState === ReconnectingWebSocket.OPEN);
                        apis = this.options.apis;
                        if (!apis) {
                            throw Error("Apis Error");
                        }
                        _a = this.apiIds;
                        _b = "login";
                        return [4 /*yield*/, this.api("login")("login", "", "")];
                    case 1:
                        _a[_b] = _c.sent();
                        return [2 /*return*/, Promise.all((this.options.apis || []).map(function (apiType) { return __awaiter(_this, void 0, void 0, function () {
                                var apiId;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.api("login")(apiType)];
                                        case 1:
                                            apiId = _a.sent();
                                            this.apiIds[apiType] = apiId;
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                }
            });
        });
    };
    WsConnection.EVENT_DISCONNECT = "disconnect";
    WsConnection.EVENT_RESULT = "result";
    WsConnection.EVENT_NOTICE = "notice";
    WsConnection.CallbackMethods = new Set(["broadcast_transaction_with_callback"]);
    WsConnection.getEventNameById = function (id) { return "#EVENT_" + id; };
    WsConnection.getRejectEventNameById = function (id) {
        return "#EVENT_REJECT_" + id;
    };
    return WsConnection;
}(EventEmitter));
export { WsConnection };
