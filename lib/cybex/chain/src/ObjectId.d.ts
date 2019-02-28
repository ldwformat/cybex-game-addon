declare class ObjectId {
    [p: string]: any;
    constructor(space: any, type: any, instance: any);
    static fromString(value: any): any;
    static fromLong(long: any): ObjectId;
    static fromByteBuffer(b: any): ObjectId;
    toLong(): any;
    appendByteBuffer(b: any): any;
    toString(): string;
}
export default ObjectId;
