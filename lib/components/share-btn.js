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
var _a;
import * as React from "react";
import { connect } from "react-redux";
import { withStyles, SwipeableDrawer, Grid, Typography, Avatar, colors, Dialog, DialogContent } from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { corePushNoti } from "../core/core.actions";
import { Link, Image } from "@material-ui/icons";
import { QRCodeDisplay } from "../components/qrcode";
import { selectCurrentAccount } from "../core/auth/auth.selectors";
import { PrimaryButton } from "../components/form-utils";
import { selectReferUrl } from "../core/core.selectors";
import { getReferUrl } from "../utils/refer-url";
var ShareItem = function (_a) {
    var IconComponent = _a.IconComponent, title = _a.title, _b = _a.color, color = _b === void 0 ? colors.grey[300] : _b, onClick = _a.onClick;
    return (React.createElement("div", { onClick: onClick, style: { display: "flex", flexDirection: "column", alignItems: "center" } },
        React.createElement(Avatar, { style: { background: color, width: 48, height: 48 } },
            React.createElement(IconComponent, null)),
        React.createElement(Typography, { style: { color: "white", marginTop: "0.8em" }, variant: "body2" }, title)));
};
var mapStateToProps = function (state) { return ({
    accountName: selectCurrentAccount(state),
    referUrl: selectReferUrl(state)
}); };
var mapDispatchToProps = {
    pushNoti: corePushNoti
};
var styles = function (theme) { return ({
    buttonRoot: {
        borderRadius: "unset"
    },
    drawerRoot: {
        height: "188px",
        backgroundColor: "rgba(27,34,48, 0.8)"
    }
}); };
export var ShareButton = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)((_a = /** @class */ (function (_super) {
        __extends(ShareButton, _super);
        function ShareButton() {
            var _a;
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = (_a = {},
                _a[ShareButton.Panels.Drawer] = false,
                _a[ShareButton.Panels.QRCode] = false,
                _a);
            _this.handleExpand = function (panel) {
                _this.setState(function (prev) {
                    var _a;
                    return (_a = {},
                        _a[panel] = !prev[panel],
                        _a);
                });
            };
            return _this;
        }
        ShareButton.prototype.render = function () {
            var _this = this;
            var classes = this.props.classes || {};
            var _a = this.props, pushNoti = _a.pushNoti, accountName = _a.accountName, referUrlPrefix = _a.referUrl;
            var referUrl = getReferUrl(referUrlPrefix, accountName);
            return (React.createElement(React.Fragment, null,
                React.createElement(PrimaryButton, { onClick: this.handleExpand.bind(this, ShareButton.Panels.Drawer), size: "large", classes: { root: classes.buttonRoot }, fullWidth: true }, "\u5206\u4EAB\u9080\u8BF7"),
                React.createElement(SwipeableDrawer, { classes: { paper: classes.drawerRoot }, open: this.state[ShareButton.Panels.Drawer], onOpen: this.handleExpand.bind(this, ShareButton.Panels.Drawer), onClose: this.handleExpand.bind(this, ShareButton.Panels.Drawer), anchor: "bottom" },
                    React.createElement(Grid, { style: { height: "100%" }, container: true, alignItems: "center", justify: "space-evenly" },
                        referUrl && accountName && (React.createElement(CopyToClipboard, { text: referUrl.trim(), onCopy: function () {
                                return pushNoti("\u9080\u8BF7\u94FE\u63A5\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F", {
                                    variant: "success"
                                });
                            } },
                            React.createElement(ShareItem, { IconComponent: Link, title: "\u590D\u5236\u9080\u8BF7\u94FE\u63A5", color: colors.orange[300], onClick: this.handleExpand.bind(this, ShareButton.Panels.Drawer) }))),
                        React.createElement(ShareItem, { IconComponent: Image, color: colors.blue[300], title: "\u9080\u8BF7\u4E8C\u7EF4\u7801", onClick: function () {
                                _this.handleExpand(ShareButton.Panels.QRCode);
                                _this.handleExpand(ShareButton.Panels.Drawer);
                            } }))),
                React.createElement(Dialog, { open: this.state[ShareButton.Panels.QRCode], onClose: this.handleExpand.bind(this, ShareButton.Panels.QRCode) },
                    React.createElement(DialogContent, { style: { padding: "2em", paddingBottom: "0.5em" } },
                        React.createElement(QRCodeDisplay, { text: referUrl, filename: "cybex_invite_" + accountName + ".png" })))));
        };
        return ShareButton;
    }(React.Component)),
    _a.Panels = {
        Drawer: "Drawer",
        QRCode: "QRCode"
    },
    _a)));