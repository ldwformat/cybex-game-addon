export var resolvePath = function () {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    return paths
        .slice(0, -1)
        .map(function (path) { return path.replace(/\/$/, ""); })
        .concat(paths.slice(-1))
        .join("/");
};
