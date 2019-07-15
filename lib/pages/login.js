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
import * as React from "react";
import { connect } from "react-redux";
import { selectAuth, selectAuthModal, selectAuthIsLogging, selectLoginPanel, selectDefaultReferer } from "../core/auth/auth.selectors";
import { authLogin, authShowModal, authCloseModal, authLogout, LoginPanel, authModalSwitchPanel, authRegImpl } from "../core/auth";
import { gatewayLoadGatewayInfo, gatewaySelectAsset } from "../core/gateway";
import { Button, withStyles, Typography, Grid } from "@material-ui/core";
import { corePushNoti } from "../core/core.actions";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { LoginForm } from "../components/login-form";
import { RegForm } from "../components/reg-form";
import { selectGame } from "../core/core.selectors";
import { withTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";
import { PassSetter } from "./pass-setter";
import { Locker, LockerType } from "../components/locker";
import { DialogWrapper } from "../components/dialog-wrapper";
var mapStateToProps = function (state) { return ({
    auth: selectAuth(state),
    game: selectGame(state),
    defaultReferrer: selectDefaultReferer(state),
    currentPanel: selectLoginPanel(state),
    isLogging: selectAuthIsLogging(state),
    isModalShowing: selectAuthModal(state)
}); };
var mapDispatch = {
    login: authLogin,
    regImpl: authRegImpl,
    logout: authLogout,
    switchPanel: authModalSwitchPanel,
    alert: corePushNoti,
    closeModal: authCloseModal,
    showModal: authShowModal,
    loadGatewayInfo: gatewayLoadGatewayInfo,
    selectAsset: gatewaySelectAsset
};
var styles = function (theme) {
    var _a;
    return ({
        paper: {
            position: "relative",
            margin: 0,
            width: "90vw",
            maxWidth: "536px",
            padding: "32px 0 32px 0"
        },
        header: (_a = {
                position: "absolute",
                right: "36px",
                top: 0,
                zIndex: 100
            },
            _a[theme.breakpoints.down("sm")] = {
                right: 0
            },
            _a[theme.breakpoints.up("sm")] = {
                right: "36px"
            },
            _a)
    });
};
var LoginClass = withStyles(styles)(withTranslation()(/** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logging$ = new Subject();
        _this.componentDidUpdate = function (prevProps, prevState) {
            if (prevProps.isLogging && !_this.props.isLogging) {
                _this.logging$.next(false);
            }
        };
        _this.onSubmit = function (_data) {
            var data = __assign({}, _data, { refer: _this.props.defaultReferrer
                    ? {
                        referrer: _this.props.defaultReferrer,
                        action: _this.props.game
                    }
                    : undefined });
            return new Promise(function (resolve, reject) {
                _this.props.login(data);
                _this.logging$
                    .pipe(take(1))
                    .subscribe(function () { return setTimeout(resolve, 2000); }, reject);
            });
        };
        _this.onRegister = function (regData) {
            return new Promise(function (resolve, reject) {
                _this.props.regImpl(regData);
                _this.logging$
                    .pipe(take(1))
                    .subscribe(function () { return setTimeout(resolve, 2000); }, reject);
            });
        };
        return _this;
    }
    Login.prototype.componentWillUnmount = function () {
        if (this.props.closeModal) {
            this.props.closeModal();
        }
    };
    Login.prototype.render = function () {
        var _a = this.props, classes = _a.classes, logout = _a.logout, closeModal = _a.closeModal, isModalShowing = _a.isModalShowing, currentPanel = _a.currentPanel, switchPanel = _a.switchPanel, t = _a.t;
        classes = classes || {};
        return (React.createElement(React.Fragment, null,
            React.createElement(DialogWrapper, { open: isModalShowing, dialogProps: { disableBackdropClick: true }, onCloseClick: closeModal, title: currentPanel === LoginPanel.Unlock
                    ? Dict.Unlock
                    : currentPanel === LoginPanel.Register
                        ? Dict.Register
                        : Dict.Login }, currentPanel === LoginPanel.Unlock ? (React.createElement(Grid, { container: true, direction: "column", alignItems: "center" },
                React.createElement(Locker, { type: LockerType.Unlock }),
                React.createElement(Button, { onClick: logout }, t(Dict.Logout)))) : (React.createElement(React.Fragment, null,
                currentPanel === LoginPanel.Login ? (React.createElement(LoginForm, { onSubmit: this.onSubmit })) : (React.createElement(RegForm, { onSubmit: this.onRegister })),
                React.createElement("div", { style: {
                        textAlign: "center",
                        backgroundColor: "#fff",
                        position: "sticky",
                        padding: "0.5em",
                        marginTop: "16px",
                        bottom: "-8px"
                    } },
                    React.createElement(Typography, { style: { display: "inline", fontSize: "14px" }, component: "span" }, currentPanel === LoginPanel.Login
                        ? t(Dict.HasNoAccountYet)
                        : t(Dict.HasAccountAlready)),
                    React.createElement("a", { href: "javascript:;", style: { textDecoration: "none" }, onClick: switchPanel },
                        React.createElement(Typography, { style: { display: "inline", fontSize: "14px" }, component: "span", color: "secondary" }, currentPanel === LoginPanel.Login
                            ? t(Dict.AuthRegisterLong)
                            : t(Dict.LoginLong))))))),
            React.createElement(PassSetter, null)));
    };
    return Login;
}(React.Component))));
export var Login = connect(mapStateToProps, mapDispatch)(LoginClass);
