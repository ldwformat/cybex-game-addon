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
var styles = function (theme) { return ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }
}); };
var Paragraph = function (_a) {
    var title = _a.title, _b = _a.contents, contents = _b === void 0 ? [] : _b;
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "body1", style: { marginTop: "1em", marginBottom: "0.5em" }, color: "secondary" }, title),
        contents.map(function (p, i) { return (React.createElement(Typography, { key: i, variant: "body2" }, p)); })));
};
export var ReferRule = withStyles(styles)(/** @class */ (function (_super) {
    __extends(ReferRule, _super);
    function ReferRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReferRule.prototype.render = function () {
        var classes = this.props.classes || {};
        return (React.createElement(Paper, { classes: { root: classes.root }, square: true, elevation: 0 },
            React.createElement("div", { style: { flex: "1 1 auto", overflowY: "auto", margin: 16 } },
                React.createElement(Paragraph, { title: "\u793A\u4F8B\u6807\u98981", contents: [
                        "这是一个测试段落",
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam, adipisci quam ipsa temporibus qui, asperiores modi a aperiam minus sapiente repudiandae nemo doloribus nisi! Doloremque perspiciatis quibusdam alias laudantium! Corrupti ea quam iusto modi accusamus minima incidunt tempore voluptate dolorem quae placeat laboriosam deserunt soluta dolor sapiente inventore libero ad sed, quos voluptatibus tenetur aliquid quasi? Expedita, itaque ullam?"
                    ] }),
                React.createElement(Paragraph, { title: "\u793A\u4F8B\u6807\u98982", contents: [
                        "这是一个测试段落",
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam, adipisci quam ipsa temporibus qui, asperiores modi a aperiam minus sapiente repudiandae nemo doloribus nisi! Doloremque perspiciatis quibusdam alias laudantium! Corrupti ea quam iusto modi accusamus minima incidunt tempore voluptate dolorem quae placeat laboriosam deserunt soluta dolor sapiente inventore libero ad sed, quos voluptatibus tenetur aliquid quasi? Expedita, itaque ullam?"
                    ] })),
            React.createElement(ShareButton, null)));
    };
    return ReferRule;
}(React.Component)));
