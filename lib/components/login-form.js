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
import { Form, Field } from "react-final-form";
import { PrimaryButton, renderTextField } from "../components/form-utils";
import { DialogContent, DialogActions, InputAdornment, IconButton } from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { withTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";
// const validate = username =>
//   !username || username.trim() === "" ? "Username is a required field" : null;
var validate = function (values) {
    var errors = {};
    var requiredFields = ["accountName", "password"];
    requiredFields.forEach(function (field) {
        if (!values[field]) {
            errors[field] = Dict["ErrorRequired_" + field] || Dict.ErrorRequired;
        }
    });
    return errors;
};
export var LoginForm = withTranslation()(/** @class */ (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showPassword: false
        };
        return _this;
    }
    LoginForm.prototype.render = function () {
        var _this = this;
        var _a = this.props, onSubmit = _a.onSubmit, t = _a.t;
        var styleOfContent = {
            minWidth: "70vw",
            padding: 0,
            margin: "10px 16px"
        };
        return (React.createElement(Form, { onSubmit: onSubmit, validate: validate, render: function (_a) {
                var handleSubmit = _a.handleSubmit, reset = _a.reset, submitting = _a.submitting, pristine = _a.pristine, values = _a.values, invalid = _a.invalid;
                return (React.createElement("form", { onSubmit: handleSubmit },
                    React.createElement(DialogContent, { style: styleOfContent },
                        React.createElement("div", { style: { marginBottom: "1em" } },
                            React.createElement(Field, { fullWidth: true, autoFocus: true, name: "accountName", component: renderTextField, type: "text", label: t(Dict.AuthAccountName), helperText: t(Dict.AuthAccountNameHelper) })),
                        React.createElement("div", { style: { marginBottom: "1em" } },
                            React.createElement(Field, { style: { width: "100%" }, fullWidth: true, name: "password", type: _this.state.showPassword ? "text" : "password", label: t(Dict.AuthPassword), helperText: t(Dict.AuthLoginPasswordHelper), component: renderTextField, InputProps: {
                                    endAdornment: (React.createElement(InputAdornment, { position: "end" },
                                        React.createElement(IconButton, { onClick: function () {
                                                return _this.setState(function (prev) { return ({
                                                    showPassword: !prev.showPassword
                                                }); });
                                            } }, _this.state.showPassword ? (React.createElement(VisibilityOff, null)) : (React.createElement(Visibility, null)))))
                                } }))),
                    React.createElement(DialogContent, { style: styleOfContent }, _this.props.children),
                    React.createElement(DialogActions, { style: { margin: "8px 12px" } },
                        React.createElement(PrimaryButton, { color: "primary", fullWidth: true, type: "submit", disabled: pristine || submitting || invalid }, t(Dict.LoginSubmit)))));
            } }));
    };
    return LoginForm;
}(React.Component)));
