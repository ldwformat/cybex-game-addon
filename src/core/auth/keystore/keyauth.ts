export type AuthRole = "active" | "owner" | "memo";

export class KeyAuth {
  fullAuth: boolean;
  privKey: PrivateKey;
  pubKeyStr: string;
}
