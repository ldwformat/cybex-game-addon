export var normalizeAssetName = function (assetName) {
    return assetName ? assetName.replace("JADE.", "") : assetName;
};
