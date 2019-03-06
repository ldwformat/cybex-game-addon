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
export var ToolsetContext = React.createContext({
    toolset: null
});
export var withToolset = function (Component) { return function (props) { return (React.createElement(ToolsetContext.Consumer, null, function (_a) {
    var toolset = _a.toolset;
    return React.createElement(Component, __assign({}, props, { toolset: toolset }));
})); }; };
