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
import QRCode from "qrcode.react";
import { Button, Grid, Typography } from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";
import { Dict } from "../providers/i18n";
import { withTranslation } from "react-i18next";
export var QRCodeDisplay = withTranslation()(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.download = function (filename) {
            if (filename === void 0) { filename = "deposit.jpg"; }
            if (!_this.qrcode) {
                return;
            }
            var canvas = _this.qrcode.getElementsByTagName("canvas")[0];
            if (!canvas) {
                return;
            }
            canvas.toBlob(function (blob) {
                if (!blob) {
                    return;
                }
                var file = new File([blob], filename, { type: "image/png" });
                var url = URL.createObjectURL(file);
                var a = document.createElement("a");
                a.download = filename;
                a.href = url;
                a.target = "_blank";
                a.dispatchEvent(new MouseEvent("click"));
            });
        };
        _this.updateQRImg = function () {
            if (_this.qrcode && _this.qrcodeImg) {
                var canvas = _this.qrcode.getElementsByTagName("canvas")[0];
                if (!canvas) {
                    return;
                }
                canvas.toBlob(function (blob) {
                    if (!blob || !_this.qrcodeImg) {
                        return;
                    }
                    var urlObj = URL.createObjectURL(blob);
                    _this.qrcodeImg.src = urlObj;
                    var revoke = function () {
                        window.URL.revokeObjectURL(urlObj);
                        if (_this.qrcodeImg) {
                            _this.qrcodeImg.removeEventListener("load", revoke);
                        }
                    };
                    _this.qrcodeImg.addEventListener("load", revoke);
                });
            }
        };
        _this.isAppleDevice = function () {
            return /iphone|ipad|ipod/i.test(navigator.userAgent);
        };
        return _this;
    }
    class_1.prototype.componentDidMount = function () {
        this.updateQRImg();
    };
    class_1.prototype.componentDidUpdate = function () {
        this.updateQRImg();
    };
    class_1.prototype.render = function () {
        var _this = this;
        var _a = this.props, text = _a.text, filename = _a.filename, t = _a.t;
        return (React.createElement(Grid, { container: true, direction: "column", alignContent: "center" },
            React.createElement("div", { ref: function (qrcode) { return (_this.qrcode = qrcode); } },
                React.createElement("div", { style: { display: "none" } },
                    React.createElement(QRCode, { value: text })),
                React.createElement("img", { style: { width: "12em", height: "12em" }, ref: function (qrcodeImg) { return (_this.qrcodeImg = qrcodeImg); } })),
            !this.isAppleDevice() ? (React.createElement(Button, { color: "secondary", onClick: function (_e) { return _this.download(filename); } },
                t(Dict.SaveQRCode),
                React.createElement(CloudDownload, { style: { marginLeft: "4px" }, fontSize: "small" }))) : (React.createElement(Typography, { align: "center", style: { margin: "0.5em" } }, t(Dict.SaveQRCodeLongPress)))));
    };
    return class_1;
}(React.Component)));
