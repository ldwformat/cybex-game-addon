/**
 * Addresses are shortened non-reversable hashes of a public key.  The full PublicKey is preferred.
 */
declare class Address {
    [p: string]: any;
    constructor(addy: any);
    static fromBuffer(buffer: any): Address;
    static fromString(string: any, address_prefix?: string): Address;
    /** @return Address - Compressed PTS format (by default) */
    static fromPublic(public_key: any, compressed?: boolean, version?: number): Address;
    toBuffer(): any;
    toString(address_prefix?: string): string;
}
export default Address;
