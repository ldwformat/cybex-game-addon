import assert from "assert";
import { EventEmitter } from "events";

import ReconnectingWebSocket, {
  CloseEvent,
  Event,
  Options as RsOptions
} from "reconnecting-websocket";

const DEFAULT_OPTIONS = {
  apis: ["database", "history", "network_broadcast"]
};

export class WsConnection extends EventEmitter {
  // self-increased ID
  get callId() {
    return this._callId++;
  }

  constructor(private options: WsConnectionOption & RsOptions) {
    super();
    this.setMaxListeners(2000);
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    };
  }
  static EVENT_DISCONNECT = "disconnect";
  static EVENT_RESULT = "result";
  static EVENT_NOTICE = "notice";

  rws: ReconnectingWebSocket | WebSocket | undefined;
  _callId = 1;

  apiIds: { [ApiType: string]: any } = {};
  static getEventNameById = (id: string | number) => `#EVENT_${id}`;

  async connect() {
    assert(this.options.url, "Ws url must be provided");
    let _openEvent = await new Promise(resolve => {
      this.rws = new WebSocket(
        // this.rws = new ReconnectingWebSocket(
        this.options.url,
        this.options.protocol
        // this.options
      );
      console.debug("WsConnect Init");

      this.rws.addEventListener("open", (e: Event) => {
        console.debug("WsConnect Open");
        resolve(e);
      });
      this.rws.addEventListener("close", (e: CloseEvent) => {
        this.emit(WsConnection.EVENT_DISCONNECT, e);
      });
      this.rws.addEventListener("message", this.msgHandler);
    });
    await this.login();
  }

  msgHandler = (e: { data: string }) => {
    try {
      let msg: RPC.RPCResult | RPC.RPCNotice = JSON.parse(e.data);
      if ("result" in msg) {
        this.emit(WsConnection.getEventNameById(msg.id), msg.result);
        this.emit(WsConnection.EVENT_RESULT, msg);
      } else if ("method" in msg) {
        this.emit(WsConnection.getEventNameById(msg.params[0]), msg.params[1]);
        this.emit(WsConnection.EVENT_NOTICE, msg);
      }
    } catch (e) {}
  };

  async login() {
    assert(this.rws && this.rws.readyState === ReconnectingWebSocket.OPEN);
    let { apis } = this.options;
    if (!apis) {
      throw Error("Apis Error");
    }
    this.apiIds["login"] = await this.api("login")("login", "", "");
    return Promise.all(
      (this.options.apis || []).map(async apiType => {
        let apiId = await this.api("login")(apiType);
        this.apiIds[apiType] = apiId;
      })
    );
  }

  api = (api: string) => async (method: string, ...params: any[]) => {
    assert(method === "login" || this.apiIds[api]);
    let id = this.callId;
    let call: RPC.RPCRequest = {
      id,
      method: "call",
      params: [this.apiIds[api] || 1, method, params]
    };
    let callStr = JSON.stringify(call);
    return new Promise((resolve, reject) => {
      if (this.rws && this.rws.readyState === ReconnectingWebSocket.OPEN) {
        this.rws.send(callStr);
        let ev = WsConnection.getEventNameById(id);
        let resHandle: any;
        let rejectHandle: any;

        resHandle = (result: any) => {
          resolve(result);
          this.removeListener(WsConnection.EVENT_DISCONNECT, rejectHandle);
        };

        rejectHandle = (err: any) => {
          reject(new Error("Connection error, request failed"));
          this.removeListener(ev, resHandle);
        };

        this.once(ev, resHandle);
        this.once(WsConnection.EVENT_DISCONNECT, rejectHandle);
      } else {
        throw Error("Connection is not opened yet");
      }
    });
  };
}
