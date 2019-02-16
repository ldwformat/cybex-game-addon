import BigInteger from "bigi";
import { getCurveByName, Point } from "ecurve";
const secp256k1 = getCurveByName("secp256k1");
import assert from "assert";
import { decode, encode } from "bs58";
import deepEqual from "deep-equal";
import { ripemd160, sha256, sha512 } from "./hash";

const { G, n } = secp256k1;

class PublicKey {
  appendByteBuffer;
  Q: any;
  /** @param {Point} public key */
  constructor(Q) {
    this.Q = Q;
  }

  static fromBinary(bin) {
    return PublicKey.fromBuffer(Buffer.from(bin, "binary"));
  }

  static fromBuffer(buffer) {
    if (
      buffer.toString("hex") ===
      "000000000000000000000000000000000000000000000000000000000000000000"
    ) {
      return new PublicKey(null);
    }
    return new PublicKey(Point.decodeFrom(secp256k1, buffer));
  }

  static fromPoint(point) {
    return new PublicKey(point);
  }

  /**
   *  @arg {string} public_key - like GPHXyz...
   *  @arg {string} address_prefix - like GPH
   *  @return PublicKey or `null` (if the public_key string is invalid)
   */
  static fromPublicKeyString(public_key, address_prefix = "CYB") {
    try {
      return PublicKey.fromStringOrThrow(public_key, address_prefix);
    } catch (e) {
      return null;
    }
  }

  /**
   *   @arg {string} public_key - like GPHXyz...
   *   @arg {string} address_prefix - like GPH
   *   @throws {Error} if public key is invalid
   *   @return PublicKey
   */
  static fromStringOrThrow(public_key, address_prefix = "CYB") {
    var prefix = public_key.slice(0, address_prefix.length);
    assert.strictEqual(
      address_prefix,
      prefix,
      `Expecting key to begin with ${address_prefix}, instead got ${prefix}`
    );
    public_key = public_key.slice(address_prefix.length);

    public_key = Buffer.from(decode(public_key), "binary");
    var checksum = public_key.slice(-4);
    public_key = public_key.slice(0, -4);
    var new_checksum = ripemd160(public_key);
    new_checksum = new_checksum.slice(0, 4);
    var isEqual = deepEqual(checksum, new_checksum); // , 'Invalid checksum'
    if (!isEqual) {
      throw new Error("Checksum did not match");
    }
    return PublicKey.fromBuffer(public_key);
  }

  static fromHex(hex) {
    return PublicKey.fromBuffer(Buffer.from(hex, "hex"));
  }

  static fromPublicKeyStringHex(hex) {
    return PublicKey.fromPublicKeyString(Buffer.from(hex, "hex"));
  }

  toBuffer(compressed = this.Q ? this.Q.compressed : null) {
    if (this.Q === null) {
      return Buffer.from(
        "000000000000000000000000000000000000000000000000000000000000000000",
        "hex"
      );
    }
    return this.Q.getEncoded(compressed);
  }

  toUncompressed() {
    var buf = this.Q.getEncoded(false);
    var point = Point.decodeFrom(secp256k1, buf);
    return PublicKey.fromPoint(point);
  }

  /** cyb::blockchain::address (unique but not a full public key) */
  toBlockchainAddress() {
    var pub_buf = this.toBuffer();
    var pub_sha = sha512(pub_buf);
    return ripemd160(pub_sha);
  }

  /** Alias for {@link toPublicKeyString} */
  toString(address_prefix = "CYB") {
    return this.toPublicKeyString(address_prefix);
  }

  /**
   *     Full public key
   *    {return} string
   */
  toPublicKeyString(address_prefix = "CYB") {
    var pub_buf = this.toBuffer();
    var checksum = ripemd160(pub_buf);
    var addy = Buffer.concat([pub_buf, checksum.slice(0, 4)]);
    return address_prefix + encode(addy);
  }

  toAddressString(address_prefix = "CYB") {
    var pub_buf = this.toBuffer();
    // console.debug("[Pub]", "PUB BUFFER: ", pub_buf);
    var pub_sha = sha512(pub_buf);
    // console.debug("[Pub]", "SHA: ", pub_sha);
    var addy = ripemd160(pub_sha);
    // console.debug("[Pub]", "MD160: ", addy);
    var checksum = ripemd160(addy);
    // console.debug("[Pub]", "CHECKSUM MD160: ", checksum);
    addy = Buffer.concat([addy, checksum.slice(0, 4)]);
    // console.debug("[Pub]", "ADDY: ", addy);
    // console.debug("[Pub]", "ADDRESS: ", address_prefix + encode(addy));

    return address_prefix + encode(addy);
  }

  toPtsAddy() {
    var pub_buf = this.toBuffer();
    var pub_sha = sha256(pub_buf);
    var addy = ripemd160(pub_sha);
    addy = Buffer.concat([Buffer.from([0x38]), addy]); // version 56(decimal)

    var checksum = sha256(addy);
    checksum = sha256(checksum);

    addy = Buffer.concat([addy, checksum.slice(0, 4)]);
    return encode(addy);
  }

  child(offset) {
    assert(Buffer.isBuffer(offset), "Buffer required: offset");
    assert.strictEqual(offset.length, 32, "offset length");

    offset = Buffer.concat([this.toBuffer(), offset]);
    offset = sha256(offset);

    let c = BigInteger.fromBuffer(offset);

    if (c.compareTo(n) >= 0) {
      throw new Error("Child offset went out of bounds, try again");
    }

    let cG = G.multiply(c);
    let Qprime = this.Q.add(cG);

    if (secp256k1.isInfinity(Qprime)) {
      throw new Error("Child offset derived to an invalid key, try again");
    }

    return PublicKey.fromPoint(Qprime);
  }

  /* <HEX> */

  toByteBuffer() {
    var b = new ByteBuffer(
      ByteBuffer.DEFAULT_CAPACITY,
      ByteBuffer.LITTLE_ENDIAN
    );
    this.appendByteBuffer(b);
    return b.copy(0, b.offset);
  }

  toHex() {
    return this.toBuffer().toString("hex");
  }

  /* </HEX> */
}

export default PublicKey;
