import { CoinInfo, GetDepositAddress } from "../../utils/fetcher";
export declare class GatewayState {
    showModal: boolean;
    showWithdrawModal: boolean;
    info: CoinInfo[];
    currentAsset: string | undefined;
    depositInfoList: GetDepositAddress[];
    addressVerifyResult: {
        [coinType: string]: {
            [address: string]: boolean;
        };
    };
}
export declare enum AddressVerifyState {
    Verifing = 0,
    Valid = 1,
    Invalid = 2
}
export declare enum GatewayModalState {
    Closed = 0,
    ShowDeposit = 1,
    ShowWithdraw = 2
}
export interface WithdrawParams {
    coinType: string;
    memoPrefix: string;
    asset: string;
    value: number;
    to: string;
    address: string;
}
