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
import { Button, Grid } from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";
var QRCodeDisplay = /** @class */ (function (_super) {
    __extends(QRCodeDisplay, _super);
    function QRCodeDisplay() {
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
        return _this;
    }
    QRCodeDisplay.prototype.render = function () {
        var _this = this;
        var _a = this.props, text = _a.text, filename = _a.filename;
        return (React.createElement(Grid, { container: true, direction: "column", alignContent: "center" },
            React.createElement("div", { ref: function (qrcode) { return (_this.qrcode = qrcode); } },
                React.createElement(QRCode, { value: text })),
            React.createElement(Button, { color: "secondary", onClick: function (_e) { return _this.download(filename); } },
                "\u4FDD\u5B58\u4E8C\u7EF4\u7801",
                React.createElement(CloudDownload, { style: { marginLeft: "4px" }, fontSize: "small" }))));
    };
    return QRCodeDisplay;
}(React.Component));
export { QRCodeDisplay };
