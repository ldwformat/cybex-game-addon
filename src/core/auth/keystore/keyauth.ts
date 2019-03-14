import PrivateKey from "../../../cybex/ecc/src/PrivateKey";
import { Serializable } from "../../core.models";

export type AuthRole = "active" | "owner" | "memo";
export interface IKeyAuth {
  fullAuth: boolean | null;
  privKey: PrivateKey | null;
  pubKeyStr: string | null;
}
export class KeyAuth implements Serializable {
  fullAuth: boolean | null = null;
  privKey: PrivateKey | null = null;
  pubKeyStr: string | null = null;

  static fromKeyAuth(params: IKeyAuth) {
    let auth = new KeyAuth();
    auth.fullAuth = params.fullAuth;
    auth.privKey = params.privKey;
    auth.pubKeyStr = params.pubKeyStr;
    return auth;
  }

  static deserialize(keyAuthStr: string): KeyAuth {
    return KeyAuth.fromKeyAuth(
      JSON.parse(keyAuthStr, (key, value) => {
        if (key === "privKey") {
          return PrivateKey.fromWif(value);
        }
        return value;
      })
    );
  }

  serialize(): string {
    return JSON.stringify(this, (key, value) => {
      if (key === "privKey") {
        return (value as PrivateKey).toWif();
      }
      return value;
    });
  }
}
