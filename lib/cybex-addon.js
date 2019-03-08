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
import ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./core";
import { config as defaultConfig } from "./config";
import { EVENT_ACTION } from "./core/modes";
import { authShowModal, authLogout } from "./core/auth";
import { Notifier } from "./components/notifier";
import { SnackbarProvider } from "notistack";
import { createMuiTheme, MuiThemeProvider, createGenerateClassName } from "@material-ui/core";
import JssProvider from "react-jss/lib/JssProvider";
import { SheetsRegistry } from "jss";
import { ToolsetContext } from "./providers/toolset";
import { InviteBtn } from "./components/invite-btn";
import { merge } from "lodash";
function createPageContext() {
    return {
        sheetsManager: new Map(),
        sheetsRegistry: new SheetsRegistry(),
        generateClassName: createGenerateClassName()
    };
}
import { i18n } from "./providers/i18n";
export function getPageContext() {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process.browser) {
        try {
            return createPageContext();
        }
        catch (e) {
            console.error(e);
        }
    }
    // Reuse context on the client-side.
    if (!global.__INIT_MATERIAL_UI__) {
        global.__INIT_MATERIAL_UI__ = createPageContext();
    }
    return global.__INIT_MATERIAL_UI__;
}
var CybexAddon = /** @class */ (function () {
    function CybexAddon(config, pageContext) {
        if (config === void 0) { config = defaultConfig; }
        if (pageContext === void 0) { pageContext = getPageContext(); }
        var _this = this;
        this.pageContext = pageContext;
        this.i18n = i18n;
        this.theme = createMuiTheme({
            typography: {
                useNextVariants: true
            },
            palette: {
                primary: {
                    main: "rgb(255,98,165)"
                },
                secondary: {
                    main: "rgb(255,155,85)"
                }
            }
        });
        this.store = null;
        this.notifier = null;
        this.toolset = null;
        this.patchPage = function (Page, resolve, rootContainer) {
            if (resolve === void 0) { resolve = function () { return void 0; }; }
            if (rootContainer === void 0) { rootContainer = document.getElementById(CybexAddon.OVERLAY_CONTAINER_ID); }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!rootContainer) {
                        rootContainer = document.createElement("div");
                        rootContainer.id = CybexAddon.OVERLAY_CONTAINER_ID;
                        document.body.appendChild(rootContainer);
                    }
                    return [2 /*return*/, this.bootstrap(Page)(rootContainer, resolve)];
                });
            });
        };
        this.bootstrap = function (Page, props) {
            if (props === void 0) { props = {}; }
            return function (rootElement, resolve) {
                if (resolve === void 0) { resolve = function () { return void 0; }; }
                return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c, _d, _e, _f, _g;
                    return __generator(this, function (_h) {
                        switch (_h.label) {
                            case 0:
                                _b = (_a = ReactDOM).render;
                                _d = (_c = React).createElement;
                                _e = [Provider];
                                _f = {};
                                _g = this.store;
                                if (_g) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.init().then(function (res) { return res.store; })];
                            case 1:
                                _g = (_h.sent());
                                _h.label = 2;
                            case 2: return [2 /*return*/, _b.apply(_a, [_d.apply(_c, _e.concat([(_f.store = _g, _f), React.createElement(JssProvider, { registry: this.pageContext.sheetsRegistry, generateClassName: this.pageContext.generateClassName },
                                            React.createElement(MuiThemeProvider, { theme: this.theme },
                                                React.createElement(SnackbarProvider, { maxSnack: 3 },
                                                    React.createElement(Notifier, null)),
                                                React.createElement(ToolsetContext.Provider, { value: { toolset: this.toolset } },
                                                    React.createElement(Page, __assign({}, props)))))])),
                                    rootElement,
                                    function () { return resolve(rootElement); }])];
                        }
                    });
                });
            };
        };
        this.config = merge({}, defaultConfig, config);
        if (typeof window !== undefined) {
            window.addEventListener("popstate", function (e) {
                Array.from(document.body.children)
                    .filter(function (node) {
                    return node.attributes["role"].value === "presentation" ||
                        node.attributes["role"].value === "dialog";
                })
                    .forEach(function (node) { return node.remove(); });
            });
        }
        i18n.changeLanguage(this.config.lang);
    }
    CybexAddon.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, store, notifier, toolset;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.store) return [3 /*break*/, 2];
                        return [4 /*yield*/, configureStore(this.config)({
                                game: this.config.game,
                                referUrl: this.config.referUrl
                            })];
                    case 1:
                        _a = _b.sent(), store = _a.store, notifier = _a.notifier, toolset = _a.toolset;
                        this.toolset = toolset;
                        this.notifier = notifier;
                        this.store = store;
                        _b.label = 2;
                    case 2: return [2 /*return*/, this];
                }
            });
        });
    };
    CybexAddon.prototype.setLang = function (lang) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.i18n.changeLanguage(lang)];
            });
        });
    };
    CybexAddon.prototype.loginPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.store) {
                    this.store.dispatch(authShowModal());
                }
                return [2 /*return*/, import("./pages/login")
                        .then(function (module) { return module.Login; })
                        .then(function (Login) { return new Promise(function (resolve) { return _this.patchPage(Login, resolve); }); })];
            });
        });
    };
    CybexAddon.prototype.logout = function () {
        if (this.store) {
            this.store.dispatch(authLogout());
        }
    };
    CybexAddon.prototype.showInviteBtn = function (onClick) {
        return __awaiter(this, void 0, void 0, function () {
            var rootContainer;
            var _this = this;
            return __generator(this, function (_a) {
                rootContainer = document.getElementById(CybexAddon.INVATION_OVERLAY_CONTAINER_ID);
                if (!rootContainer) {
                    rootContainer = document.createElement("div");
                    rootContainer.id = CybexAddon.INVATION_OVERLAY_CONTAINER_ID;
                    document.body.appendChild(rootContainer);
                }
                return [2 /*return*/, new Promise(function (resolve) {
                        return _this.bootstrap(InviteBtn, { onClick: onClick })(rootContainer, resolve);
                    })];
            });
        });
    };
    CybexAddon.prototype.hideInviteBtn = function () {
        var rootContainer = document.getElementById(CybexAddon.INVATION_OVERLAY_CONTAINER_ID);
        if (rootContainer) {
            rootContainer.remove();
        }
    };
    CybexAddon.prototype.depositPage = function (root) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, import("./pages/deposit")
                        .then(function (module) { return module.Deposit; })
                        .then(function (Deposit) {
                        return new Promise(function (resolve) { return _this.bootstrap(Deposit)(root, resolve); });
                    })];
            });
        });
    };
    CybexAddon.prototype.referPage = function (root) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, import("./pages/refer")
                        .then(function (module) { return module.Refer; })
                        .then(function (Refer) { return new Promise(function (resolve) { return _this.bootstrap(Refer)(root, resolve); }); })];
            });
        });
    };
    CybexAddon.prototype.referRulePage = function (root) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, import("./pages/refer-rule")
                        .then(function (module) { return module.ReferRule; })
                        .then(function (ReferRule) {
                        return new Promise(function (resolve) { return _this.bootstrap(ReferRule)(root, resolve); });
                    })];
            });
        });
    };
    CybexAddon.EVENT_ACTION = EVENT_ACTION;
    CybexAddon.OVERLAY_CONTAINER_ID = "$OVERLAY_CONTAINER_ID";
    CybexAddon.INVATION_OVERLAY_CONTAINER_ID = "$INVATION_OVERLAY_CONTAINER_ID";
    return CybexAddon;
}());
export { CybexAddon };
