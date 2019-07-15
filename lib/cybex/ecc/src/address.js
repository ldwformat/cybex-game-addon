import assert from "assert";
import { sha256, sha512, ripemd160 } from "./hash";
import { encode, decode } from "bs58";
import deepEqual from "deep-equal";
/**
 * Addresses are shortened non-reversable hashes of a public key.  The full PublicKey is preferred.
 */
var Address = /** @class */ (function () {
    function Address(addy) {
        this.addy = addy;
    }
    Address.fromBuffer = function (buffer) {
        var _hash = sha512(buffer);
        var addy = ripemd160(_hash);
        return new Address(addy);
    };
    Address.fromString = function (string, address_prefix) {
        if (address_prefix === void 0) { address_prefix = "CYB"; }
        var prefix = string.slice(0, address_prefix.length);
        assert.strictEqual(address_prefix, prefix, "Expecting key to begin with " + address_prefix + ", instead got " + prefix);
        var addy = string.slice(address_prefix.length);
        addy = Buffer.from(decode(addy), "binary");
        var checksum = addy.slice(-4);
        addy = addy.slice(0, -4);
        var new_checksum = ripemd160(addy);
        new_checksum = new_checksum.slice(0, 4);
        var isEqual = deepEqual(checksum, new_checksum); // 'Invalid checksum'
        if (!isEqual) {
            throw new Error("Checksum did not match");
        }
        return new Address(addy);
    };
    /** @return Address - Compressed PTS format (by default) */
    Address.fromPublic = function (public_key, compressed, version) {
        if (compressed === void 0) { compressed = true; }
        if (version === void 0) { version = 56; }
        var sha2 = sha256(public_key.toBuffer(compressed));
        // console.debug("Address", "SHA256", sha2);
        var rep = ripemd160(sha2);
        // console.debug("Address", "MD160", rep);
        var versionBuffer = Buffer.of(1);
        // console.debug("Address", "VERSION_BUFFER", versionBuffer);
        versionBuffer.writeUInt8(0xff & version, 0);
        // console.debug("Address", "VERSION_BUFFER", versionBuffer);
        var addr = Buffer.concat([versionBuffer, rep]);
        // console.debug("Address", "ADDR", addr);
        var check = sha256(addr);
        // console.debug("Address", "CHECK", check);
        check = sha256(check);
        // console.debug("Address", "CHECK SHA2", check);
        var buffer = Buffer.concat([addr, check.slice(0, 4)]);
        // console.debug("Address", "BUFFER", buffer);
        // console.debug("Address", "FINAL", new Address(ripemd160(buffer)));
        return new Address(ripemd160(buffer));
    };
    Address.prototype.toBuffer = function () {
        return this.addy;
    };
    Address.prototype.toString = function (address_prefix) {
        if (address_prefix === void 0) { address_prefix = "CYB"; }
        var checksum = ripemd160(this.addy);
        var addy = Buffer.concat([this.addy, checksum.slice(0, 4)]);
        return address_prefix + encode(addy);
    };
    return Address;
}());
export default Address;
