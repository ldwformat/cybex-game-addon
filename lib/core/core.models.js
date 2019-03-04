import { AuthState } from "./auth";
import { MallState } from "./mall";
import { ReferState } from "./refer";
import { GatewayState } from "./gateway";
var Noti = /** @class */ (function () {
    function Noti(message, options) {
        if (options === void 0) { options = {}; }
        this.message = message;
        this.options = options;
        this.key = "$" + Date.now() + "|" + (10000000 + Math.floor(Math.random() * 100000000));
    }
    return Noti;
}());
export { Noti };
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
        this.form = {};
        this.app = new AppState();
    }
    return CoreState;
}());
export { CoreState };
