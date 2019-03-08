import Serializer from "../../cybex/serializer/src/serializer";
import types from "../../cybex/serializer/src/types";
import { CoinInfo, GetDepositAddress } from "../../utils/fetcher";

export class GatewayState {
  info: CoinInfo[] = [];
  currentAsset: string | undefined = undefined;
  depositInfoList: GetDepositAddress[] = [];
}

// 地址簿
