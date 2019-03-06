import PrivateKey from "../../../cybex/ecc/src/PrivateKey";
export declare type AuthRole = "active" | "owner" | "memo";
export declare class KeyAuth {
    fullAuth: boolean | null;
    privKey: PrivateKey | null;
    pubKeyStr: string | null;
}
