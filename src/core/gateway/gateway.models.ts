import Serializer from "../../cybex/serializer/src/serializer";
import types from "../../cybex/serializer/src/types";
import { CoinInfo, GetDepositAddress } from "../../utils/fetcher";
export class GatewayState {
  showModal = false;
  showWithdrawModal = false;
  info: CoinInfo[] = [];
  currentAsset: string | undefined = undefined;
  depositInfoList: GetDepositAddress[] = [];
  addressVerifyResult: {
    [coinType: string]: { [address: string]: boolean };
  } = {};
  withdrawSuccess = false;
}

// 地址簿
export enum AddressVerifyState {
  Verifing,
  Valid,
  Invalid
}

export enum GatewayModalState {
  Closed,
  ShowDeposit,
  ShowWithdraw
}

export interface WithdrawParams {
  coinType: string;
  memoPrefix: string;
  asset: string;
  fee: { asset_id: string; amount: number | string };
  value: number;
  to: string;
  address: string;
}
