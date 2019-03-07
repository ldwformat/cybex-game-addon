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
import { gatewaySelectAsset } from "../core/gateway";
import { selectGateway, selectGatewayCurrentDepositInfo, selectGatewayCoinList } from "../core/gateway/gateway.selectors";
import { withStyles, Paper, Select, MenuItem, FormControl, Grid, Card, Button, Typography, Divider } from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { corePushNoti } from "../core/core.actions";
import { FileCopy } from "@material-ui/icons";
import { QRCodeDisplay } from "../components/qrcode";
import { withTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";
var mapStateToProps = function (state) { return ({
    gateway: selectGateway(state),
    currentDeposit: selectGatewayCurrentDepositInfo(state),
    coinList: selectGatewayCoinList(state)
}); };
var mapDispatchToProps = {
    selectAsset: gatewaySelectAsset,
    pushNoti: corePushNoti
};
var styles = function (theme) { return ({
    root: {
        height: "100%",
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
export var Deposit = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTranslation()(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.componentDidMount = function () {
        if (!this.props.currentDeposit && this.props.coinList.length) {
            this.props.selectAsset(this.props.coinList[0].asset);
        }
    };
    class_1.prototype.render = function () {
        var _a = this.props, coinList = _a.coinList, gateway = _a.gateway, selectAsset = _a.selectAsset, currentDeposit = _a.currentDeposit, pushNoti = _a.pushNoti, t = _a.t;
        var classes = this.props.classes || {};
        var currentCoin = coinList.find(function (coin) { return coin.asset === gateway.currentAsset; });
        return (React.createElement(Paper, { classes: { root: classes.root }, square: true, elevation: 0 },
            React.createElement(Grid, { className: classes.innerWrapper, container: true, direction: "column", alignItems: "center" },
                React.createElement(FormControl, { fullWidth: true },
                    React.createElement(Select, { fullWidth: true, value: gateway.currentAsset, onChange: function (e) { return selectAsset(e.target.value); }, name: "currentAsset" }, coinList.map(function (coin) { return (React.createElement(MenuItem, { key: coin.asset, value: coin.asset }, coin.currency)); }))),
                currentDeposit && (React.createElement(Grid, { style: { marginTop: "2em", textAlign: "center" }, container: true, direction: "column", alignItems: "center" },
                    React.createElement(QRCodeDisplay, { text: currentDeposit.address.trim(), filename: (currentDeposit &&
                            [
                                currentDeposit.accountName,
                                currentDeposit.type,
                                currentDeposit.address
                            ].join("_")) + ".png" }))),
                React.createElement(Card, { elevation: 0, classes: { root: classes.copyCard } }, currentDeposit && (React.createElement(CopyToClipboard, { text: currentDeposit.address, onCopy: function () {
                        return pushNoti("" + (currentDeposit && currentDeposit.type) + t(Dict.AddressCopied), {
                            variant: "success"
                        });
                    } },
                    React.createElement(Grid, { container: true, direction: "column", justify: "space-around", wrap: "nowrap", alignItems: "center", style: { width: "100%" } },
                        React.createElement(Typography, { style: {
                                overflowWrap: "break-word",
                                whiteSpace: "pre-wrap",
                                maxWidth: "84%",
                                textAlign: "center",
                                padding: "0.5em 0"
                            }, variant: "body1" }, currentDeposit.address),
                        React.createElement(Divider, { style: { width: "100%", background: "#ececec" } }),
                        React.createElement(Button, { color: "secondary" },
                            t(Dict.CopyAddress),
                            React.createElement(FileCopy, { style: { marginLeft: "4px" }, fontSize: "small" })))))))));
    };
    return class_1;
}(React.Component)))));
