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
import { selectAuth, selectAuthModal, selectAuthIsLogging, selectLoginPanel } from "../core/auth/auth.selectors";
import { authLogin, authShowModal, authCloseModal, authLogout, LoginPanel, authModalSwitchPanel } from "../core/auth";
import { gatewayLoadGatewayInfo, gatewaySelectAsset } from "../core/gateway";
import { Button, Dialog, withStyles, IconButton, Typography } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { corePushNoti } from "../core/core.actions";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { LoginForm } from "../components/login-form";
import { RegForm } from "../components/reg-form";
var mapStateToProps = function (state) { return ({
    auth: selectAuth(state),
    currentPanel: selectLoginPanel(state),
    isLogging: selectAuthIsLogging(state),
    isModalShowing: selectAuthModal(state)
}); };
var mapDispatch = {
    login: authLogin,
    logout: authLogout,
    switchPanel: authModalSwitchPanel,
    alert: corePushNoti,
    closeModal: authCloseModal,
    showModal: authShowModal,
    loadGatewayInfo: gatewayLoadGatewayInfo,
    selectAsset: gatewaySelectAsset
};
var styles = function (theme) { return ({
    paper: {
        margin: 0,
        padding: "16px 0 8px 0"
    }
}); };
var LoginClass = withStyles(styles)(/** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this.logging$ = new Subject();
        _this.componentDidUpdate = function (prevProps, prevState) {
            if (prevProps.isLogging && !_this.props.isLogging) {
                _this.logging$.next(false);
            }
        };
        _this.onSubmit = function (data) {
            return new Promise(function (resolve, reject) {
                _this.props.login(data);
                _this.logging$
                    .pipe(take(1))
                    .subscribe(function () { return setTimeout(resolve, 2000); }, reject);
            });
        };
        console.debug("New Login: ", props);
        return _this;
    }
    Login.prototype.render = function () {
        var _a = this.props, classes = _a.classes, logout = _a.logout, closeModal = _a.closeModal, isModalShowing = _a.isModalShowing, currentPanel = _a.currentPanel, switchPanel = _a.switchPanel;
        return (React.createElement(Dialog, { open: isModalShowing, disableBackdropClick: true, classes: classes && { paper: classes.paper }, maxWidth: "lg", onClose: closeModal },
            React.createElement("div", { style: { position: "absolute", right: 0, top: 0 } },
                React.createElement(IconButton, { onClick: closeModal },
                    React.createElement(CloseIcon, null))),
            currentPanel === LoginPanel.Login ? (React.createElement(LoginForm, { onSubmit: this.onSubmit },
                React.createElement("div", { style: { textAlign: "right" } },
                    React.createElement("a", { href: "javascript:;", style: { textDecoration: "none" }, onClick: switchPanel },
                        React.createElement(Typography, { component: "span", color: "secondary" }, "\u6CE8\u518C\u65B0\u8D26\u6237"))))) : (React.createElement(RegForm, { onSubmit: this.onSubmit },
                React.createElement("div", { style: { textAlign: "right" } },
                    React.createElement("a", { href: "javascript:;", style: { textDecoration: "none" }, onClick: switchPanel },
                        React.createElement(Typography, { component: "span", color: "secondary" }, "\u8FD4\u56DE\u767B\u5F55"))))),
            React.createElement(Button, { onClick: logout }, "\u767B\u51FA")));
    };
    return Login;
}(React.Component)));
export var Login = connect(mapStateToProps, mapDispatch)(LoginClass);
