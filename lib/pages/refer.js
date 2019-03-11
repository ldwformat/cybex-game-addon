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
import { selectMyRegisterReferrer, selectMyGameReferral, selectMyRegisterReferral, selectMyGameReferrer } from "../core/refer";
import { withStyles, Paper, List, ListItem, ListItemText, Collapse, Typography, Button } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { selectCurrentAccount } from "../core/auth/auth.selectors";
import { ReferCode } from "../components/refer-code";
import { formatTime } from "../utils/datetime";
import { ShareButton } from "../components/share-btn";
import { ReferModal } from "../components/refer-modal";
import { Dict } from "../providers/i18n";
import { withTranslation } from "react-i18next";
var mapStateToProps = function (state) { return ({
    accountName: selectCurrentAccount(state),
    myRegisterReferrer: selectMyRegisterReferrer(state),
    myRegisterReferral: selectMyRegisterReferral(state),
    myGameReferrer: selectMyGameReferrer(state),
    myGameReferral: selectMyGameReferral(state)
}); };
var styles = function (theme) { return ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
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
    },
    buttonRoot: {
        borderRadius: "unset"
    },
    accountText: {
        flexShrink: 1,
        wordBreak: "break-word"
    },
    textRight: {
        textAlign: "right"
    },
    noShrink: {
        flexShrink: 0
    }
}); };
export var Refer = connect(mapStateToProps)(withStyles(styles)(withTranslation()((_a = /** @class */ (function (_super) {
        __extends(Refer, _super);
        function Refer() {
            var _a;
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = (_a = {},
                _a[Refer.Panels.RegisterRef] = false,
                _a[Refer.Panels.GameRegisterRef] = false,
                _a[Refer.Panels.Drawer] = false,
                _a[Refer.Panels.ReferModal] = false,
                _a);
            _this.componentWillUnmount = function () {
                var _a;
                _this.setState((_a = {},
                    _a[Refer.Panels.RegisterRef] = false,
                    _a[Refer.Panels.GameRegisterRef] = false,
                    _a[Refer.Panels.Drawer] = false,
                    _a[Refer.Panels.ReferModal] = false,
                    _a));
            };
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
        Refer.prototype.render = function () {
            var _a = this.props, accountName = _a.accountName, myGameReferrer = _a.myGameReferrer, myGameReferral = _a.myGameReferral, myRegisterReferrer = _a.myRegisterReferrer, myRegisterReferral = _a.myRegisterReferral, t = _a.t;
            var classes = this.props.classes || {};
            return (React.createElement(Paper, { classes: { root: classes.root }, square: true, elevation: 0 },
                React.createElement("div", { style: { flex: "1 10 auto", overflowY: "auto" } },
                    React.createElement(ReferCode, { code: accountName }),
                    React.createElement(List, null,
                        React.createElement(ListItem, { divider: true },
                            React.createElement(ListItemText, { style: { flexShrink: 0 }, primary: t(Dict.MyRegisterReferrer) }),
                            React.createElement(Typography, { className: classes.textRight + " " + classes.accountText, variant: "body1" }, (myRegisterReferrer && myRegisterReferrer.referrer) ||
                                "-")),
                        React.createElement(ListItem, { divider: true },
                            React.createElement(ListItemText, { style: { flexShrink: 0 }, primary: t(Dict.MyGameReferrer) }),
                            (myGameReferrer && myGameReferrer.referrer && (React.createElement(Typography, { className: classes.textRight + " " + classes.accountText, variant: "body1" }, myGameReferrer && myGameReferrer.referrer))) || (React.createElement(Button, { color: "secondary", style: { padding: 0 }, onClick: this.handleExpand.bind(this, Refer.Panels.ReferModal) }, t(Dict.PatchReferrer)))),
                        React.createElement(ListItem, { button: true, divider: true, onClick: this.handleExpand.bind(this, Refer.Panels.RegisterRef) },
                            React.createElement(ListItemText, { primary: t(Dict.MyRegisterReferral) }),
                            (myRegisterReferral &&
                                myRegisterReferral.referrals.length.toString()) ||
                                0,
                            t(Dict.PeopleUnit),
                            " ",
                            this.state[Refer.Panels.RegisterRef] ? (React.createElement(ExpandLess, null)) : (React.createElement(ExpandMore, null))),
                        React.createElement(Collapse, { in: this.state[Refer.Panels.RegisterRef], timeout: "auto", unmountOnExit: true },
                            React.createElement(List, { style: { opacity: 0.5 }, disablePadding: true }, myRegisterReferral &&
                                myRegisterReferral.referrals.map(function (refer) { return (React.createElement(ListItem, { key: refer.referral, divider: true },
                                    React.createElement(ListItemText, { classes: { primary: classes.accountText }, primary: refer.referral }),
                                    React.createElement(Typography, { style: { flexShrink: 0 } }, formatTime(refer.ts)))); }))),
                        React.createElement(ListItem, { button: true, divider: true, onClick: this.handleExpand.bind(this, Refer.Panels.GameRegisterRef) },
                            React.createElement(ListItemText, { primary: t(Dict.MyGameReferral) }),
                            (myGameReferral &&
                                myGameReferral.referrals.length.toString()) ||
                                0,
                            t(Dict.PeopleUnit),
                            " ",
                            this.state[Refer.Panels.GameRegisterRef] ? (React.createElement(ExpandLess, null)) : (React.createElement(ExpandMore, null))),
                        React.createElement(Collapse, { in: this.state[Refer.Panels.GameRegisterRef], timeout: "auto", unmountOnExit: true },
                            React.createElement(List, { style: { opacity: 0.5 }, disablePadding: true }, myGameReferral &&
                                myGameReferral.referrals.map(function (refer) { return (React.createElement(ListItem, { divider: true, key: refer.referral },
                                    React.createElement(ListItemText, { classes: { primary: classes.accountText }, primary: refer.referral }),
                                    React.createElement(Typography, { style: { flexShrink: 0 } }, formatTime(refer.ts)))); }))))),
                React.createElement(ShareButton, null),
                React.createElement(ReferModal, { isModalShowing: this.state[Refer.Panels.ReferModal], onModalClose: this.handleExpand.bind(this, Refer.Panels.ReferModal) })));
        };
        return Refer;
    }(React.Component)),
    _a.Panels = {
        RegisterRef: "RegisterRef",
        GameRegisterRef: "GameRegisterRef",
        Drawer: "Drawer",
        ReferModal: "ReferModal"
    },
    _a))));
export default Refer;
