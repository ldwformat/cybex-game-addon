import PrivateKey from "../../../cybex/ecc/src/PrivateKey";

export type AuthRole = "active" | "owner" | "memo";

export class KeyAuth {
  fullAuth: boolean | null = null;
  privKey: PrivateKey | null = null;
  pubKeyStr: string | null = null;
}
