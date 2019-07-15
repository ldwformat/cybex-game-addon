import PrivateKey from "../../../cybex/ecc/src/PrivateKey";
import { Serializable } from "../../core.models";
export declare type AuthRole = "active" | "owner" | "memo";
export interface IKeyAuth {
    fullAuth: boolean | null;
    privKey: PrivateKey | null;
    pubKeyStr: string | null;
}
export declare class KeyAuth implements Serializable {
    fullAuth: boolean | null;
    privKey: PrivateKey | null;
    pubKeyStr: string | null;
    static fromKeyAuth(params: IKeyAuth): KeyAuth;
    static deserialize(keyAuthStr: string): KeyAuth;
    serialize(): string;
}
