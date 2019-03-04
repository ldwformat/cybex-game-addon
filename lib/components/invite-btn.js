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
    var touchEnds = fromEvent(window, "touchend").pipe(map(touchEventToCoordinate));
    var starts$ = merge(mouseDowns, touchStarts);
    var moves$ = merge(mouseMoves, touchMoves);
    var ends$ = merge(mouseUps, touchEnds);
    return { starts$: starts$, moves$: moves$, ends$: ends$ };
}
var InviteBtn = /** @class */ (function (_super) {
    __extends(InviteBtn, _super);
    function InviteBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overlay = null;
        _this.wrapper = null;
        _this.subscription = null;
        return _this;
    }
    InviteBtn.prototype.componentDidMount = function () {
        var _this = this;
        if (this.wrapper) {
            var _a = getObservables(this.wrapper), starts$ = _a.starts$, moves$_1 = _a.moves$, ends$_1 = _a.ends$;
            this.subscription = starts$
                .pipe(switchMap(function (startE) {
                if (_this.wrapper) {
                    var _a = _this.wrapper.getBoundingClientRect(), left = _a.left, top_1 = _a.top;
                    var deltaX_1 = startE.x - left;
                    var deltaY_1 = startE.y - top_1;
                    return moves$_1.pipe(takeUntil(ends$_1), map(function (origin) { return (__assign({}, origin, { deltaX: deltaX_1,
                        deltaY: deltaY_1 })); }));
                }
                return NEVER;
            }))
                .subscribe(function (_a) {
                var x = _a.x, y = _a.y, deltaX = _a.deltaX, deltaY = _a.deltaY;
                if (_this.wrapper && _this.overlay) {
                    var _b = _this.overlay.getBoundingClientRect(), top_2 = _b.top, bottom = _b.bottom, left = _b.left, right = _b.right;
                    var _c = _this.wrapper.getBoundingClientRect(), height = _c.height, width = _c.width;
                    _this.wrapper.style.left =
                        Math.min(Math.max(left, x - deltaX), right - width) + "px";
                    _this.wrapper.style.top =
                        Math.min(Math.max(top_2, y - deltaY), bottom - height) + "px";
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
        return (React.createElement("div", { ref: function (overlay) { return (_this.overlay = overlay); }, style: {
                position: "fixed",
                zIndex: -1,
                left: 0,
                top: 0,
                width: "100vw",
                height: "100vh"
            } },
            React.createElement("div", { ref: function (wrapper) { return (_this.wrapper = wrapper); }, style: {
                    width: 20,
                    height: 20,
                    background: "red",
                    position: "fixed"
                } })));
    };
    return InviteBtn;
}(React.Component));
export { InviteBtn };
