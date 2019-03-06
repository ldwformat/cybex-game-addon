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
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { withStyles, Grid, Typography } from "@material-ui/core";
var ReferBg = require("../assets/images/refer-bg.jpg");
var referCodeStyle = function (theme) { return ({
    root: {
        margin: theme.spacing.unit * 2 + "px " + theme.spacing.unit * 5 + "px",
        height: 160,
        filter: "drop-shadow(0 " + (theme.spacing.unit * 3) / 4 + "px " + (theme.spacing
            .unit *
            3) /
            4 + "px rgba(0,0,0,0.25))"
    },
    cardRoot: {
        clipPath: "url(#mask)",
        width: "100%",
        height: "100%",
        borderRadius: theme.spacing.unit + "px"
    },
    cardMain: {
        backgroundImage: "url(" + ReferBg + ")",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    textRoot: {
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    }
}); };
export var ReferCode = withStyles(referCodeStyle)(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wrapper = null;
        _this.resize$ = null;
        _this.state = {
            width: 279
        };
        _this.fixWidth = function () {
            if (_this.wrapper &&
                _this.wrapper.getBoundingClientRect().width !== _this.state.width) {
                _this.setState({
                    width: _this.wrapper.getBoundingClientRect().width
                });
            }
        };
        return _this;
    }
    class_1.prototype.componentDidMount = function () {
        var _this = this;
        this.fixWidth();
        this.resize$ = fromEvent(window, "resize")
            .pipe(debounceTime(100))
            .subscribe(function () { return _this.fixWidth(); });
    };
    class_1.prototype.componentWillUnmount = function () {
        if (this.resize$) {
            this.resize$.unsubscribe();
        }
    };
    class_1.prototype.componentDidCatch = function () {
        this.fixWidth();
    };
    class_1.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, code = _a.code;
        return (React.createElement("div", { className: classes && classes.root },
            React.createElement("svg", { style: { position: "fixed", zIndex: -1 } },
                React.createElement("defs", null,
                    React.createElement("clipPath", { id: "mask", viewBox: "0 0 279 160" },
                        React.createElement("path", { d: "M 0 0 V 70 A 10 10 0 1 1 0 90 V 160 H " + this.state.width + " V 90 a 10 10 0 0 1 0 -20 V 0 z" })))),
            React.createElement("div", { ref: function (wrapper) { return (_this.wrapper = wrapper); }, className: classes && classes.cardRoot + " " + classes.cardMain },
                React.createElement(Grid, { container: true, item: true, xs: true, justify: "center", alignItems: "center" },
                    React.createElement(Typography, { classes: { root: classes && classes.textRoot }, variant: "body1" }, "\u60A8\u7684\u63A8\u8350\u7801")),
                React.createElement("div", { style: {
                        borderBottom: "2px dashed rgba(255,255,255,0.5)",
                        margin: "0 16px"
                    } }),
                React.createElement(Grid, { container: true, item: true, xs: true, justify: "center", alignItems: "center" },
                    React.createElement(Typography, { variant: "h5", classes: { root: classes && classes.textRoot } }, code && code)))));
    };
    return class_1;
}(React.Component)));
