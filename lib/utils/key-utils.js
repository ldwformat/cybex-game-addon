import { PrivateKey, Aes, PublicKey } from "../cybex/ecc";
import { KeyStore } from "../core/auth/keystore/keystore";
import assert from "assert";
import { SignalCellularNull } from "@material-ui/icons";
export function encryptKeyStore(password, keyStore) {
    var privKey = PrivateKey.fromSeed(password);
    return Buffer.concat([
        privKey.toPublicKey().toBuffer(true),
        Aes.encrypt_with_checksum(privKey, privKey.toPublicKey().toPublicKeyString(), null, keyStore.serialize())
    ]).toString("hex");
}
export function decryptKeyStore(password, keyStoreStr) {
    var privKey = PrivateKey.fromSeed(password);
    SignalCellularNull;
    var keyBuf = Buffer.from(keyStoreStr, "hex");
    var pubKey = keyBuf.slice(0, 33);
    assert(pubKey.equals(privKey.toPublicKey().toBuffer(true)), "Wrong Password");
    return KeyStore.deserialize(Aes.decrypt_with_checksum(privKey, PublicKey.fromBuffer(pubKey), null, keyBuf.slice(33)).toString());
}
