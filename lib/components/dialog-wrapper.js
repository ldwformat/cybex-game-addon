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
import { makeStyles } from "@material-ui/styles";
import { Dialog, IconButton, Grid, Typography } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { unstable_useMediaQuery } from "@material-ui/core/useMediaQuery";
import { useTranslation } from "react-i18next";
var useStyles = makeStyles(function (theme) { return ({
    paper: {
        position: "relative",
        width: "90vw",
        maxWidth: "536px"
    },
    header: {
        position: "absolute",
        right: "36px",
        top: 0,
        zIndex: 100,
        "(max-width:599px)": {
            right: 0
        },
        "(min-width:600px)": {
            right: "36px"
        }
    }
}); }, { withTheme: true });
export var DialogWrapper = function (_a) {
    var title = _a.title, open = _a.open, onCloseClick = _a.onCloseClick, children = _a.children, hideHeader = _a.hideHeader, dialogProps = _a.dialogProps, titleProps = _a.titleProps, rest = __rest(_a, ["title", "open", "onCloseClick", "children", "hideHeader", "dialogProps", "titleProps"]);
    var classes = useStyles();
    var matches = unstable_useMediaQuery("(min-width:600px)");
    var _b = useTranslation(), t = _b.t, i18n = _b.i18n;
    return (React.createElement(Dialog, __assign({ open: open, classes: __assign({ paper: classes.paper }, (dialogProps || { classes: {} }).classes), onClose: onCloseClick }, dialogProps),
        !hideHeader && (React.createElement("div", { style: {
                padding: matches ? "16px 48px 0 48px" : 0,
                boxShadow: matches ? "inset 0 -1px 0 0 #f8f9fb" : "unset"
            } }, matches ? (React.createElement(Grid, { container: true, style: { height: "64px" }, justify: "space-between", alignItems: "center" },
            React.createElement(Typography, __assign({ variant: "h4", style: { fontSize: "26px", fontWeight: 600 } }, titleProps), title ? t(title) : null),
            React.createElement(IconButton, { style: { right: "-12px" }, onClick: onCloseClick },
                React.createElement(CloseIcon, null)))) : (React.createElement("div", { className: classes.header, style: { right: matches ? "36px" : 0 } },
            React.createElement(IconButton, { onClick: onCloseClick },
                React.createElement(CloseIcon, null)))))),
        React.createElement("div", { style: {
                padding: matches ? (hideHeader ? 32 : 0) + "px 48px 32px 48px" : "16px"
            } }, children)));
};
