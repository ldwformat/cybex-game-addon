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
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { ChainFetcher, MallFetcher, BackendFetcher, ReferFetcher, GatewayFetcher, FaucetFetcher } from "../utils/fetcher";
import { loginEpic, loginCloseEpic, loginFailedEpic, updateBalanceEpic, authUpdateBalanceEpic, captchaEpic, regPanelCaptchaEpic, authRegEpic, regFailedEpic } from "./auth";
import { loadCountriesEpic, loadProvincesEpic } from "./mall";
import { loadReferInfoEpic, addReferEpic, addReferAfterLoginEpic } from "./refer";
import { loadDepsoitInfoEpic, loadDpstAfterSelAssetEpic, loadGatewayInfoEpic } from "./gateway";
import { CybexAssistant } from "../utils/cybex-assistant";
import { WsConnection } from "../utils/connect";
import { EventEmitter } from "events";
import { notifierEpic } from "./core.effects";
import { rootReducer } from "./core.reducers";
export * from "./core.models";
var loggerMiddleware = createLogger();
var rootEpic = combineEpics(loginEpic, regPanelCaptchaEpic, authRegEpic, captchaEpic, regFailedEpic, loginCloseEpic, loginFailedEpic, loadCountriesEpic, loadProvincesEpic, loadReferInfoEpic, loadDepsoitInfoEpic, loadDpstAfterSelAssetEpic, authUpdateBalanceEpic, updateBalanceEpic, loadGatewayInfoEpic, addReferEpic, addReferAfterLoginEpic, notifierEpic);
export var configureStore = function (config) { return function (preloadState) { return __awaiter(_this, void 0, void 0, function () {
    var _a, cybexWs, cybexHttpServer, mallBackend, referBackend, faucet, gateway, backend, wsConnect, notifier, toolset, epicMiddleware, store;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = config.apiUrl, cybexWs = _a.cybexWs, cybexHttpServer = _a.cybexHttpServer, mallBackend = _a.mallBackend, referBackend = _a.referBackend, faucet = _a.faucet, gateway = _a.gateway, backend = _a.backend;
                wsConnect = new WsConnection({ url: cybexWs });
                notifier = new EventEmitter();
                return [4 /*yield*/, wsConnect.connect()];
            case 1:
                _b.sent();
                toolset = {
                    fetcher: new ChainFetcher(cybexWs, cybexHttpServer),
                    faucet: new FaucetFetcher(faucet),
                    mallFetcher: new MallFetcher(mallBackend),
                    gatewayFetcher: new GatewayFetcher(gateway),
                    backendFetcher: new BackendFetcher(backend),
                    referFetcher: new ReferFetcher(referBackend),
                    chainAssisant: new CybexAssistant(wsConnect),
                    notifier: notifier
                };
                epicMiddleware = createEpicMiddleware({
                    dependencies: toolset
                });
                store = createStore(rootReducer, preloadState, applyMiddleware(loggerMiddleware, epicMiddleware));
                epicMiddleware.run(rootEpic);
                return [2 /*return*/, { store: store, notifier: notifier, toolset: toolset }];
        }
    });
}); }; };
