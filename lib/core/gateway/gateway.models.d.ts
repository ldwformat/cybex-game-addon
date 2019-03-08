import { CoinInfo, GetDepositAddress } from "../../utils/fetcher";
export declare class GatewayState {
    info: CoinInfo[];
    currentAsset: string | undefined;
    depositInfoList: GetDepositAddress[];
}
