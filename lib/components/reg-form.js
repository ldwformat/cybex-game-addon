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
import { DialogContent, DialogActions, InputAdornment, IconButton } from "@material-ui/core";
import { withToolset } from "../providers/toolset";
import { ChainValidation } from "../cybex/chain";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import SVGInline from "react-svg-inline";
import { connect } from "react-redux";
import { selectRegCaptcha, authRegGetCaptcha, selectDefaultReferer } from "../core/auth";
import { Form, Field } from "react-final-form";
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
var usernameAvailable = function (toolset) { return function (value) { return __awaiter(_this, void 0, void 0, function () {
    var chainAssisant, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!value) {
                    return [2 /*return*/, "Required"];
                }
                chainAssisant = toolset.chainAssisant;
                return [4 /*yield*/, chainAssisant.getAccounts(value)];
            case 1:
                res = _a.sent();
                if (res[0]) {
                    return [2 /*return*/, "Exists"];
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
        referer: selectDefaultReferer(state) || ""
    }
}); };
var mapDispatch = {
    getCaptcha: authRegGetCaptcha
};
// Register Form
export var RegForm = withToolset(connect(mapStateToProps, mapDispatch)(/** @class */ (function (_super) {
    __extends(RegForm, _super);
    function RegForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.form = null;
        _this.state = {
            showPassword: false,
            showConfirm: false
        };
        return _this;
    }
    RegForm.prototype.render = function () {
        var _this = this;
        var _a = this.props, onSubmit = _a.onSubmit, invalid = _a.invalid, getCaptcha = _a.getCaptcha, captcha = _a.captcha, defaultReferer = _a.defaultReferer;
        var styleOfContent = {
            width: "90%",
            minWidth: "60vw",
            maxWidth: "90vw",
            padding: 0,
            margin: "10px auto"
        };
        return (React.createElement(Form, { onSubmit: onSubmit, validate: validate, initialValues: {
                accountName: "",
                password: "",
                confirm: "",
                referer: defaultReferer,
                captcha: ""
            }, render: function (_a) {
                var handleSubmit = _a.handleSubmit, submitting = _a.submitting, pristine = _a.pristine, values = _a.values;
                return (React.createElement("form", { ref: function (form) { return (_this.form = form); }, onSubmit: handleSubmit },
                    React.createElement(DialogContent, { style: styleOfContent },
                        React.createElement("div", { style: { marginBottom: "0.5em" } },
                            React.createElement(Field, { autoFocus: true, style: { width: "100%" }, name: "accountName", component: renderTextField, validate: usernameAvailable(_this.props.toolset), autoFocusd: true, label: "\u7528\u6237\u540D", helperText: "\u8BF7\u8F93\u5165\u60A8\u7684\u4E91\u94B1\u5305\u8D26\u6237\u540D, \u7528\u6237\u540D\u987B\u4E3A\u5C0F\u5199\uFF0C\u5E76\u9700\u5305\u542B\u6570\u5B57\u6216\u5B57\u6BCD\u95F4\u8FDE\u5B57\u7B26\"-\"" })),
                        React.createElement("div", { style: { marginBottom: "0.5em" } },
                            React.createElement(Field, { style: { width: "100%" }, component: renderTextField, name: "password", type: _this.state.showPassword ? "text" : "password", label: "\u5BC6\u7801", helperText: "\u5305\u542B\u81F3\u5C11 12 \u4F4D\u5B57\u7B26, \u4E14\u9700\u8981\u540C\u65F6\u5305\u542B\u6570\u5B57\u548C\u5927\u5C0F\u5199\u82F1\u6587\u5B57\u6BCD\uFF0C\u5E76\u63A8\u8350\u5305\u542B\u7279\u6B8A\u7B26\u53F7\u3002", InputProps: {
                                    endAdornment: (React.createElement(InputAdornment, { position: "end" },
                                        React.createElement(IconButton, { tabIndex: -1, onClick: function () {
                                                return _this.setState(function (prev) { return ({
                                                    showPassword: !prev.showPassword
                                                }); });
                                            } }, _this.state.showPassword ? (React.createElement(VisibilityOff, null)) : (React.createElement(Visibility, null)))))
                                } })),
                        React.createElement("div", { style: { marginBottom: "0.5em" } },
                            React.createElement(Field, { style: { width: "100%" }, component: renderTextField, name: "confirm", label: "\u786E\u8BA4\u5BC6\u7801", helperText: "\u8BF7\u518D\u6B21\u8F93\u5165\u60A8\u7684\u5BC6\u7801", type: _this.state.showConfirm ? "text" : "password", InputProps: {
                                    endAdornment: (React.createElement(InputAdornment, { position: "end" },
                                        React.createElement(IconButton, { tabIndex: -1, onClick: function () {
                                                return _this.setState(function (prev) { return ({
                                                    showConfirm: !prev.showConfirm
                                                }); });
                                            } }, _this.state.showConfirm ? (React.createElement(VisibilityOff, null)) : (React.createElement(Visibility, null)))))
                                } })),
                        React.createElement("div", { style: { marginBottom: "0.5em" } },
                            React.createElement(Field, { style: { width: "100%" }, component: renderTextField, name: "captcha", type: "text", label: "\u9A8C\u8BC1\u7801", helperText: "\u8BF7\u8F93\u5165\u53F3\u4FA7\u9A8C\u8BC1\u7801", InputProps: {
                                    endAdornment: (React.createElement(InputAdornment, { position: "end" }, captcha && (React.createElement(SVGInline, { svg: captcha.data.replace("#4AA0E2", "#FFFFFF"), onClick: getCaptcha }))))
                                } })),
                        React.createElement("div", { style: { marginBottom: "0.5em" } },
                            React.createElement(Field, { style: { width: "100%" }, name: "referer", component: renderTextField, disabled: !!defaultReferer, label: "\u63A8\u8350\u4EBA\uFF08\u9009\u586B\uFF09", helperText: "\u8BF7\u8F93\u5165\u63A8\u8350\u4EBA\u5206\u4EAB\u7ED9\u60A8\u7684\u63A8\u8350\u7801\uFF0C\u82E5\u65E0\u63A8\u8350\u4EBA\uFF0C\u53EF\u4E0D\u586B" }))),
                    React.createElement(DialogContent, { style: styleOfContent }, _this.props.children),
                    React.createElement(DialogActions, { style: { margin: "8px 12px" } },
                        React.createElement(PrimaryButton, { color: "primary", fullWidth: true, type: "submit", disabled: pristine || submitting || invalid }, "\u6CE8\u518C"))));
            } }));
    };
    return RegForm;
}(React.Component))));
