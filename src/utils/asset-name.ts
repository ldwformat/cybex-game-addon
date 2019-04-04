export const normalizeAssetName = (assetName: string) =>
  assetName ? assetName.replace("JADE.", "") : assetName;
