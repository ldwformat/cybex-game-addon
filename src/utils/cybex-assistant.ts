import { WsConnection } from "./connect";
import assert from "assert";
import { calcAmount } from "./calc";
import { KeyStore } from "../core/auth/keystore/keystore";
import { PrivateKey, Aes } from "../cybex/ecc";
import { TransactionHelper, ChainTypes } from "../cybex/chain";
import { ops } from "../cybex/serializer";
import Transaction from "./transaction";

type TransferParams = {
  from: string;
  to: string;
  asset: string;
  value: number;
  memo?: string;
  fee?: { asset_id: string; amount: string | number };
};

type MemoContent = {
  from: string;
  to: string;
  nonce: number;
  message: Buffer;
};

type Fetcher = <R = any>(method: string, ...params: any[]) => Promise<R>;

export class CybexAssistant {
  simpleCache = {};
  db_api: Fetcher;
  db_api_cached: Fetcher;

  static cacheKey(...args: any[]) {
    return JSON.stringify(args);
  }

  static isObjectID(idOrNot: string) {
    return /^\d+\.\d+\.\d+$/.test(idOrNot);
  }

  static encodeMemo(
    memoContent: string,
    privKey: PrivateKey,
    toPubKeyStr: string
  ) {
    let nonce = TransactionHelper.unique_nonce_uint64();
    return {
      from: privKey.toPublicKey().toPublicKeyString(),
      to: toPubKeyStr,
      nonce,
      message: Aes.encrypt_with_checksum(
        privKey,
        toPubKeyStr,
        nonce,
        Buffer.from(memoContent, "utf-8")
      )
    };
  }

  constructor(public wsConnect: WsConnection) {
    this.db_api = this.genFetcher("database", false);
    this.db_api_cached = this.genFetcher("database", true);
  }

  genFetcher: (api: string, cache?: boolean) => Fetcher = (
    api,
    cache = false
  ) => async (method, ...params) => {
    let result = this.simpleCache[CybexAssistant.cacheKey(method, params)];
    if (result && cache) {
      return result;
    }
    return new Promise((resolve, reject) => {
      let counter = 0;
      const impl = () => {
        this.wsConnect
          .api(api)(method, ...params)
          .then(res => {
            if (cache) {
              this.simpleCache[CybexAssistant.cacheKey(method, params)] = res;
            }
            resolve(res);
          })
          .catch(async (error: Error) => {
            if (
              counter++ < 5 &&
              error.message &&
              /Connection/i.test(error.message)
            ) {
              await this.wsConnect.connect();
              impl();
            } else {
              console.warn(error, method, params);
              reject(error);
            }
          });
      };
      impl();
    });
  };

  async transfer(
    { from, to, asset, value, memo, fee }: TransferParams,
    keyStore: KeyStore
  ) {
    assert(keyStore, "No Login");
    let [fromAccount, toAccount] = await this.getAccounts(from, to).then(
      accounts => {
        assert(accounts.every(acc => !!acc));
        return accounts as Cybex.Account[];
      }
    );

    let [fromID, toID] = [fromAccount, toAccount].map(account => account.id);

    let [assetID, assetPrecision] = await this.getAssets(asset).then(assets => {
      let [asset] = assets;
      if (asset === null) {
        throw new Error("No Asset");
      }
      return [asset.id, asset.precision] as [string, number];
    });

    let assetAmount = calcAmount(value, assetPrecision);
    let memoContent: MemoContent | undefined;
    if (memo) {
      let memoPrivKey = keyStore.getPrivByPubStr(fromAccount.options.memo_key);
      if (!memoPrivKey || !memoPrivKey.privKey) {
        throw new Error("Memo key is missing!");
      }

      memoContent = CybexAssistant.encodeMemo(
        memo,
        memoPrivKey.privKey,
        toAccount.options.memo_key
      );
    }
    let key = keyStore.keys["active"].privKey;
    if (!key) {
      throw new Error("Missing active key");
    }
    return this.performTransaction(
      "transfer",
      {
        from: fromID,
        to: toID,
        fee,
        amount: {
          asset_id: assetID,
          amount: assetAmount
        },
        memo: memoContent
      },
      key
    );
  }

  async getFakeTransferFee(asset: string = "1.3.0", memoStr?: string) {
    let _asset = (await this.getAssets(asset))[0];
    let assetID = _asset && _asset.id;
    return this.getFeeOfOp(
      "transfer",
      ops.transfer.toObject({
        from: "1.2.1",
        to: "1.2.1",
        fee: {
          asset_id: assetID,
          amount: 0
        },
        amount: {
          asset_id: assetID,
          amount: 0
        },
        memo: memoStr
          ? CybexAssistant.encodeMemo(
              memoStr,
              PrivateKey.fromSeed("0000000000000000000000"),
              PrivateKey.fromSeed("0000000000000000000000")
                .toPublicKey()
                .toString()
            )
          : undefined
      }),
      assetID as string
    );
  }

  async getFeeOfOp(
    opNameOrID: string | number,
    op: any,
    asset: string = "1.3.0"
  ) {
    let _asset = (await this.getAssets(asset))[0];
    let assetID = _asset && _asset.id;
    let opID =
      typeof opNameOrID !== "number"
        ? ChainTypes.operations[opNameOrID]
        : opNameOrID;
    return (await this.db_api("get_required_fees", [[opID, op]], assetID))[0];
  }

  async performTransaction(opName: string, op: any, privKey: PrivateKey) {
    let tr = new Transaction(this.wsConnect);
    tr.add_type_operation(opName, op);
    await tr.update_head_block();
    if (op && op.fee && !op.fee.amount) {
      await tr.set_required_fees();
    }
    await tr.update_head_block();
    tr.add_signer(privKey);
    let retry = 0;
    try {
      return await tr.broadcast();
    } catch (e) {
      if (retry++ === 0) {
        await this.wsConnect.connect();
        return tr.broadcast();
      } else {
        return e;
      }
    }
  }

  // FIXME: 查询动态数据时应不可缓存
  async getObjects<R = any[]>(...objectIDs: string[]) {
    return this.db_api_cached<R>("get_objects", objectIDs);
  }

  async getAssets(...symbolOrIDs: string[]) {
    return CybexAssistant.isObjectID(symbolOrIDs[0])
      ? this.getObjects<Array<Cybex.Asset | null>>(...symbolOrIDs)
      : this.db_api_cached<Array<Cybex.Asset | null>>(
          "lookup_asset_symbols",
          symbolOrIDs
        );
  }

  async getAccounts(...nameOrIDs: string[]) {
    return CybexAssistant.isObjectID(nameOrIDs[0])
      ? this.getObjects<Array<Cybex.Account | null>>(...nameOrIDs)
      : this.db_api_cached<Array<Cybex.Account | null>>(
          "lookup_account_names",
          nameOrIDs
        );
  }
}
