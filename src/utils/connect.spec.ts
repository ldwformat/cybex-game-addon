import { WsConnection } from "./connect";

const NORMAL_TIMEOUT = 30 * 1000;

describe("WsConnect should works well on connection", () => {
  test(
    "Connection Init",
    async done => {
      let ws = new WsConnection({
        url: "wss://shenzhen.51nebula.com"
        // protocol: "wss"
      });
      await ws.connect();
      expect(ws.apiIds["database"]).not.toBeUndefined();
      done();
    },
    NORMAL_TIMEOUT
  );
});

describe("WsConnect should works well", () => {
  let ws: WsConnection;
  beforeEach(async done => {
    ws = new WsConnection({
      url: "wss://shenzhen.51nebula.com"
    });
    await ws.connect();
    done();
  }, NORMAL_TIMEOUT);

  test(
    "Get ChainID",
    async done => {
      let chainId = await ws.api("database")("get_chain_id");
      expect(chainId).toEqual(
        "ab1a36b889e21d2803219d379d10d39ff282b0399934946b1d5b799ceeb9fded"
      );
      done();
    },
    NORMAL_TIMEOUT
  );

  test(
    "Connection will be error while connection isnot opened",
    async done => {
      ws.rws && ws.rws.close();
      let res = await ws
        .api("database")("get_chain_id")
        .catch((err: ErrorEvent) => err.message);
      expect(res).toMatch("Connection is not opened yet");
      done();
    },
    NORMAL_TIMEOUT
  );

  test(
    "Connection will be broken while connection disconnecting",
    async done => {
      Promise.all([
        ws
          .api("database")("get_chain_id")
          .catch((err: ErrorEvent) => err.message)
          .then(res => {
            expect(res).toMatch("Connection error, request failed");
          }),
        ws
          .api("database")("get_chain_id")
          .catch((err: ErrorEvent) => err.message)
          .then(res => {
            expect(res).toMatch("Connection error, request failed");
          }),
        ws
          .api("database")("get_chain_id")
          .catch((err: ErrorEvent) => err.message)
          .then(res => {
            expect(res).toMatch("Connection error, request failed");
          })
      ]).then(() => {
        done();
      });

      ws.rws && ws.rws.close();
    },
    NORMAL_TIMEOUT
  );
});
