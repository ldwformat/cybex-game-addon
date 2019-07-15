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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from "react";
import { fromEvent, merge, NEVER } from "rxjs";
import { map, takeUntil, switchMap } from "rxjs/operators";
import { Colors } from "./colors";
import { Fab, withStyles } from "@material-ui/core";
import { MoreVert, Image, Link, HelpOutline } from "@material-ui/icons";
import CopyToClipboard from "react-copy-to-clipboard";
import { Poster } from "./poster";
import { Panels } from "./share-btn";
import { DialogWrapper } from "./dialog-wrapper";
import { Rules } from "../pages/refer-rule";
function getObservables(domItem) {
    var mouseEventToCoordinate = function (mouseEvent) {
        mouseEvent.preventDefault();
        return {
            x: mouseEvent.clientX,
            y: mouseEvent.clientY
        };
    };
    var touchEventToCoordinate = function (touchEvent) {
        touchEvent.preventDefault();
        touchEvent.stopPropagation();
        return {
            x: touchEvent.changedTouches[0].clientX,
            y: touchEvent.changedTouches[0].clientY
        };
    };
    var mouseDowns = fromEvent(domItem, "mousedown").pipe(map(mouseEventToCoordinate));
    var mouseMoves = fromEvent(window, "mousemove").pipe(map(mouseEventToCoordinate));
    var mouseUps = fromEvent(window, "mouseup").pipe(map(mouseEventToCoordinate));
    var touchStarts = fromEvent(domItem, "touchstart").pipe(map(touchEventToCoordinate));
    var touchMoves = fromEvent(domItem, "touchmove").pipe(map(touchEventToCoordinate));
    var touchEnds = merge(fromEvent(domItem, "touchend")).pipe(map(touchEventToCoordinate));
    var starts$ = merge(mouseDowns, touchStarts);
    var moves$ = merge(mouseMoves, touchMoves);
    var ends$ = merge(mouseUps, touchEnds);
    return { starts$: starts$, moves$: moves$, ends$: ends$ };
}
var menuBtnStyle = function (left, top, bgcolor) { return ({
    position: "absolute",
    width: "52px",
    height: "52px",
    left: left + "px",
    top: top + "px",
    boxShadow: "unset",
    transition: "0.2s all",
    backgroundColor: bgcolor
}); };
export var MenuBtn = function (_a) {
    var onClick = _a.onClick, open = _a.open;
    return (React.createElement(Fab, { onClick: onClick, style: __assign({}, menuBtnStyle(0, 0, Colors.btnBgPrimary)) },
        React.createElement(MoreVert, { style: {
                transform: "rotate(" + (open ? -90 : 0) + "deg)",
                transition: "transform 0.2s",
                color: "white"
            }, fontSize: "large" })));
};
var helpBtnStyle = {
    root: {
        backgroundColor: Colors.btnIcon.yellow
        // "&:hover": {
        //   backgroundColor: color[900]
        // }
    }
};
export var HelpBtn = withStyles(helpBtnStyle)(function (_a) {
    var onClick = _a.onClick, open = _a.open, classes = _a.classes;
    return (React.createElement(Fab, { className: classes.root, onClick: onClick, style: open ? menuBtnStyle(-104, -0, Colors.btnIcon.yellow) : menuBtnStyle(0, 0, Colors.btnIcon.yellow) },
        React.createElement(HelpOutline, { style: { color: "white" }, fontSize: "large" })));
});
var InviteBtnPC = /** @class */ (function (_super) {
    __extends(InviteBtnPC, _super);
    function InviteBtnPC() {
        var _a;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wrapper = null;
        _this.subscription = null;
        _this.state = (_a = {},
            _a[Panels.Drawer] = false,
            _a[Panels.QRCode] = false,
            _a[Panels.RefReadme] = false,
            _a);
        _this.switchMenu = function (e) {
            console.debug("E: ", e);
            e.stopPropagation();
            _this.handleExpand(Panels.Drawer);
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
    InviteBtnPC.prototype.componentDidMount = function () {
        var _this = this;
        if (this.wrapper) {
            var _a = getObservables(this.wrapper), starts$ = _a.starts$, moves$_1 = _a.moves$, ends$_1 = _a.ends$;
            var _b = this.wrapper.getBoundingClientRect(), height = _b.height, width = _b.width;
            this.wrapper.style.left = window.innerWidth - width + "px";
            this.wrapper.style.top =
                Math.floor((window.innerHeight - height) * 0.75) + "px";
            var closeSub = fromEvent(window, "click").subscribe(function (e) {
                var _a;
                console.debug("Close: ", e);
                if (_this.state[Panels.Drawer]) {
                    _this.setState((_a = {},
                        _a[Panels.Drawer] = false,
                        _a));
                }
            });
            this.subscription = starts$
                .pipe(switchMap(function (startE) {
                if (_this.wrapper) {
                    var _a = _this.wrapper.getBoundingClientRect(), left_1 = _a.left, top_1 = _a.top;
                    var deltaX_1 = startE.x - left_1;
                    var deltaY_1 = startE.y - top_1;
                    return moves$_1.pipe(takeUntil(ends$_1), map(function (origin) { return (__assign({}, origin, { startX: left_1, startY: top_1, deltaX: deltaX_1,
                        deltaY: deltaY_1 })); }));
                }
                return NEVER;
            }))
                .subscribe(function (_a) {
                var x = _a.x, y = _a.y, deltaX = _a.deltaX, deltaY = _a.deltaY;
                if (_this.wrapper) {
                    var _b = _this.wrapper.getBoundingClientRect(), height_1 = _b.height, width_1 = _b.width;
                    _this.wrapper.style.left =
                        Math.min(Math.max(0, x - deltaX), window.innerWidth - width_1) +
                            "px";
                    _this.wrapper.style.top =
                        Math.min(Math.max(0, y - deltaY), window.innerHeight - height_1) +
                            "px";
                }
            });
        }
    };
    InviteBtnPC.prototype.componentWillUnmount = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    InviteBtnPC.prototype.render = function () {
        var _this = this;
        var _a = this.props, accountReferUrl = _a.accountReferUrl, accountName = _a.accountName;
        var menuOpen = this.state[Panels.Drawer];
        return (React.createElement("div", { ref: function (wrapper) { return (_this.wrapper = wrapper); }, style: {
                width: 52,
                height: 52,
                borderRadius: "52px",
                position: "fixed"
            } },
            React.createElement(Fab, { onClick: this.handleExpand.bind(this, Panels.QRCode), 
                // color="secondary"
                style: menuOpen ? menuBtnStyle(-66, -66, Colors.btnIcon.blue) : menuBtnStyle(0, 0, Colors.btnIcon.blue) },
                React.createElement(Image, { style: { color: "white" }, fontSize: "large" })),
            React.createElement(CopyToClipboard, { text: this.props.copyText, onCopy: this.props.onCopyLinkClick },
                React.createElement(Fab
                // color="primary"
                , { 
                    // color="primary"
                    style: menuOpen ? menuBtnStyle(-0, -104, Colors.btnIcon.purple) : menuBtnStyle(0, 0, Colors.btnIcon.purple) },
                    React.createElement(Link, { style: { color: "white" }, fontSize: "large" }))),
            React.createElement(HelpBtn, { open: menuOpen, onClick: this.handleExpand.bind(this, Panels.RefReadme) }),
            React.createElement(MenuBtn, { open: menuOpen, onClick: this.switchMenu }),
            React.createElement(DialogWrapper, { hideHeader: true, open: this.state[Panels.RefReadme], onCloseClick: this.handleExpand.bind(this, Panels.RefReadme) },
                React.createElement(Rules, null)),
            React.createElement(Poster, { open: this.state[Panels.QRCode], onClose: this.handleExpand.bind(this, Panels.QRCode), posterLink: accountReferUrl, filename: "cybex_invite_" + accountName + ".png" })));
    };
    return InviteBtnPC;
}(React.Component));
export { InviteBtnPC };
