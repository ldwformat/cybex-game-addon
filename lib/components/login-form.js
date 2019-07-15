import * as React from "react";
import { Form, Field } from "react-final-form";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { PrimaryButton, renderTextField } from "../components/form-utils";
import { DialogContent, DialogActions, InputAdornment, IconButton } from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
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
export var LoginForm = function (_a) {
    var onSubmit = _a.onSubmit, children = _a.children;
    var _b = React.useState(false), showPassword = _b[0], switchPassword = _b[1];
    var _c = useTranslation(), t = _c.t, i18n = _c.i18n;
    var matches = useMediaQuery("(min-width:600px)");
    var styleOfContent = {
        padding: 0,
        margin: "16px 0"
    };
    return (React.createElement(Form, { onSubmit: onSubmit, validate: validate, render: function (_a) {
            var handleSubmit = _a.handleSubmit, reset = _a.reset, submitting = _a.submitting, pristine = _a.pristine, values = _a.values, invalid = _a.invalid;
            return (React.createElement("form", { onSubmit: handleSubmit },
                React.createElement(DialogContent, { style: styleOfContent },
                    React.createElement("div", { style: { marginBottom: "1em" } },
                        React.createElement(Field, { fullWidth: true, autoFocus: true, name: "accountName", component: renderTextField, type: "text", label: t(Dict.AuthAccountName), helperText: t(Dict.AuthAccountNameHelper) })),
                    React.createElement("div", { style: { marginBottom: "1em" } },
                        React.createElement(Field, { style: { width: "100%" }, fullWidth: true, name: "password", type: showPassword ? "text" : "password", label: t(Dict.AuthPassword), helperText: t(Dict.AuthLoginPasswordHelper), component: renderTextField, InputProps: {
                                endAdornment: (React.createElement(InputAdornment, { position: "end" },
                                    React.createElement(IconButton, { onClick: function () { return switchPassword(!showPassword); } }, showPassword ? React.createElement(VisibilityOff, null) : React.createElement(Visibility, null))))
                            } }))),
                React.createElement(DialogContent, { style: styleOfContent }, children),
                React.createElement(DialogActions, { style: { margin: 0 } },
                    React.createElement(PrimaryButton, { color: "primary", style: { height: "48px", fontSize: "16px", margin: 0 }, fullWidth: true, type: "submit", disabled: pristine || submitting || invalid }, t(Dict.LoginSubmit)))));
        } }));
};
