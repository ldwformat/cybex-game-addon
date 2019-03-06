export var getReferUrl = function (path, accountName) {
    return path + "?refer=" + accountName;
};
export var resolveNameFromReferUrl = function (path) {
    return (path.match(/\?refer\=(.+)(?:$|\&)/i) || [])[1];
};
