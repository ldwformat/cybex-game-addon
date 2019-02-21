import { WsConnection } from "./connect";
import { PrivateKey } from "../cybex/ecc";
import { transaction } from "src/cybex/serializer/src/operations";
import Transaction from "./transaction";

const NORMAL_TIMEOUT = 30 * 1000;

describe("测试Transaction类", () => {
  let ws: WsConnection;
  beforeAll(async done => {
    ws = new WsConnection({
      url: "wss://shenzhen.51nebula.com"
    });
    await ws.connect();
    done();
  }, NORMAL_TIMEOUT);

  test(
    "Transaction测试",
    async done => {
      let chainId = await ws.api("database")("get_chain_id");
      let account = "create-test";
      let seed = "create-testactiveqwer1234qwer1234";
      let privKey = PrivateKey.fromSeed(seed);
      let transfer = {
        fee: { amount: 0, asset_id: "1.3.0" },
        from: "1.2.346",
        to: "1.2.139",
        amount: { amount: 100001, asset_id: "1.3.0" }
      };

      let tx = new Transaction(ws);
      tx.add_type_operation("transfer", transfer);
      tx.add_signer(privKey);
      await tx.update_head_block();
      await tx.set_required_fees();
      await tx.update_head_block();
      await tx.broadcast();

      done();
    },
    NORMAL_TIMEOUT
  );
});
