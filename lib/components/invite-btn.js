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
import { IconShare } from "../assets/images/icon-share";
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
var InviteBtn = /** @class */ (function (_super) {
    __extends(InviteBtn, _super);
    function InviteBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wrapper = null;
        _this.subscription = null;
        return _this;
    }
    InviteBtn.prototype.componentDidMount = function () {
        var _this = this;
        if (this.wrapper) {
            var _a = getObservables(this.wrapper), starts$ = _a.starts$, moves$_1 = _a.moves$, ends$_1 = _a.ends$;
            var _b = this.wrapper.getBoundingClientRect(), height = _b.height, width = _b.width;
            this.wrapper.style.left = window.innerWidth - width + "px";
            this.wrapper.style.top =
                Math.floor((window.innerHeight - height) * 0.75) + "px";
            this.wrapper.addEventListener("click", function (e) {
                if (_this.props.onClick) {
                    _this.props.onClick();
                }
            });
            starts$
                .pipe(switchMap(function (startP) { return ends$_1.pipe(map(function (endP) { return ({ startP: startP, endP: endP }); })); }))
                .subscribe(function (_a) {
                var startP = _a.startP, endP = _a.endP;
                if (Math.pow(startP.x - endP.x, 2) + Math.pow(startP.y - endP.y, 2) <
                    256) {
                    if (_this.props.onClick) {
                        _this.props.onClick();
                    }
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
    InviteBtn.prototype.componentWillUnmount = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    InviteBtn.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { ref: function (wrapper) { return (_this.wrapper = wrapper); }, onClick: this.props.onClick, style: {
                width: 46,
                height: 46,
                borderRadius: "46px",
                opacity: 0.8,
                background: "rgb(247,248,250)",
                boxShadow: "0px 8px 8px -4px rgba(120,129,154,0.2)",
                position: "fixed",
                textAlign: "center"
            } },
            React.createElement("img", { src: IconShare, style: { margin: "8px", width: "30px" } })));
    };
    return InviteBtn;
}(React.Component));
export { InviteBtn };
