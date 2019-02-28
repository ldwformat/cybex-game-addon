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
import { selectMyRegisterReferrer, selectMyGameReferral, selectMyRegisterReferral, selectMyGameReferrer } from "../core/refer";
import { withStyles, Paper } from "@material-ui/core";
import { selectCurrentAccount } from "../core/auth/auth.selectors";
var ReferBg = require("../assets/images/refer-bg.jpg");
var mapStateToProps = function (state) { return ({
    accountName: selectCurrentAccount(state),
    myRegisterReferrer: selectMyRegisterReferrer(state),
    myRegisterReferral: selectMyRegisterReferral(state),
    myGameReferrer: selectMyGameReferrer(state),
    myGameReferral: selectMyGameReferral(state)
}); };
var styles = function (theme) { return ({
    root: {
        height: "100%"
    },
    innerWrapper: {
        margin: theme.spacing.unit * 2,
        width: "calc(100% - " + theme.spacing.unit * 4 + "px)",
        height: "100%",
        "&>*:not(:first-of-type)": {
            marginTop: theme.spacing.unit * 2
        }
    },
    copyCard: {
        background: "rgb(243,243,243)",
        width: "100%"
    }
}); };
var referCodeStyle = function (theme) { return ({
    root: {
        margin: theme.spacing.unit * 2 + "px " + theme.spacing.unit * 5 + "px",
        height: 160,
        borderRadius: theme.spacing.unit + "px",
        boxShadow: "0 " + (theme.spacing.unit * 3) / 4 + "px " + (theme.spacing.unit * 3) /
            4 + "px rgba(0,0,0,0.15)",
        backgroundImage: "url(" + ReferBg + ")",
        backgroundSize: "cover",
        clipPath: "url(#mask)"
    }
}); };
export var ReferCode = withStyles(referCodeStyle)(function (_a) {
    var code = _a.code, classes = _a.classes;
    return (React.createElement(React.Fragment, null,
        React.createElement("svg", { style: { position: "fixed", zIndex: -1 } },
            React.createElement("defs", null,
                React.createElement("clipPath", { id: "mask", viewBox: "0 0 279 160" },
                    React.createElement("path", { d: "M 0 0 V 70 A 10 10 0 1 1 0 90 V 160 H 279 V 90 a 10 10 0 0 1 0 -20 V 0 z" })))),
        React.createElement("div", { className: classes && classes.root }, code && code)));
});
export var Refer = connect(mapStateToProps)(withStyles(styles)(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.render = function () {
        var accountName = this.props.accountName;
        var classes = this.props.classes || {};
        return (React.createElement(Paper, { classes: { root: classes.root }, square: true, elevation: 0 },
            React.createElement(ReferCode, { code: accountName })));
    };
    return class_1;
}(React.Component))));
