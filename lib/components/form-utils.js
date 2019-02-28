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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from "react";
import { TextField, FormControlLabel, Checkbox, FormControl, RadioGroup, Radio, FormHelperText, InputLabel, Select, Button, withStyles } from "@material-ui/core";
import { Colors } from "./colors";
export var renderTextField = function (_a) {
    var label = _a.label, input = _a.input, _b = _a.meta, touched = _b.touched, invalid = _b.invalid, error = _b.error, custom = __rest(_a, ["label", "input", "meta"]);
    return (React.createElement(TextField, __assign({ label: label, 
        // placeholder={label}
        error: touched && invalid, helperText: touched && error }, input, custom)));
};
export var renderPasswordField = function (_a) {
    var label = _a.label, input = _a.input, _b = _a.meta, touched = _b.touched, invalid = _b.invalid, error = _b.error, custom = __rest(_a, ["label", "input", "meta"]);
    return (React.createElement(TextField, __assign({ label: label, 
        // placeholder={label}
        error: touched && invalid, helperText: touched && error }, input, custom)));
};
export var renderCheckbox = function (_a) {
    var input = _a.input, label = _a.label;
    return (React.createElement("div", null,
        React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { checked: input.value ? true : false, onChange: input.onChange }), label: label })));
};
export var radioButton = function (_a) {
    var input = _a.input, rest = __rest(_a, ["input"]);
    return (React.createElement(FormControl, null,
        React.createElement(RadioGroup, __assign({}, input, rest),
            React.createElement(FormControlLabel, { value: "female", control: React.createElement(Radio, null), label: "Female" }),
            React.createElement(FormControlLabel, { value: "male", control: React.createElement(Radio, null), label: "Male" }))));
};
export var renderFromHelper = function (_a) {
    var touched = _a.touched, error = _a.error;
    if (!(touched && error)) {
        return;
    }
    else {
        return React.createElement(FormHelperText, null, touched && error);
    }
};
export var renderSelectField = function (_a) {
    var input = _a.input, label = _a.label, _b = _a.meta, touched = _b.touched, error = _b.error, children = _a.children, custom = __rest(_a, ["input", "label", "meta", "children"]);
    return (React.createElement(FormControl, { error: touched && error },
        React.createElement(InputLabel, { htmlFor: "age-native-simple" }, "Age"),
        React.createElement(Select, __assign({ native: true }, input, custom, { inputProps: {
                name: "age",
                id: "age-native-simple"
            } }), children),
        renderFromHelper({ touched: touched, error: error })));
};
var ButtonStyles = function (theme) { return ({
    root: {
        color: Colors.btnPrimary,
        background: Colors.btnBgPrimary,
        "&:disabled": {
            background: Colors.btnBgDisabled
        }
    }
}); };
export var PrimaryButton = withStyles(ButtonStyles)(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.render = function () {
        return React.createElement(Button, __assign({ classes: this.props.classes }, this.props));
    };
    return class_1;
}(React.Component)));
