import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { renderTextField, PrimaryButton } from "../components/form-utils";
import { delay } from "../utils";
import { DialogContent, DialogActions } from "@material-ui/core";
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
export var LoginForm = reduxForm({
    form: "LoginForm",
    validate: validate,
})(function (props) {
    var handleSubmit = props.handleSubmit, pristine = props.pristine, reset = props.reset, submitting = props.submitting, invalid = props.invalid;
    console.debug("Props: ", props);
    var styleOfContent = {
        width: "80%",
        minWidth: "60vw",
        padding: 0,
        margin: "10px 16px"
    };
    return (React.createElement("form", { onSubmit: handleSubmit },
        React.createElement(DialogContent, { style: styleOfContent },
            React.createElement("div", { style: { marginBottom: "1em" } },
                React.createElement(Field, { autoFocus: true, style: { width: "100%" }, name: "accountName", component: renderTextField, label: "\u7528\u6237\u540D", helperText: "\u8BF7\u8F93\u5165\u60A8\u7684\u4E91\u94B1\u5305\u8D26\u6237\u540D" })),
            React.createElement("div", { style: { marginBottom: "1em" } },
                React.createElement(Field, { style: { width: "100%" }, component: renderTextField, name: "password", type: "password", label: "\u5BC6\u7801", helperText: "\u8BF7\u8F93\u5165\u60A8\u7684\u4E91\u94B1\u5305\u5BC6\u7801" }))),
        React.createElement(DialogContent, { style: styleOfContent }, props.children),
        React.createElement(DialogActions, { style: { margin: "8px 12px" } },
            React.createElement(PrimaryButton, { color: "primary", fullWidth: true, type: "submit", disabled: pristine || submitting || invalid }, "\u767B\u5F55"))));
});
