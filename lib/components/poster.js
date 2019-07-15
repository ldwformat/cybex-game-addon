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
import { QRCode } from "./../utils/qrcode";
import { Button, Grid, Typography, Dialog, DialogContent } from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";
import { Dict } from "../providers/i18n";
import { withTranslation } from "react-i18next";
import { findFirstEmptyZone } from "../utils/canvas-helper";
import * as PosterImgs from "../assets/images/poster";
function drawCanvasToImg(canvas, img) {
    canvas.toBlob(function (blob) {
        if (!blob || !img) {
            return;
        }
        var urlObj = URL.createObjectURL(blob);
        img.src = urlObj;
        // let revoke = () => {
        //   window.URL.revokeObjectURL(urlObj);
        //   if (img) {
        //     img.removeEventListener("load", revoke);
        //   }
        // };
        // img.addEventListener("load", revoke);
    });
}
export var PosterDisplay = withTranslation()(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.download = function (filename) {
            if (filename === void 0) { filename = "deposit.jpg"; }
            if (!_this.qrcodeImg || !_this.qrCanvas) {
                return;
            }
            var canvas = _this.qrCanvas;
            // let canvas = this.qrcode.getElementsByTagName("canvas")[0];
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
        _this.updateQRImg = function () { return __awaiter(_this, void 0, void 0, function () {
            var posterBase64, posterImg, posterCanvas, posterCtx, posterSpace, canvas, oriPosterImg, codeWrapper, domedCodeWrapper, codeImg;
            var _this = this;
            return __generator(this, function (_a) {
                posterBase64 = PosterImgs[this.props.t(Dict.Poster)];
                posterImg = document.createElement("img");
                posterImg.src = posterBase64;
                posterCanvas = (this.qrCanvas = document.createElement("canvas"));
                posterCanvas.width = posterImg.width;
                posterCanvas.height = posterImg.height;
                posterCtx = posterCanvas.getContext("2d");
                posterCtx.drawImage(posterImg, 0, 0);
                posterSpace = findFirstEmptyZone(posterCtx, posterCanvas.width, posterCanvas.height, 50);
                if (!posterSpace) {
                    if (this.qrcode && this.qrcodeImg) {
                        canvas = this.qrcode.getElementsByTagName("canvas")[0];
                        if (!canvas) {
                            return [2 /*return*/];
                        }
                        drawCanvasToImg(canvas, this.qrcodeImg);
                    }
                    return [2 /*return*/];
                }
                posterSpace;
                oriPosterImg = document.getElementById("$POSTER");
                if (oriPosterImg) {
                    oriPosterImg.remove();
                }
                codeWrapper = document.createElement("div");
                codeWrapper.style.zIndex = "-1";
                codeWrapper.style.position = "fixed";
                codeWrapper.style.top = "0";
                codeWrapper.style.width = "0";
                codeWrapper.style.height = "0";
                codeWrapper.style.overflow = "hidden";
                codeWrapper.id = "$POSTER";
                new QRCode(codeWrapper, {
                    text: this.props.text,
                    width: posterSpace.width - 4,
                    height: posterSpace.height - 8,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                document.body.prepend(codeWrapper);
                domedCodeWrapper = document.getElementById("$POSTER");
                if (!domedCodeWrapper) {
                    return [2 /*return*/];
                }
                codeImg = (domedCodeWrapper.getElementsByTagName("img") || [])[0];
                if (!codeImg) {
                    return [2 /*return*/];
                }
                codeImg.addEventListener("load", function () {
                    if (!posterSpace) {
                        return;
                    }
                    posterCtx.drawImage(codeImg, posterSpace.left + 2, posterSpace.top + 4);
                    if (_this.qrcodeImg) {
                        drawCanvasToImg(posterCanvas, _this.qrcodeImg);
                    }
                });
                return [2 /*return*/];
            });
        }); };
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
    class_1.prototype.componentWillUnmount = function () {
        var domedCodeWrapper = document.getElementById("$POSTER");
        if (domedCodeWrapper) {
            domedCodeWrapper.remove();
        }
    };
    class_1.prototype.render = function () {
        var _this = this;
        var _a = this.props, text = _a.text, filename = _a.filename, t = _a.t;
        return (React.createElement(Grid, { container: true, direction: "column", alignContent: "center" },
            React.createElement("div", { ref: function (qrcode) { return (_this.qrcode = qrcode); } },
                React.createElement("div", { style: { display: "none" } }),
                React.createElement("img", { style: { width: "12em" }, ref: function (qrcodeImg) { return (_this.qrcodeImg = qrcodeImg); } })),
            !this.isAppleDevice() ? (React.createElement(Button, { color: "secondary", onClick: function (_e) { return _this.download(filename); } },
                t(Dict.SaveQRCode),
                React.createElement(CloudDownload, { style: { marginLeft: "4px" }, fontSize: "small" }))) : (React.createElement(Typography, { align: "center", style: { margin: "0.5em" } }, t(Dict.SaveQRCodeLongPress)))));
    };
    return class_1;
}(React.Component)));
export var Poster = function (_a) {
    var open = _a.open, onClose = _a.onClose, posterLink = _a.posterLink, filename = _a.filename;
    return (React.createElement(Dialog, { open: open, onClose: onClose },
        React.createElement(DialogContent, { style: { padding: "2em", paddingBottom: "0.5em" } },
            React.createElement(PosterDisplay, { text: posterLink, filename: filename }))));
};
