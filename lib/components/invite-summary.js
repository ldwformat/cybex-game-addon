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
import { useTranslation } from "react-i18next";
import { Grid, Typography, withStyles, Card } from "@material-ui/core";
import { RoundedCardWithShadow } from "./styles";
import { Dict } from "../providers/i18n";
import { InviteBg } from "./../assets/images/invite-bg";
var styles = function (theme) { return ({
    container: __assign({ height: "231px", background: "url(" + InviteBg + ")", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }, RoundedCardWithShadow, { boxShadow: "0 8px 8px -4px rgba(120,129,154,0.5)" }),
    font: {
        color: theme.palette.getContrastText("#000")
    }
}); };
export var InviteSummary = withStyles(styles)(function (_a) {
    var _b = _a.amount, amount = _b === void 0 ? 0 : _b, title = _a.title, classes = _a.classes;
    classes = classes || {};
    var _c = useTranslation(), t = _c.t, i18n = _c.i18n;
    return (React.createElement(Grid, { classes: { container: classes.container }, component: function (_a) {
            var children = _a.children, rest = __rest(_a, ["children"]);
            return React.createElement(Card, __assign({}, rest), children);
        }, xs: true, item: true, container: true, direction: "column", justify: "center", alignItems: "center" },
        React.createElement(Typography, { classes: { root: classes.font }, component: "p", variant: "h6" }, t(Dict.TotalRebates)),
        React.createElement(Typography, { classes: { root: classes.font }, component: "h1", variant: "h1", style: { fontWeight: 500 } }, Number(amount).toFixed(2))));
});
