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
import { gatewaySelectAsset, gatewayModalClose, gatewaySelectFirstAsset, GatewayModalState, gatewayVerifyAddress, AddressVerifyState, gatewayWithdraw } from "../core/gateway";
import { selectGateway, selectGatewayCurrentDepositInfo, selectGatewayCoinList, selectGatewayModalState, selectGatewayAddressVerification, selectGatewayCurrentCoinInfo } from "../core/gateway/gateway.selectors";
import { withStyles, Paper, Select, MenuItem, FormControl, Grid, Card, Typography, InputLabel, Input, Tabs, Tab, InputAdornment, TextField } from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { corePushNoti } from "../core/core.actions";
import { QRCodeDisplay } from "../components/qrcode";
import { withTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";
import { DialogWrapper } from "../components/dialog-wrapper";
import { PrimaryButton } from "../components/form-utils";
import { selectBalances } from "../core/auth";
var mapStateToProps = function (state) { return ({
    modalState: selectGatewayModalState(state),
    gateway: selectGateway(state),
    balances: selectBalances(state),
    currentDeposit: selectGatewayCurrentDepositInfo(state),
    currentCoinInfo: selectGatewayCurrentCoinInfo(state),
    coinList: selectGatewayCoinList(state),
    state: state
}); };
var mapDispatchToProps = {
    doWithdraw: gatewayWithdraw,
    verifyAddress: gatewayVerifyAddress,
    selectAsset: gatewaySelectAsset,
    selectFirstAsset: gatewaySelectFirstAsset,
    closeModal: gatewayModalClose,
    pushNoti: corePushNoti
};
var styles = function (theme) { return ({
    root: {
        height: "470px"
    },
    innerWrapper: {
        margin: theme.spacing.unit * 2 + "px 0",
        // width: `calc(100% - ${theme.spacing.unit * 4}px)`,
        height: "100%",
        "&>*:not(:first-of-type)": {
            marginTop: theme.spacing.unit * 2
        }
    },
    copyCard: {
        background: "rgb(243,243,243)",
        width: "100%"
    },
    inputBase: {
        fontSize: "16px"
    },
    inputLabel: {
        fontSize: "17.6px"
    }
}); };
export var DepositModal = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTranslation()(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currentTab: 0,
            withValue: 0,
            address: ""
        };
        return _this;
    }
    class_1.prototype.componentDidMount = function () {
        if (!this.props.currentDeposit) {
            this.props.selectFirstAsset();
        }
    };
    class_1.prototype.render = function () {
        var _this = this;
        var _a = this.props, coinList = _a.coinList, gateway = _a.gateway, verifyAddress = _a.verifyAddress, selectAsset = _a.selectAsset, currentDeposit = _a.currentDeposit, currentCoinInfo = _a.currentCoinInfo, pushNoti = _a.pushNoti, modalState = _a.modalState, doWithdraw = _a.doWithdraw, closeModal = _a.closeModal, balances = _a.balances, state = _a.state, t = _a.t;
        var classes = this.props.classes || {};
        var currentCoin = coinList.find(function (coin) { return coin.asset === gateway.currentAsset; });
        var balance = (currentDeposit &&
            balances &&
            balances[currentDeposit.asset]) || { value: 0 };
        var addressError = !!this.state.address &&
            !!currentDeposit &&
            selectGatewayAddressVerification(currentDeposit.type, this.state.address)(state) === AddressVerifyState.Invalid;
        var addressValid = !!this.state.address &&
            !!currentDeposit &&
            selectGatewayAddressVerification(currentDeposit.type, this.state.address)(state) === AddressVerifyState.Valid;
        var withdrawValid = addressValid &&
            currentCoinInfo &&
            this.state.withValue >= +currentCoinInfo.raw.minWithdraw;
        this.state.withValue <= balance.value && this.state.withValue > 0;
        return (React.createElement(DialogWrapper, { open: modalState !== GatewayModalState.Closed, dialogProps: { disableBackdropClick: true }, onCloseClick: closeModal, title: t(Dict.Funding) },
            React.createElement(Tabs, { value: this.state.currentTab, onChange: function (e, currentTab) { return _this.setState({ currentTab: currentTab }); }, indicatorColor: "primary", textColor: "primary", variant: "fullWidth" },
                React.createElement(Tab, { label: t(Dict.Deposit) })),
            this.state.currentTab === 0 && (React.createElement(Paper, { classes: { root: classes.root }, square: true, elevation: 0 },
                React.createElement(Grid, { className: classes.innerWrapper, container: true, direction: "column", alignItems: "center" },
                    React.createElement(FormControl, { fullWidth: true },
                        React.createElement(InputLabel, { style: { fontSize: "17.5px" }, shrink: true, htmlFor: "currentAsset" }, t(Dict.AssetType)),
                        React.createElement(Select, { fullWidth: true, displayEmpty: true, value: gateway.currentAsset, input: React.createElement(Input, { name: "currentAsset", id: "currentAsset" }), onChange: function (e) { return selectAsset(e.target.value); }, style: { fontSize: "16px" }, name: "currentAsset" }, coinList.map(function (coin) { return (React.createElement(MenuItem, { key: coin.asset, value: coin.asset }, coin.currency)); }))),
                    currentDeposit && (React.createElement(Grid, { style: { marginTop: "2em", textAlign: "center" }, container: true, direction: "column", alignItems: "center" },
                        React.createElement(QRCodeDisplay, { text: currentDeposit.address.trim(), filename: (currentDeposit &&
                                [
                                    currentDeposit.accountName,
                                    currentDeposit.type,
                                    currentDeposit.address
                                ].join("_")) + ".png" }))),
                    React.createElement(Card, { elevation: 0, classes: { root: classes.copyCard } },
                        React.createElement(Typography, { style: {
                                overflowWrap: "break-word",
                                whiteSpace: "pre-wrap",
                                textAlign: "center",
                                fontSize: "14px",
                                padding: "24px 0"
                            }, variant: "body1" }, currentDeposit && currentDeposit.address)),
                    currentDeposit && (React.createElement(CopyToClipboard, { text: currentDeposit.address, onCopy: function () {
                            return pushNoti("" + (currentDeposit && currentDeposit.type) + t(Dict.AddressCopied), {
                                variant: "success"
                            });
                        } },
                        React.createElement(PrimaryButton, { fullWidth: true, style: {
                                height: "48px",
                                marginTop: "24px",
                                fontSize: "16px"
                            } }, t(Dict.CopyAddress))))))),
            this.state.currentTab === 1 && (React.createElement(Paper, { classes: { root: classes.root }, square: true, elevation: 0 },
                React.createElement(Grid, { className: classes.innerWrapper, container: true, direction: "column", alignItems: "center" },
                    React.createElement(FormControl, { fullWidth: true },
                        React.createElement(InputLabel, { style: { fontSize: "17.5px" }, shrink: true, htmlFor: "currentAsset" }, t(Dict.AssetType)),
                        React.createElement(Select, { fullWidth: true, displayEmpty: true, value: gateway.currentAsset, input: React.createElement(Input, { name: "currentAsset", id: "currentAsset" }), onChange: function (e) { return selectAsset(e.target.value); }, style: { fontSize: "16px" }, name: "currentAsset" }, coinList.map(function (coin) { return (React.createElement(MenuItem, { key: coin.asset, value: coin.asset }, coin.currency)); }))),
                    React.createElement(FormControl, { fullWidth: true },
                        React.createElement(InputLabel, { style: { fontSize: "17.5px" }, htmlFor: "withValue" }, t(Dict.Amount)),
                        React.createElement(Input, { id: "withValue", placeholder: t(Dict.WithdrawMinimum), value: this.state.withValue, style: { fontSize: "16px" }, onChange: function (e) {
                                return _this.setState({ withValue: Number(e.target.value) });
                            }, endAdornment: React.createElement(InputAdornment, { position: "end" }, balance.value) })),
                    React.createElement(FormControl, { fullWidth: true },
                        React.createElement(TextField, { id: "address", label: t(Dict.WithdrawAddress), error: addressError, helperText: (addressError && t(Dict.AddressError)) || " ", InputLabelProps: {
                                style: {
                                    fontSize: "17.5px"
                                }
                            }, inputProps: {
                                style: {
                                    fontSize: "16px"
                                }
                            }, value: this.state.address, onChange: function (e) {
                                return _this.setState({ address: e.target.value }, function () {
                                    if (_this.state.address && currentDeposit) {
                                        verifyAddress(currentDeposit.type, _this.state.address);
                                    }
                                });
                            } })),
                    React.createElement("div", { style: { marginTop: "12px" } }),
                    React.createElement(Grid, { container: true, wrap: "nowrap" },
                        React.createElement(FormControl, null,
                            React.createElement(InputLabel, { style: { fontSize: "17.5px" }, htmlFor: "withdrawFee" }, t(Dict.WithdrawalFee)),
                            React.createElement(Input, { disabled: true, disableUnderline: true, id: "withdrawFee", value: currentCoinInfo && currentCoinInfo.raw.withdrawFee, style: { fontSize: "16px" } })),
                        React.createElement(FormControl, null,
                            React.createElement(InputLabel, { style: { fontSize: "17.5px" }, htmlFor: "withdrawFee" }, t(Dict.YouWillGet)),
                            React.createElement(Input, { disabled: true, disableUnderline: true, id: "withdrawFee", value: Math.max(0, this.state.withValue -
                                    (currentCoinInfo
                                        ? +currentCoinInfo.raw.withdrawFee
                                        : this.state.withValue)), style: { fontSize: "16px" } }))),
                    React.createElement(PrimaryButton, { fullWidth: true, disabled: !withdrawValid, style: {
                            height: "48px",
                            marginTop: "24px",
                            fontSize: "16px"
                        }, onClick: function () {
                            if (!currentCoinInfo) {
                                return;
                            }
                            doWithdraw({
                                to: currentCoinInfo.raw.gatewayAccount,
                                asset: currentCoinInfo.asset,
                                coinType: currentCoinInfo.currency,
                                address: _this.state.address,
                                value: _this.state.withValue,
                                memoPrefix: currentCoinInfo.raw.withdrawPrefix
                            });
                        } }, t(Dict.Withdraw)))))));
    };
    return class_1;
}(React.Component)))));
