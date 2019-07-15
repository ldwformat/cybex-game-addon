/// <reference types="node" />
import PublicKey from "../../ecc/src/PublicKey";
declare class FastParser {
    static fixed_data(b: any, len: any, buffer?: any): Buffer | undefined;
    static public_key(b: any, public_key?: any): PublicKey | undefined;
    static ripemd160(b: any, ripemd160?: any): Buffer | undefined;
    static time_point_sec(b: any, epoch: any): Date | undefined;
}
export default FastParser;
