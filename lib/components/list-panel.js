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
import * as React from "react";
import { withStyles, Card, CardHeader, Divider, Table, TableHead, TableRow, TableCell, TableBody, colors, Typography, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { RoundedCardWithShadow } from "./styles";
export var EmptyTip = function (_a) {
    var IconComponent = _a.IconComponent, title = _a.title, style = _a.style;
    return (React.createElement("div", { style: __assign({ display: "flex", flexDirection: "column", alignItems: "center" }, style) },
        React.createElement(IconComponent, null),
        React.createElement(Typography, { style: { color: colors.grey[500], marginTop: "0.8em" }, variant: "body1" }, title)));
};
var listPanelStyle = function (theme) { return ({
    card: {},
    cardHeader: {
        padding: theme.spacing.unit * 2 + "px " + theme.spacing.unit * 3 + "px",
        boxSizing: "border-box",
        height: "48px"
    },
    th: {
        position: "sticky",
        background: theme.palette.grey[100],
        color: theme.palette.text.primary,
        fontSize: "14px",
        top: 0
    },
    trh: {
        height: "40px"
    },
    tr: {
        height: "48px"
    },
    td: {
        fontSize: "14px",
        border: 0,
        boxShadow: "inset 0 -1px 0 0 #f8f8f8"
    }
}); };
export var ListPanel = withStyles(listPanelStyle)(function (_a) {
    var title = _a.title, listData = _a.listData, colConfig = _a.colConfig, classes = _a.classes, emptyComponent = _a.emptyComponent;
    var _b = useTranslation(), t = _b.t, i18n = _b.i18n;
    classes = classes || {};
    return (React.createElement(Grid, { component: Card, container: true, direction: "column", item: true, xs: true, style: __assign({ height: "100%" }, RoundedCardWithShadow) },
        React.createElement(CardHeader, { classes: { root: classes.cardHeader }, title: title, titleTypographyProps: { variant: "h6" } }),
        React.createElement(Divider, { light: true }),
        React.createElement(Grid, { item: true, xs: true, container: true, style: { overflow: "auto" } }, listData.length ? (React.createElement(Table, null,
            React.createElement(TableHead, null,
                React.createElement(TableRow, { classes: { root: classes.trh } }, colConfig.map(function (col) { return (React.createElement(TableCell, { padding: "dense", classes: { root: classes && classes.th }, key: col.name, align: col.align }, t(col.header))); }))),
            React.createElement(TableBody, null, listData.map(function (item, i) { return (React.createElement(TableRow, { key: i, classes: { root: classes.tr } }, colConfig.map(function (col) { return (React.createElement(TableCell, { padding: "dense", classes: { root: classes.td }, style: col.cellStyle, align: col.align, key: col.name }, col.cell ? col.cell(item[col.name]) : item[col.name])); }))); })))) : (React.createElement(Grid, { container: true, item: true, xs: true, direction: "column", alignItems: "center", justify: "center" }, emptyComponent ? emptyComponent : React.createElement("h1", null, "Empty"))))));
});
