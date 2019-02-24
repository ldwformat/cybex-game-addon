import Serializer from "src/cybex/serializer/src/serializer";
import types from "src/cybex/serializer/src/types";

export class GatewayState {
  info: CybexGateway.CoinInfo[] = [];
  currentAsset: string | null = null;
  depositInfoList: CybexGateway.GetDepositAddress[] = [];
}

// 地址簿
