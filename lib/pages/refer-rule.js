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
import { withStyles, Paper, Typography } from "@material-ui/core";
import { ShareButton } from "../components/share-btn";
import { withTranslation, useTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";
var styles = function (theme) { return ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }
}); };
export var Paragraph = function (_a) {
    var title = _a.title, _b = _a.contents, contents = _b === void 0 ? [] : _b;
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "body1", style: { marginTop: "1em", marginBottom: "0.5em" }, color: "secondary", dangerouslySetInnerHTML: { __html: title } }),
        contents.map(function (p, i) { return (React.createElement(Typography, { style: { marginTop: "1em", textAlign: "justify" }, key: i, variant: "body2", dangerouslySetInnerHTML: { __html: p } })); })));
};
export var Rules = function () {
    var _a = useTranslation(), t = _a.t, i18n = _a.i18n;
    return (React.createElement(Paragraph, { title: t(Dict.RefererRuleTitle), contents: [0, 1, 2, 3, 4, 5].map(function (num) {
            return t(Dict["RefererRuleContent_" + num]);
        }) }));
};
export var ReferRule = withStyles(styles)(withTranslation()(/** @class */ (function (_super) {
    __extends(ReferRule, _super);
    function ReferRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReferRule.prototype.render = function () {
        var classes = this.props.classes || {};
        var t = this.props.t;
        return (React.createElement(Paper, { classes: { root: classes.root }, square: true, elevation: 0 },
            React.createElement("div", { style: { flex: "1 10 auto", overflowY: "auto", margin: 16 } },
                React.createElement(Paragraph, { title: t(Dict.RefererRuleTitle), contents: [0, 1, 2, 3, 4, 5].map(function (num) {
                        return t(Dict["RefererRuleContent_" + num]);
                    }) })),
            React.createElement(ShareButton, null)));
    };
    return ReferRule;
}(React.Component))));
