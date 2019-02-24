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
import * as React from "react";
import { connect } from "react-redux";
import { selectAuth } from "../core/auth/auth.selectors";
import { authLogin } from "../core/auth";
import { gatewayLoadGatewayInfo, gatewaySelectAsset } from "../core/gateway";
var mapStateToProps = function (state) { return ({
    auth: selectAuth(state)
}); };
var mapDispatch = {
    login: authLogin,
    loadGatewayInfo: gatewayLoadGatewayInfo,
    selectAsset: gatewaySelectAsset
};
var LoginClass = /** @class */ (function (_super) {
    __extends(LoginClass, _super);
    function LoginClass(props) {
        var _this = _super.call(this, props) || this;
        console.debug("New Login: ", props);
        return _this;
    }
    LoginClass.prototype.render = function () {
        var _a = this.props, auth = _a.auth, login = _a.login, selectAsset = _a.selectAsset, loadGatewayInfo = _a.loadGatewayInfo;
        return (React.createElement(React.Fragment, null,
            React.createElement("code", null, JSON.stringify(auth.account)),
            React.createElement("h1", null, "Login Page Works!"),
            React.createElement("button", { onClick: function () {
                    return login({
                        accountName: "create-test12",
                        password: "qwer1234qwer1234"
                    });
                } }, "\u767B\u5F55"),
            React.createElement("button", { onClick: loadGatewayInfo }, "\u5237\u65B0\u5217\u8868"),
            React.createElement("button", { onClick: selectAsset.bind(this, "JADE.ETH") }, "\u8BFB\u53D6JADE.ETH\u5145\u503C\u4FE1\u606F"),
            React.createElement("button", { onClick: selectAsset.bind(this, "JADE.BTC") }, "\u8BFB\u53D6JADE.BTC")));
    };
    return LoginClass;
}(React.Component));
export var Login = connect(mapStateToProps, mapDispatch)(LoginClass);
