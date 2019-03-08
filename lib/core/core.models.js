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
import { AuthState } from "./auth";
import { MallState } from "./mall";
import { ReferState } from "./refer";
import { GatewayState } from "./gateway";
var Noti = /** @class */ (function () {
    function Noti(message, options) {
        if (options === void 0) { options = {}; }
        this.message = message;
        this.key = "$" + Date.now() + "|" + (10000000 + Math.floor(Math.random() * 100000000));
        this.options = { i18n: true };
        this.options = __assign({}, this.options, options);
    }
    return Noti;
}());
export { Noti };
export function withNotiOptions(withNoti) {
    if (withNoti === void 0) { withNoti = false; }
    return {
        withNoti: withNoti
    };
}
var AppState = /** @class */ (function () {
    function AppState() {
        this.noties = [];
    }
    return AppState;
}());
export { AppState };
// RootState
var CoreState = /** @class */ (function () {
    function CoreState(game, referUrl) {
        this.game = game;
        this.referUrl = referUrl;
        this.auth = new AuthState();
        this.mall = new MallState();
        this.refer = new ReferState();
        this.gateway = new GatewayState();
        this.app = new AppState();
    }
    return CoreState;
}());
export { CoreState };
