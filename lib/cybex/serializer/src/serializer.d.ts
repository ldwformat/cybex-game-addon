declare class Serializer<T> {
    static printDebug: any;
    operation_name: any;
    types: any;
    keys: any;
    constructor(operation_name: any, types?: any);
    fromByteBuffer(b: any): {};
    appendByteBuffer(b: any, object: any): void;
    fromObject(serialized_object: T): {};
    /**
     * @arg {boolean} [debug.use_default = false] - more template friendly
     * @arg {boolean} [debug.annotate = false] - add user-friendly information
     */
    toObject(serialized_object?: {}, debug?: {
        use_default: boolean;
        annotate: boolean;
    }): {};
    /** Sort by the first element in a operation */
    compare(a: any, b: any): any;
    fromHex(hex: any): {};
    fromBuffer(buffer: any): {};
    toHex(object: any): any;
    toByteBuffer(object: any): any;
    toBuffer(object: any): any;
}
export default Serializer;