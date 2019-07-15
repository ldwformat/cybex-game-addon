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
import { Card, CardHeader, Avatar, colors, CardContent, withStyles, Grid } from "@material-ui/core";
import { RoundedCardWithShadow } from "./styles";
var styles = function (theme) { return ({
    avatar: {
        marginRight: theme.spacing.unit
    }
}); };
export var InviteCard = withStyles(styles)(function (_a) {
    var children = _a.children, IconComponent = _a.IconComponent, title = _a.title, classes = _a.classes, _b = _a.color, color = _b === void 0 ? colors.grey[300] : _b;
    classes = classes || {};
    return (React.createElement(Card, { style: __assign({}, RoundedCardWithShadow, { height: "100%" }) },
        React.createElement(CardHeader, { avatar: React.createElement(Avatar, { style: { background: color, width: 32, height: 32 } },
                React.createElement(IconComponent, null)), style: {
                padding: "16px 24px 8px 24px"
            }, classes: {
                avatar: classes.avatar
            }, title: title, titleTypographyProps: { variant: "h6" } }),
        React.createElement(Grid, { container: true, component: CardContent, alignItems: "center", justify: "space-around", style: { minHeight: "6.4em" } }, children)));
});
