declare class PublicKey {
    appendByteBuffer: any;
    Q: any;
    /** @param {Point} public key */
    constructor(Q: any);
    static fromBinary(bin: any): PublicKey;
    static fromBuffer(buffer: any): PublicKey;
    static fromPoint(point: any): PublicKey;
    /**
     *  @arg {string} public_key - like GPHXyz...
     *  @arg {string} address_prefix - like GPH
     *  @return PublicKey or `null` (if the public_key string is invalid)
     */
    static fromPublicKeyString(public_key: any, address_prefix?: string): PublicKey | null;
    /**
     *   @arg {string} public_key - like GPHXyz...
     *   @arg {string} address_prefix - like GPH
     *   @throws {Error} if public key is invalid
     *   @return PublicKey
     */
    static fromStringOrThrow(public_key: any, address_prefix?: string): PublicKey;
    static fromHex(hex: any): PublicKey;
    static fromPublicKeyStringHex(hex: any): PublicKey | null;
    toBuffer(compressed?: any): any;
    toUncompressed(): PublicKey;
    /** cyb::blockchain::address (unique but not a full public key) */
    toBlockchainAddress(): any;
    /** Alias for {@link toPublicKeyString} */
    toString(address_prefix?: string): string;
    /**
     *     Full public key
     *    {return} string
     */
    toPublicKeyString(address_prefix?: string): string;
    toAddressString(address_prefix?: string): string;
    toPtsAddy(): any;
    child(offset: any): PublicKey;
    toByteBuffer(): any;
    toHex(): any;
}
export default PublicKey;
