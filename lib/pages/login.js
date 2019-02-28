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
import { selectAuth, selectAuthModal, selectAuthIsLogging } from "../core/auth/auth.selectors";
import { authLogin, authShowModal, authCloseModal, authLogout } from "../core/auth";
import { gatewayLoadGatewayInfo, gatewaySelectAsset } from "../core/gateway";
import { Button, Dialog, withStyles, DialogContent, DialogActions, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { Field, reduxForm } from "redux-form";
import { delay } from "../utils";
import { renderTextField, PrimaryButton } from "../components/form-utils";
import { corePushNoti } from "../core/core.actions";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
var mapStateToProps = function (state) { return ({
    auth: selectAuth(state),
    isLogging: selectAuthIsLogging(state),
    isModalShowing: selectAuthModal(state)
}); };
var mapDispatch = {
    login: authLogin,
    logout: authLogout,
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
var validate = function (values) {
    var errors = {};
    var requiredFields = ["accountName", "password"];
    requiredFields.forEach(function (field) {
        if (!values[field]) {
            errors[field] = "Required";
        }
    });
    if (values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }
    return errors;
};
var asyncValidate = function (values /*, dispatch */) {
    return delay(1000).then(function () {
        // simulate server latency
        if (["foo@foo.com", "bar@bar.com"].includes(values.email)) {
            // eslint-disable-next-line no-throw-literal
            throw { email: "Email already Exists" };
        }
    });
};
var formStyles = {
    root: {}
};
var LoginForm = reduxForm({
    form: "LoginForm",
    validate: validate,
    asyncValidate: asyncValidate
})(function (props) {
    var handleSubmit = props.handleSubmit, pristine = props.pristine, reset = props.reset, submitting = props.submitting, invalid = props.invalid;
    console.debug("Props: ", props);
    return (React.createElement("form", { onSubmit: handleSubmit },
        React.createElement(DialogContent, { style: {
                width: "80%",
                minWidth: "60vw",
                padding: 0,
                margin: "10px 16px"
            } },
            React.createElement("div", { style: { marginBottom: "1em" } },
                React.createElement(Field, { autoFocus: true, style: { width: "100%" }, name: "accountName", component: renderTextField, label: "\u7528\u6237\u540D", helperText: "\u8BF7\u8F93\u5165\u60A8\u7684\u4E91\u94B1\u5305\u8D26\u6237\u540D" })),
            React.createElement("div", { style: { marginBottom: "1em" } },
                React.createElement(Field, { style: { width: "100%" }, component: renderTextField, name: "password", type: "password", label: "\u5BC6\u7801", helperText: "\u8BF7\u8F93\u5165\u60A8\u7684\u4E91\u94B1\u5305\u5BC6\u7801" }))),
        React.createElement(DialogActions, { style: { margin: "8px 12px" } },
            React.createElement(PrimaryButton, { color: "primary", fullWidth: true, type: "submit", disabled: pristine || submitting || invalid }, "\u767B\u5F55"))));
});
var LoginClass = withStyles(styles)(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1(props) {
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
    class_1.prototype.render = function () {
        var _a = this.props, classes = _a.classes, auth = _a.auth, login = _a.login, logout = _a.logout, selectAsset = _a.selectAsset, loadGatewayInfo = _a.loadGatewayInfo, closeModal = _a.closeModal, alert = _a.alert, isModalShowing = _a.isModalShowing;
        return (React.createElement(Dialog, { open: isModalShowing, disableBackdropClick: true, classes: classes && { paper: classes.paper }, maxWidth: "lg", onClose: closeModal },
            React.createElement("div", { style: { position: "absolute", right: 0, top: 0 } },
                React.createElement(IconButton, { onClick: closeModal },
                    React.createElement(CloseIcon, null))),
            React.createElement(LoginForm, { onSubmit: this.onSubmit }),
            React.createElement(Button, { onClick: this.onSubmit }, "\u767B\u5F55"),
            React.createElement(Button, { onClick: logout }, "\u767B\u51FA"),
            React.createElement("button", { onClick: loadGatewayInfo }, "\u5237\u65B0\u5217\u8868"),
            React.createElement("button", { onClick: selectAsset.bind(this, "JADE.ETH") }, "\u8BFB\u53D6JADE.ETH\u5145\u503C\u4FE1\u606F"),
            React.createElement("button", { onClick: selectAsset.bind(this, "JADE.BTC") }, "\u8BFB\u53D6JADE.BTC")));
    };
    return class_1;
}(React.Component)));
export var Login = connect(mapStateToProps, mapDispatch)(LoginClass);
