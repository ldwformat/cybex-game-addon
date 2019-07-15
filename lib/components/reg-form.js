var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import * as React from "react";
import { PrimaryButton, renderTextField } from "../components/form-utils";
import { DialogContent, DialogActions, InputAdornment, IconButton, Checkbox, FormControlLabel } from "@material-ui/core";
import { withToolset } from "../providers/toolset";
import { ChainValidation } from "../cybex/chain";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import SVGInline from "react-svg-inline";
import { connect } from "react-redux";
import { selectRegCaptcha, authRegGetCaptcha, selectDefaultReferer } from "../core/auth";
import { Form, Field } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";
import { unstable_useMediaQuery } from "@material-ui/core/useMediaQuery";
var validate = function (values) {
    var errors = {};
    var requiredFields = [
        "accountName",
        "password",
        "confirm",
        "captcha",
        "agreement"
    ];
    console.debug("Values: ", values);
    requiredFields.forEach(function (field) {
        if (!values[field]) {
            errors[field] = Dict["ErrorRequired_" + field] || Dict.ErrorRequired;
        }
    });
    if (values.accountName &&
        (!!ChainValidation.is_account_name_error(values.accountName, false) ||
            !ChainValidation.is_cheap_name(values.accountName))) {
        errors.accountName = Dict.AuthRegAccountNameHelper;
    }
    if (values.password &&
        !/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{12,}/.test(values.password)) {
        errors.password = Dict.AuthRegPasswordHelper;
    }
    if (values.confirm && values.confirm !== values.password) {
        errors.confirm = Dict.ErrorMatch;
    }
    return errors;
};
var usernameAvailable = function (toolset) { return function (value) { return __awaiter(_this, void 0, void 0, function () {
    var chainAssisant, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!value) {
                    return [2 /*return*/, Dict.ErrorRequired_accountName];
                }
                chainAssisant = toolset.chainAssisant;
                return [4 /*yield*/, chainAssisant.getAccounts(value)];
            case 1:
                res = _a.sent();
                if (res[0]) {
                    return [2 /*return*/, Dict.ErrorAccountExists];
                }
                return [2 /*return*/, null];
        }
    });
}); }; };
var mapStateToProps = function (state) { return ({
    captcha: selectRegCaptcha(state),
    defaultReferer: selectDefaultReferer(state),
    initialValues: {
        accountName: "",
        password: "",
        confirm: "",
        captcha: "",
        agreement: false,
        referer: selectDefaultReferer(state) || ""
    }
}); };
var mapDispatch = {
    getCaptcha: authRegGetCaptcha
};
// Register Form
export var RegForm = withToolset(connect(mapStateToProps, mapDispatch)(function (props) {
    var _a = React.useState(false), showPassword = _a[0], switchPassword = _a[1];
    var _b = React.useState(false), showConfirm = _b[0], switchConfirm = _b[1];
    var _c = useTranslation(), t = _c.t, i18n = _c.i18n;
    var matches = unstable_useMediaQuery("(min-width:600px)");
    var styleOfContent = {
        padding: 0,
        margin: "16px 0"
    };
    var onSubmit = props.onSubmit, invalid = props.invalid, getCaptcha = props.getCaptcha, captcha = props.captcha, valid = props.valid, defaultReferer = props.defaultReferer, children = props.children, toolset = props.toolset;
    return (React.createElement(Form, { onSubmit: onSubmit, validate: validate, initialValues: {
            accountName: "",
            password: "",
            confirm: "",
            referer: defaultReferer,
            agreement: false,
            captcha: ""
        }, render: function (_a) {
            var handleSubmit = _a.handleSubmit, submitting = _a.submitting, pristine = _a.pristine, values = _a.values, invalid = _a.invalid, valid = _a.valid;
            return (React.createElement("form", { onSubmit: handleSubmit },
                React.createElement(DialogContent, { style: styleOfContent },
                    React.createElement("div", { style: { marginBottom: "0.5em" } },
                        React.createElement(Field, { autoFocus: true, style: { width: "100%" }, name: "accountName", component: renderTextField, validate: usernameAvailable(toolset), autoFocusd: true, label: t(Dict.AuthAccountName), helperText: t(Dict.AuthRegAccountNameHelper) })),
                    React.createElement("div", { style: { marginBottom: "0.5em" } },
                        React.createElement(Field, { style: { width: "100%" }, component: renderTextField, name: "password", type: showPassword ? "text" : "password", label: t(Dict.AuthPassword), helperText: t(Dict.AuthRegPasswordHelper), InputProps: {
                                endAdornment: (React.createElement(InputAdornment, { position: "end" },
                                    React.createElement(IconButton, { tabIndex: -1, onClick: function () { return switchPassword(!showPassword); } }, showPassword ? React.createElement(VisibilityOff, null) : React.createElement(Visibility, null))))
                            } })),
                    React.createElement("div", { style: { marginBottom: "0.5em" } },
                        React.createElement(Field, { style: { width: "100%" }, component: renderTextField, name: "confirm", label: t(Dict.AuthPasswordConfirm), helperText: t(Dict.AuthRegConfirmHelper), type: showConfirm ? "text" : "password", InputProps: {
                                endAdornment: (React.createElement(InputAdornment, { position: "end" },
                                    React.createElement(IconButton, { tabIndex: -1, onClick: function () { return switchConfirm(!showConfirm); } }, showConfirm ? React.createElement(VisibilityOff, null) : React.createElement(Visibility, null))))
                            } })),
                    React.createElement("div", { style: { marginBottom: "0.5em" } },
                        React.createElement(Field, { style: { width: "100%" }, component: renderTextField, name: "captcha", type: "text", label: t(Dict.AuthCaptcha), helperText: t(Dict.AuthCaptchaHelper), InputProps: {
                                endAdornment: (React.createElement(InputAdornment, { position: "end" }, captcha && (React.createElement(SVGInline, { svg: captcha.data.replace("#4AA0E2", "#FFFFFF"), onClick: getCaptcha }))))
                            } })),
                    React.createElement("div", { style: { marginBottom: "1em" } },
                        React.createElement(Field, { style: { width: "100%" }, name: "referer", component: renderTextField, disabled: !!defaultReferer, label: t(Dict.AuthReferrer), helperText: t(Dict.AuthReferrerHelper) })),
                    React.createElement("div", null,
                        React.createElement(Field, { name: "agreement", component: function (_a) {
                                var input = _a.input;
                                return (React.createElement(FormControlLabel, { style: { marginRight: 0, textAlign: "justify" }, htmlFor: "agreement", onClick: function () { return input.onChange(!input.value); }, control: React.createElement(Checkbox, { id: "agreement", checked: input.value ? true : false, onChange: input.onChange }), label: t(Dict.PasswordBackupTip) }));
                            }, type: "checkbox" }))),
                React.createElement(DialogContent, { style: styleOfContent }, children),
                React.createElement(DialogActions, { style: { margin: 0 } },
                    React.createElement(PrimaryButton, { color: "primary", fullWidth: true, type: "submit", style: { height: "48px", fontSize: "16px", margin: 0 }, disabled: pristine || submitting || invalid }, t(Dict.AuthRegister)))));
        } }));
}));