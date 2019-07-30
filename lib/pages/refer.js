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
import { selectMyRegisterReferrer, selectMyGameReferral, selectMyRegisterReferral, selectMyGameReferrer, selectTotalRebatesByAsset, selectReferRebates, SummaryAsset, selectAccountReferUrl } from "../core/refer";
import { withStyles, Paper, List, ListItem, ListItemText, Collapse, Typography, Button, Hidden, Grid, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { corePushNoti } from "../core/core.actions";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { selectCurrentAccount } from "../core/auth/auth.selectors";
import { formatTime } from "../utils/datetime";
import { PrimaryButton } from "../components/form-utils";
import { ShareButton } from "../components/share-btn";
import { ReferModal } from "../components/refer-modal";
import { Dict } from "../providers/i18n";
import { withTranslation } from "react-i18next";
import { ListPanel, EmptyTip } from "../components/list-panel";
import { EmptyPrize } from "../icons/empty-prize";
import { EmptyInvite } from "../icons/empty-invite";
import { InviteCard } from "../components/invite-card";
import { Account, EmailOpen, ContentCopy } from "mdi-material-ui";
import { InviteSummary } from "../components/invite-summary";
import { normalizeAssetName } from "../utils/asset-name";
import { Colors } from "../components/colors";
import { MapInviteBtnPC } from "../components/invite-btn-pc";
var mapStateToProps = function (state) { return ({
    accountReferUrl: selectAccountReferUrl(state),
    accountName: selectCurrentAccount(state),
    totalRebate: selectTotalRebatesByAsset(SummaryAsset.USDT)(state),
    myRegisterReferrer: selectMyRegisterReferrer(state),
    myRegisterReferral: selectMyRegisterReferral(state),
    myGameReferrer: selectMyGameReferrer(state),
    myGameReferral: selectMyGameReferral(state),
    rebates: selectReferRebates(state)
}); };
var mapDispatchToProps = {
    pushNoti: corePushNoti
};
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
    },
    itemV: {
        padding: "12px 0"
    },
    itemH: {
        padding: "0 12px"
    },
    summary: {
        flexShrink: 0,
        flexBasis: "auto",
        height: "255px",
        flexGrow: 0
    }
}); };
var RebatesCol = [
    {
        name: "asset",
        header: Dict.AssetType,
        align: "left",
        cell: function (asset) { return normalizeAssetName(asset.symbol); }
    },
    {
        name: "should_transferValue",
        header: Dict.ToBeCleard,
        align: "center"
    },
    {
        name: "transferredValue",
        header: Dict.Cleard,
        align: "right",
        cellStyle: {
            color: Colors.primary
        }
    }
];
export var Refer = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTranslation()((_a = /** @class */ (function (_super) {
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
            _this._renderMobile = function () {
                var _a = _this.props, accountName = _a.accountName, myGameReferrer = _a.myGameReferrer, myGameReferral = _a.myGameReferral, myRegisterReferrer = _a.myRegisterReferrer, myRegisterReferral = _a.myRegisterReferral, totalRebate = _a.totalRebate, rebates = _a.rebates, t = _a.t;
                var classes = _this.props.classes || {};
                return (React.createElement(Paper, { classes: { root: classes.root }, square: true, elevation: 0 },
                    React.createElement("div", { style: { flex: "1 10 auto", overflowY: "auto" } },
                        React.createElement("div", { className: "wrapper", style: { margin: "16px", width: "calc(100% - 32px)" } },
                            React.createElement(InviteSummary, { title: "Demo", amount: totalRebate })),
                        React.createElement(List, null,
                            React.createElement(ListItem, { button: true, divider: true, onClick: _this.handleExpand.bind(_this, Refer.Panels.Rebates) },
                                React.createElement(ListItemText, { primary: t(Dict.RebateDetail) }),
                                _this.state[Refer.Panels.Rebates] ? (React.createElement(ExpandLess, null)) : (React.createElement(ExpandMore, null))),
                            React.createElement(Collapse, { in: _this.state[Refer.Panels.Rebates], timeout: "auto", unmountOnExit: true },
                                React.createElement(Table, null,
                                    React.createElement(TableHead, null,
                                        React.createElement(TableRow
                                        //  classes={{ root: classes.trh }}
                                        , { 
                                            //  classes={{ root: classes.trh }}
                                            style: { height: "40px", opacity: 0.5 } }, RebatesCol.map(function (col) { return (React.createElement(TableCell, { padding: "dense", 
                                            // classes={{ root: classes && classes.th }}
                                            key: col.name, align: col.align }, t(col.header))); }))),
                                    React.createElement(TableBody, null, rebates.map(function (item, i) { return (React.createElement(TableRow, { key: i, classes: { root: classes.tr }, style: { height: "40px", opacity: 0.8 } }, RebatesCol.map(function (col) { return (React.createElement(TableCell, { padding: "dense", classes: { root: classes.td }, style: col.cellStyle, align: col.align, key: col.name }, col.cell
                                        ? col.cell(item[col.name])
                                        : item[col.name])); }))); })))),
                            React.createElement(ListItem, { divider: true },
                                React.createElement(ListItemText, { style: { flexShrink: 0 }, primary: t(Dict.MyRegisterReferrer) }),
                                React.createElement(Typography, { className: classes.textRight + " " + classes.accountText, variant: "body1" }, (myRegisterReferrer && myRegisterReferrer.referrer) ||
                                    "-")),
                            React.createElement(ListItem, { divider: true },
                                React.createElement(ListItemText, { style: { flexShrink: 0 }, primary: t(Dict.MyGameReferrer) }),
                                (myGameReferrer && myGameReferrer.referrer && (React.createElement(Typography, { className: classes.textRight + " " + classes.accountText, variant: "body1" }, myGameReferrer && myGameReferrer.referrer))) || (React.createElement(Button, { color: "secondary", style: { padding: 0 }, onClick: _this.handleExpand.bind(_this, Refer.Panels.ReferModal) }, t(Dict.PatchReferrer)))),
                            React.createElement(ListItem, { button: true, divider: true, onClick: _this.handleExpand.bind(_this, Refer.Panels.RegisterRef) },
                                React.createElement(ListItemText, { primary: t(Dict.MyRegisterReferral) }),
                                (myRegisterReferral &&
                                    myRegisterReferral.referrals.length.toString()) ||
                                    0,
                                t(Dict.PeopleUnit),
                                " ",
                                _this.state[Refer.Panels.RegisterRef] ? (React.createElement(ExpandLess, null)) : (React.createElement(ExpandMore, null))),
                            React.createElement(Collapse, { in: _this.state[Refer.Panels.RegisterRef], timeout: "auto", unmountOnExit: true },
                                React.createElement(List, { style: { opacity: 0.5 }, disablePadding: true }, myRegisterReferral &&
                                    myRegisterReferral.referrals
                                        .sort(function (prev, next) { return (prev.ts > next.ts ? -1 : 1); })
                                        .map(function (refer) { return (React.createElement(ListItem, { key: refer.referral, divider: true },
                                        React.createElement(ListItemText, { classes: { primary: classes.accountText }, primary: refer.referral }),
                                        React.createElement(Typography, { style: { flexShrink: 0 } }, formatTime(refer.ts)))); }))),
                            React.createElement(ListItem, { button: true, divider: true, onClick: _this.handleExpand.bind(_this, Refer.Panels.GameRegisterRef) },
                                React.createElement(ListItemText, { primary: t(Dict.MyGameReferral) }),
                                (myGameReferral &&
                                    myGameReferral.referrals.length.toString()) ||
                                    0,
                                t(Dict.PeopleUnit),
                                " ",
                                _this.state[Refer.Panels.GameRegisterRef] ? (React.createElement(ExpandLess, null)) : (React.createElement(ExpandMore, null))),
                            React.createElement(Collapse, { in: _this.state[Refer.Panels.GameRegisterRef], timeout: "auto", unmountOnExit: true },
                                React.createElement(List, { style: { opacity: 0.5 }, disablePadding: true }, myGameReferral &&
                                    myGameReferral.referrals
                                        .sort(function (prev, next) { return (prev.ts > next.ts ? -1 : 1); })
                                        .map(function (refer) { return (React.createElement(ListItem, { divider: true, key: refer.referral },
                                        React.createElement(ListItemText, { classes: { primary: classes.accountText }, primary: refer.referral }),
                                        React.createElement(Typography, { style: { flexShrink: 0 } }, formatTime(refer.ts)))); }))))),
                    React.createElement(ShareButton, null)));
            };
            return _this;
        }
        Refer.prototype.render = function () {
            var _a = this.props, accountName = _a.accountName, totalRebate = _a.totalRebate, pushNoti = _a.pushNoti, myGameReferrer = _a.myGameReferrer, myGameReferral = _a.myGameReferral, myRegisterReferrer = _a.myRegisterReferrer, myRegisterReferral = _a.myRegisterReferral, rebates = _a.rebates, accountReferUrl = _a.accountReferUrl, t = _a.t;
            var classes = this.props.classes || {};
            return (React.createElement(React.Fragment, null,
                React.createElement(Hidden, { smUp: true }, /* for Mobile */ this._renderMobile()),
                React.createElement(Hidden, { xsDown: true },
                    React.createElement(Grid, { item: true, xs: true, container: true, direction: "column", alignItems: "center", wrap: "nowrap", className: classes.itemV, style: { height: "100%", overflow: "auto" } },
                        React.createElement(Grid, { item: true, xs: true, container: true, className: classes.itemV, classes: { container: classes.summary } },
                            React.createElement(Grid, { item: true, className: classes.itemH, container: true, xs: 6 },
                                React.createElement(InviteSummary, { title: "Demo", amount: totalRebate })),
                            React.createElement(Grid, { item: true, className: classes.itemH, container: true, xs: 6 },
                                React.createElement(ListPanel, { listData: rebates, emptyComponent: React.createElement(EmptyTip, { IconComponent: EmptyPrize, title: t(Dict.EmptyRebate) }), colConfig: RebatesCol, title: t(Dict.RebateDetail) }))),
                        React.createElement(Grid, { item: true, container: true, className: classes.itemV, style: { flexShrink: 0 } },
                            React.createElement(Grid, { item: true, className: classes.itemH, xs: 4 },
                                React.createElement(InviteCard, { title: t(Dict.MyRefererCode), color: Colors.btnIcon.purple, IconComponent: EmailOpen },
                                    React.createElement(Typography, { variant: "h4", style: {
                                            overflowWrap: "break-word",
                                            maxWidth: "100%"
                                        }, align: "center" }, accountName ? accountName : "-"),
                                    accountName && (React.createElement(CopyToClipboard, { text: accountName, onCopy: function () {
                                            return pushNoti(t(Dict.ReferCodeCopied), {
                                                variant: "success"
                                            });
                                        } },
                                        React.createElement(PrimaryButton, { size: "large", style: {
                                                fontSize: "14px",
                                                marginLeft: "0.2em"
                                            } },
                                            React.createElement(ContentCopy, { style: {
                                                    marginRight: "0.3em",
                                                    fontSize: "18px"
                                                } }),
                                            t(Dict.Copy)))))),
                            React.createElement(Grid, { item: true, className: classes.itemH, xs: 4 },
                                React.createElement(InviteCard, { title: t(Dict.MyRegisterReferrer), color: Colors.btnIcon.blue, IconComponent: Account },
                                    React.createElement(Typography, { variant: "h4", align: "center" }, (myRegisterReferrer &&
                                        myRegisterReferrer.referrer) ||
                                        "-"))),
                            React.createElement(Grid, { item: true, className: classes.itemH, xs: 4 },
                                React.createElement(InviteCard, { title: t(Dict.MyGameReferrer), color: Colors.btnIcon.yellow, IconComponent: Account },
                                    React.createElement(Typography, { variant: "h4", align: "center" }, (myGameReferrer && myGameReferrer.referrer) || (React.createElement(PrimaryButton, { size: "large", style: { fontSize: "14px", width: "16em" }, onClick: this.handleExpand.bind(this, Refer.Panels.ReferModal) }, t(Dict.PatchReferrer))))))),
                        React.createElement(Grid, { item: true, xs: true, container: true, className: classes.itemV, 
                            //  spacing={24}
                            style: { minHeight: "231px" } },
                            React.createElement(Grid, { item: true, className: classes.itemH, container: true, xs: 6 },
                                React.createElement(ListPanel, { listData: (myRegisterReferral &&
                                        myRegisterReferral.referrals) ||
                                        [], emptyComponent: React.createElement(EmptyTip, { IconComponent: EmptyInvite, title: t(Dict.EmptyRegisterReferral) }), colConfig: [
                                        {
                                            name: "referral",
                                            header: Dict.ReferralName,
                                            align: "left"
                                        },
                                        {
                                            name: "ts",
                                            header: Dict.InviteTime,
                                            cell: function (ts) { return formatTime(ts); },
                                            align: "right"
                                        }
                                    ], title: t(Dict.MyRegisterReferral) + " (" + ((myRegisterReferral &&
                                        myRegisterReferral.referrals.length) ||
                                        0) + t(Dict.PeopleUnit) + ")" })),
                            React.createElement(Grid, { item: true, className: classes.itemH, container: true, xs: 6 },
                                React.createElement(ListPanel, { listData: (myGameReferral && myGameReferral.referrals) || [], emptyComponent: React.createElement(EmptyTip, { IconComponent: EmptyInvite, title: t(Dict.EmptyGameReferral) }), colConfig: [
                                        {
                                            name: "referral",
                                            header: Dict.ReferralName,
                                            align: "left"
                                        },
                                        {
                                            name: "ts",
                                            header: Dict.InviteTime,
                                            cell: function (ts) { return formatTime(ts); },
                                            align: "right"
                                        }
                                    ], title: t(Dict.MyGameReferral) + " (" + ((myGameReferral &&
                                        myGameReferral.referrals.length) ||
                                        0) + t(Dict.PeopleUnit) + ")" })))),
                    React.createElement(MapInviteBtnPC, { copyText: t(Dict.CopyShareLinkPrefix) + " " + accountReferUrl, accountName: accountName, accountReferUrl: accountReferUrl, onCopyLinkClick: function () {
                            return pushNoti(t(Dict.ShareLinkCopied), {
                                variant: "success"
                            });
                        }, onHelpClick: function () { return void 0; } })),
                React.createElement(ReferModal, { isModalShowing: this.state[Refer.Panels.ReferModal], onModalClose: this.handleExpand.bind(this, Refer.Panels.ReferModal) })));
        };
        return Refer;
    }(React.Component)),
    _a.Panels = {
        RegisterRef: "RegisterRef",
        GameRegisterRef: "GameRegisterRef",
        Drawer: "Drawer",
        Rebates: "Rebates",
        ReferModal: "ReferModal"
    },
    _a))));
export default Refer;
