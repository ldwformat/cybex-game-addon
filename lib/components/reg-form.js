import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { renderTextField, PrimaryButton } from "../components/form-utils";
import { delay } from "../utils";
import { DialogContent, DialogActions } from "@material-ui/core";
import { withToolset } from "../providers/toolset";
import { ChainValidation } from "../cybex/chain";
var validate = function (values) {
    var errors = {};
    var requiredFields = ["accountName", "password", "confirm", "captcha"];
    requiredFields.forEach(function (field) {
        if (!values[field]) {
            errors[field] = "Required";
        }
    });
    if (values.accountName &&
        (!!ChainValidation.is_account_name_error(values.accountName, false) ||
            !ChainValidation.is_cheap_name(values.accountName))) {
        errors.accountName = "Invalid";
    }
    if (values.password &&
        !/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{12,}/.test(values.password)) {
        errors.password = "Invalid";
    }
    if (values.confirm && values.confirm !== values.password) {
        errors.confirm = "Match";
    }
    return errors;
};
var asyncValidate = function (values, dispatch, _a) {
    var toolset = _a.toolset;
    var accountName = values.accountName;
    if (accountName) {
        var chainAssisant = toolset.chainAssisant;
        return chainAssisant.getAccounts(accountName).then(function (res) {
            console.debug("MayNull: ", res);
            if (res[0]) {
                throw {
                    accountName: "Exists"
                };
            }
            return null;
        });
    }
    return delay(0).then(function () {
        return null;
    });
};
// Register Form
export var RegForm = withToolset(reduxForm({
    form: "RegForm",
    validate: validate,
    asyncValidate: asyncValidate
})(function (props) {
    var handleSubmit = props.handleSubmit, pristine = props.pristine, submitting = props.submitting, invalid = props.invalid;
    var styleOfContent = {
        width: "80%",
        minWidth: "60vw",
        padding: 0,
        margin: "10px 16px"
    };
    return (React.createElement("form", { onSubmit: handleSubmit },
        React.createElement(DialogContent, { style: styleOfContent },
            React.createElement("div", { style: { marginBottom: "0.5em" } },
                React.createElement(Field, { autoFocus: true, style: { width: "100%" }, name: "accountName", component: renderTextField, label: "\u7528\u6237\u540D", helperText: "\u8BF7\u8F93\u5165\u60A8\u7684\u4E91\u94B1\u5305\u8D26\u6237\u540D, \u7528\u6237\u540D\u987B\u4E3A\u5C0F\u5199\uFF0C\u5E76\u9700\u5305\u542B\u6570\u5B57\u6216\u5B57\u6BCD\u95F4\u8FDE\u5B57\u7B26\"-\"" })),
            React.createElement("div", { style: { marginBottom: "0.5em" } },
                React.createElement(Field, { style: { width: "100%" }, component: renderTextField, name: "password", type: "password", label: "\u5BC6\u7801", helperText: "\u5305\u542B\u81F3\u5C11 12 \u4F4D\u5B57\u7B26, \u4E14\u9700\u8981\u540C\u65F6\u5305\u542B\u6570\u5B57\u548C\u5927\u5C0F\u5199\u82F1\u6587\u5B57\u6BCD\uFF0C\u5E76\u63A8\u8350\u5305\u542B\u7279\u6B8A\u7B26\u53F7\u3002" })),
            React.createElement("div", { style: { marginBottom: "0.5em" } },
                React.createElement(Field, { style: { width: "100%" }, component: renderTextField, name: "confirm", type: "password", label: "\u786E\u8BA4\u5BC6\u7801", helperText: "\u518D\u6B21\u8F93\u5165\u60A8\u7684\u5BC6\u7801" })),
            React.createElement("div", { style: { marginBottom: "0.5em" } },
                React.createElement(Field, { style: { width: "100%" }, component: renderTextField, name: "captcha", type: "text", label: "\u9A8C\u8BC1\u7801", helperText: "\u8BF7\u8F93\u5165\u53F3\u4FA7\u9A8C\u8BC1\u7801" }))),
        React.createElement(DialogContent, { style: styleOfContent }, props.children),
        React.createElement(DialogActions, { style: { margin: "8px 12px" } },
            React.createElement(PrimaryButton, { color: "primary", fullWidth: true, type: "submit", disabled: pristine || submitting || invalid }, "\u6CE8\u518C"))));
}));
