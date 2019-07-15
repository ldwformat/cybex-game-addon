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
import PatternLock from "patternlock";
// import "patternlock/dist/patternlock.css";
import { withStyles, Typography } from "@material-ui/core";
import { Colors } from "./colors";
import { connect } from "react-redux";
import { authSetWalletPass, authUnlock } from "../core/auth";
import { withTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";
import { unstable_useMediaQuery } from "@material-ui/core/useMediaQuery";
var mapDispatch = {
    setPassword: authSetWalletPass,
    unlock: authUnlock
};
var styles = function (theme) { return ({
    locker: {
        background: "transparent",
        margin: "auto",
        "&.patt-hidden ": {
            "& .patt-lines": {
                display: "none"
            }
        },
        "&.patt-error": {
            "& .patt-circ.hovered": {
                border: "3px solid " + theme.palette.error.main,
                background: theme.palette.error.light,
                opacity: 0.4
            },
            "& .patt-dots": {
                background: theme.palette.error.main
                // background: theme.palette.secondary.main
            }
        },
        "& .patt-wrap": {
            margin: 0,
            position: "relative",
            cursor: "pointer",
            "& ul, & li": {
                listStyle: "none",
                margin: 0,
                padding: 0
            }
        },
        "& .patt-dots": {
            background: Colors.btnBgPrimary,
            width: "10px",
            height: "10px",
            borderRadius: "5px",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-5px",
            marginLeft: "-5px"
            // background: theme.palette.secondary.main
        },
        "& .patt-lines": {
            background: Colors.btnBgPrimary,
            opacity: 0.5,
            borderRadius: "5px",
            height: "10px",
            position: "absolute",
            transformOrigin: "5px 5px"
        },
        "& .patt-circ.hovered": {
            boxShadow: "0 0 3px " + theme.palette.secondary.main + ", inset 0 0 3px " + theme.palette.secondary.main,
            border: "3px solid " + theme.palette.secondary.main
        },
        "& .patt-circ": {
            position: "relative",
            float: "left",
            boxSizing: "border-box",
            transition: "0.3s all",
            color: "transparent"
        }
    }
}); };
export var LockerType;
(function (LockerType) {
    LockerType[LockerType["Lock"] = 0] = "Lock";
    LockerType[LockerType["Unlock"] = 1] = "Unlock";
})(LockerType || (LockerType = {}));
export var Size;
(function (Size) {
    Size[Size["Big"] = 0] = "Big";
    Size[Size["Small"] = 1] = "Small";
})(Size || (Size = {}));
export var LockerInner = withStyles(styles)(connect(null, mapDispatch)(withTranslation()((_a = /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.wrapper = null;
            _this.lock = null;
            _this.state = {
                current: "",
                notMatchError: false
            };
            _this.setPass = function (pattern) {
                if (!_this.state.current) {
                    _this.lock && _this.lock.reset();
                    return _this.setState({
                        current: pattern
                    });
                }
                if (pattern !== _this.state.current) {
                    if (_this.lock) {
                        _this.lock.error();
                    }
                    return _this.setState({
                        notMatchError: true
                    }, function () {
                        setTimeout(function () {
                            _this.lock.reset();
                            if (_this.state.notMatchError) {
                                _this.setState({
                                    notMatchError: false,
                                    current: ""
                                });
                            }
                        }, 2000);
                    });
                }
                _this.lock && _this.lock.reset();
                return _this.props.setPassword && _this.props.setPassword(pattern);
            };
            _this.unlock = function (pattern) {
                _this.props.unlock && _this.props.unlock(pattern);
                if (_this.lock) {
                    _this.lock.reset();
                }
            };
            _this.setupLock = function () {
                if (_this.wrapper) {
                    var lock = (_this.lock = new PatternLock("#patternLocker", {
                        allowRepeat: true,
                        enableSetPattern: true,
                        margin: _this.props.size === Size.Big ? 20 : 17,
                        radius: _this.props.size === Size.Big ? 25 : 15,
                        onDraw: _this.props.type === LockerType.Lock ? _this.setPass : _this.unlock
                    }));
                }
            };
            return _this;
        }
        class_1.prototype.componentDidMount = function () {
            this.setupLock();
        };
        class_1.prototype.render = function () {
            var _this = this;
            var classes = this.props.classes || {};
            var _a = this.props, t = _a.t, type = _a.type;
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { id: "patternLocker", className: classes.locker, ref: function (wrapper) { return (_this.wrapper = wrapper); } }),
                type === LockerType.Lock && (React.createElement("div", { style: { padding: "0 48px" } },
                    this.props.type === LockerType.Lock && !this.state.current && (React.createElement(Typography, { align: "center", variant: "body1", color: "secondary" }, t(Dict.SetLockTitle))),
                    this.state.current && !this.state.notMatchError && (React.createElement(Typography, { align: "center", variant: "body1", color: "secondary" }, t(Dict.SetLockAgain))),
                    this.state.notMatchError && (React.createElement(Typography, { align: "center", variant: "body1", color: "error" }, t(Dict.SetLockError)))))));
        };
        return class_1;
    }(React.Component)),
    _a.defaultProps = { type: LockerType.Lock },
    _a))));
export var Locker = function (_a) {
    var type = _a.type;
    var size = unstable_useMediaQuery("(max-width: 599px)") ? Size.Small : Size.Big;
    return React.createElement(LockerInner, { type: type, size: size });
};
