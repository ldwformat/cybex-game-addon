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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
import { calcValue } from "../utils/calc";
import { withToolset } from "../providers/toolset";
import { debounce } from "lodash";
import BigNumber from "bignumber.js";
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
    // height: "470px"
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
export var DepositModal = withToolset(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTranslation()(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currentTab: 0,
            withValue: "",
            address: "",
            fee: 0,
            feeCurrency: "",
            feeAsset: {}
        };
        _this.verifyAddress = debounce(_this.props.verifyAddress, 150);
        _this.updateFee = debounce(function () { return __awaiter(_this, void 0, void 0, function () {
            var currentAsset, currentCoinInfo, memo, res, asset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.balances) {
                            return [2 /*return*/];
                        }
                        currentAsset = this.props.currentDeposit;
                        if (!currentAsset) {
                            return [2 /*return*/, this.setState({ fee: 0 })];
                        }
                        currentCoinInfo = this.props.currentCoinInfo;
                        memo = this.state.address;
                        if (currentCoinInfo) {
                            memo = currentCoinInfo.raw.withdrawPrefix + ":" + currentCoinInfo.currency + ":" + this.state.address;
                        }
                        return [4 /*yield*/, this.props.toolset.chainAssisant.getFakeTransferFee("CYB", memo)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, this.props.toolset.fetcher.fetchAsset("CYB")];
                    case 2:
                        asset = _a.sent();
                        if (!(this.props.balances["CYB"]["value"] >= calcValue(res.amount, asset.precision))) return [3 /*break*/, 3];
                        this.setState({
                            fee: calcValue(res.amount, asset.precision),
                            feeCurrency: "CYB",
                            feeAsset: res
                        });
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.props.toolset.chainAssisant.getFakeTransferFee(currentAsset.asset, memo)];
                    case 4:
                        res = _a.sent();
                        return [4 /*yield*/, this.props.toolset.fetcher.fetchAsset(currentAsset.asset)];
                    case 5:
                        asset = _a.sent();
                        if (!asset) {
                            return [2 /*return*/];
                        }
                        this.setState({
                            fee: calcValue(res.amount, asset.precision),
                            feeCurrency: currentCoinInfo && currentCoinInfo.currency,
                            feeAsset: res
                        });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); }, 150);
        _this.setAddress = function (e) {
            _this.setState({ address: e.target.value }, function () {
                if (_this.state.address && _this.props.currentDeposit) {
                    _this.verifyAddress(_this.props.currentDeposit.type, _this.state.address);
                }
                _this.updateFee();
            });
        };
        _this.setWithValue = function (e) {
            _this.setState({
                withValue: e.target.value
            });
        };
        return _this;
    }
    class_1.prototype.componentDidMount = function () {
        if (!this.props.currentDeposit) {
            this.props.selectFirstAsset();
        }
        this.updateFee();
    };
    class_1.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.state.gateway.withdrawSuccess && this.props.state.gateway.withdrawSuccess !== prevProps.state.gateway.withdrawSuccess) {
            this.setState({
                withValue: "",
                address: "",
            });
        }
        if (this.props.currentDeposit !== prevProps.currentDeposit) {
            this.updateFee();
        }
        if (this.props.modalState != prevProps.modalState && this.props.modalState == GatewayModalState.Closed) {
            this.setState({
                withValue: "",
                address: "",
            });
        }
        if (!prevProps.balances && this.props.balances) {
            this.updateFee();
        }
    };
    class_1.prototype.render = function () {
        var _this = this;
        var _a = this.props, coinList = _a.coinList, gateway = _a.gateway, verifyAddress = _a.verifyAddress, selectAsset = _a.selectAsset, currentDeposit = _a.currentDeposit, currentCoinInfo = _a.currentCoinInfo, pushNoti = _a.pushNoti, modalState = _a.modalState, doWithdraw = _a.doWithdraw, closeModal = _a.closeModal, balances = _a.balances, state = _a.state, toolset = _a.toolset, t = _a.t;
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
        var withValueError = false;
        var withValueErrorMsg = "";
        if (this.state.withValue !== "") {
            if (currentCoinInfo &&
                Number(this.state.withValue) < +currentCoinInfo.raw.minWithdraw) {
                withValueErrorMsg = t(Dict.withValueErrorMsgLess);
                withValueError = true;
            }
            if (Number(this.state.withValue) > balance.value) {
                withValueErrorMsg = t(Dict.withValueErrorMsgOver);
                withValueError = true;
            }
        }
        var withdrawValid = addressValid &&
            currentCoinInfo &&
            Number(this.state.withValue) >= +currentCoinInfo.raw.minWithdraw &&
            (new BigNumber(balance.value).minus(Number(this.state.withValue)).toNumber() >= 0);
        var willGet = "";
        if (withValueError) {
            willGet = "0 " + (currentCoinInfo && currentCoinInfo.currency);
        }
        else {
            if (this.state.feeCurrency == "CYB") {
                willGet = Math.max(new BigNumber(this.state.withValue || 0).minus(Number(currentCoinInfo ? currentCoinInfo.raw.withdrawFee : 0)).toNumber(), 0) + " " + (currentCoinInfo && currentCoinInfo.currency);
            }
            else {
                if (new BigNumber(balance.value).minus(this.state.withValue || 0).toNumber() >= this.state.fee) {
                    willGet = Math.max(new BigNumber(this.state.withValue || 0).minus(Number(currentCoinInfo ? currentCoinInfo.raw.withdrawFee : 0)).toNumber(), 0) + " " + (currentCoinInfo && currentCoinInfo.currency);
                }
                else {
                    var left = new BigNumber(balance.value).minus(this.state.withValue || 0).toNumber();
                    willGet = Math.max(new BigNumber(this.state.withValue || 0).minus(Number(currentCoinInfo ? currentCoinInfo.raw.withdrawFee : 0)).minus(this.state.fee).plus(left).toNumber(), 0) + " " + (currentCoinInfo && currentCoinInfo.currency);
                }
            }
        }
        return (React.createElement(DialogWrapper, { open: modalState !== GatewayModalState.Closed, dialogProps: { disableBackdropClick: true }, onCloseClick: closeModal, title: t(Dict.Funding) },
            React.createElement(Tabs, { value: this.state.currentTab, onChange: function (e, currentTab) { return _this.setState({ currentTab: currentTab }); }, indicatorColor: "primary", textColor: "primary", variant: "fullWidth" },
                React.createElement(Tab, { label: t(Dict.Deposit) }),
                React.createElement(Tab, { label: t(Dict.Withdraw) })),
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
                        React.createElement(TextField, { id: "withValue", label: t(Dict.Amount), error: withValueError, helperText: (withValueError && withValueErrorMsg || " "), InputLabelProps: {
                                style: {
                                    fontSize: "17.5px"
                                }
                            }, InputProps: {
                                style: {
                                    fontSize: "16px"
                                },
                                placeholder: t(Dict.WithdrawMinimum),
                                type: "number",
                                endAdornment: React.createElement(InputAdornment, { position: "end", style: { width: "80px", textAlign: "right" } }, t(Dict.Balance) + ": " + balance.value)
                            }, value: this.state.withValue, onChange: this.setWithValue })),
                    React.createElement(FormControl, { fullWidth: true },
                        React.createElement(TextField, { id: "address", label: t(Dict.WithdrawAddress), error: addressError, helperText: (addressError && t(Dict.AddressError).replace("{symbol}", currentCoinInfo ? currentCoinInfo.currency : "")) || " ", InputLabelProps: {
                                style: {
                                    fontSize: "17.5px"
                                }
                            }, InputProps: {
                                style: {
                                    fontSize: "16px"
                                }
                            }, value: this.state.address, onChange: this.setAddress })),
                    React.createElement("div", { style: { marginTop: "12px" } }),
                    React.createElement(Grid, { container: true },
                        React.createElement(Grid, { item: true, xs: 6, sm: 3 },
                            React.createElement(FormControl, null,
                                React.createElement(InputLabel, { style: { fontSize: "17.5px", lineHeight: "20px" }, htmlFor: "minWithdraw" }, t(Dict.WithdrawMinimum)),
                                React.createElement(Input, { disabled: true, disableUnderline: true, id: "minWithdraw", value: currentCoinInfo && (currentCoinInfo.raw.minWithdraw + " " + currentCoinInfo.currency), style: { fontSize: "14px", marginTop: "30px" } }))),
                        React.createElement(Grid, { item: true, xs: 6, sm: 3 },
                            React.createElement(FormControl, null,
                                React.createElement(InputLabel, { style: { fontSize: "17.5px", lineHeight: "20px" }, htmlFor: "withdrawFee" }, t(Dict.WithdrawalFee)),
                                React.createElement(Input, { disabled: true, disableUnderline: true, id: "withdrawFee", value: currentCoinInfo && (currentCoinInfo.raw.withdrawFee + " " + currentCoinInfo.currency), style: { fontSize: "14px", marginTop: "30px" } }))),
                        React.createElement(Grid, { item: true, xs: 6, sm: 3 },
                            React.createElement(FormControl, null,
                                React.createElement(InputLabel, { style: { fontSize: "17.5px", lineHeight: "20px" }, htmlFor: "transferFee" }, t(Dict.TransferFee)),
                                React.createElement(Input, { disabled: true, disableUnderline: true, id: "transferFee", value: this.state.fee + " " + this.state.feeCurrency, style: { fontSize: "14px", marginTop: "30px" } }))),
                        React.createElement(Grid, { item: true, xs: 6, sm: 3 },
                            React.createElement(FormControl, null,
                                React.createElement(InputLabel, { style: { fontSize: "17.5px", lineHeight: "20px" }, htmlFor: "willGet" }, t(Dict.YouWillGet)),
                                React.createElement(Input, { disabled: true, disableUnderline: true, id: "willGet", value: willGet, style: { fontSize: "14px", marginTop: "30px" } })))),
                    React.createElement("div", { style: { display: "flex", flexDirection: "column", fontSize: "14px", lineHeight: "22px" } },
                        React.createElement("p", { style: { margin: 0, color: "#000000" } },
                            t(Dict.WithdrawImportant),
                            "\uFF1A"),
                        React.createElement("p", { style: { margin: 0, color: "#9b9b9b" } }, t(Dict.WithdrawImportantAddress)),
                        React.createElement("p", { style: { margin: 0, color: "#9b9b9b" } }, t(Dict.WithdrawImportantFee))),
                    React.createElement(PrimaryButton, { fullWidth: true, disabled: !withdrawValid, style: {
                            display: "flex",
                            height: "48px",
                            marginTop: "24px",
                            fontSize: "16px"
                        }, onClick: function () {
                            if (!currentCoinInfo) {
                                return;
                            }
                            var value = 0;
                            if (_this.state.feeCurrency == "CYB") {
                                value = Number(_this.state.withValue);
                            }
                            else {
                                if (new BigNumber(balance.value).minus(_this.state.withValue || 0).toNumber() < _this.state.fee) {
                                    var left = new BigNumber(balance.value).minus(_this.state.withValue || 0).toNumber();
                                    value = new BigNumber(_this.state.withValue || 0).minus(_this.state.fee).plus(left).toNumber();
                                }
                                else {
                                    value = Number(_this.state.withValue);
                                }
                            }
                            doWithdraw({
                                to: currentCoinInfo.raw.gatewayAccount,
                                fee: _this.state.feeAsset,
                                asset: currentCoinInfo.asset,
                                coinType: currentCoinInfo.currency,
                                address: _this.state.address,
                                value: value,
                                memoPrefix: currentCoinInfo.raw.withdrawPrefix
                            });
                        } }, t(Dict.Withdraw)))))));
    };
    return class_1;
}(React.Component))))));
