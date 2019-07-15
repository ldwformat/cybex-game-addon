var RefReg = /\$\|refer\|/;
export var getReferUrl = function (path, accountName) {
    return path.search(RefReg) !== -1
        ? path.replace(RefReg, "refer=" + accountName)
        : path + "?refer=" + accountName;
};
export var resolveNameFromReferUrl = function (path) {
    return (path.match(/\?refer\=(.+?)(?:$|\&|\#|\/)/i) || [])[1];
};
