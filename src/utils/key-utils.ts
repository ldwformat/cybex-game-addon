import { PrivateKey, Aes, PublicKey } from "../cybex/ecc";
import { KeyStore } from "../core/auth/keystore/keystore";
import assert from "assert";
import { SignalCellularNull } from "@material-ui/icons";

export function encryptKeyStore(password: string, keyStore: KeyStore): string {
  let privKey = PrivateKey.fromSeed(password);
  return Buffer.concat([
    privKey.toPublicKey().toBuffer(true),
    Aes.encrypt_with_checksum(
      privKey,
      privKey.toPublicKey().toPublicKeyString(),
      null,
      keyStore.serilize()
    )
  ]).toString("hex");
}

export function decryptKeyStore(
  password: string,
  keyStoreStr: string
): KeyStore {
  let privKey = PrivateKey.fromSeed(password);
  SignalCellularNull;
  let keyBuf = Buffer.from(keyStoreStr, "hex");
  let pubKey = keyBuf.slice(0, 33);
  assert(pubKey.equals(privKey.toPublicKey().toBuffer(true)), "Wrong Password");
  return KeyStore.deserilize(
    Aes.decrypt_with_checksum(
      privKey,
      PublicKey.fromBuffer(pubKey),
      null,
      keyBuf.slice(33)
    ).toString()
  );
}
