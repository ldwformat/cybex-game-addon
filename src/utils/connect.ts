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
  static CallbackMethods = new Set(["broadcast_transaction_with_callback"]);

  rws: ReconnectingWebSocket | WebSocket | undefined;
  _callId = 1;

  apiIds: { [ApiType: string]: any } = {};
  static getEventNameById = (id: string | number) => `#EVENT_${id}`;
  static getRejectEventNameById = (id: string | number) =>
    `#EVENT_REJECT_${id}`;

  async connect() {
    assert(this.options.url, "Ws url must be provided");
    let _openEvent = await new Promise(resolve => {
      this.rws = new WebSocket(
        // this.rws = new ReconnectingWebSocket(
        this.options.url,
        this.options.protocol
        // this.options
      );

      this.rws.addEventListener("open", (e: Event) => {
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
    // console.debug("Msg: ", e.data);
    try {
      let msg: RPC.RPCResult | RPC.RPCNotice | RPC.RPCRejectResult = JSON.parse(
        e.data
      );
      if ("result" in msg) {
        this.emit(WsConnection.getEventNameById(msg.id), msg.result);
        this.emit(WsConnection.EVENT_RESULT, msg);
      } else if ("method" in msg) {
        this.emit(WsConnection.getEventNameById(msg.params[0]), msg.params[1]);
        this.emit(WsConnection.EVENT_NOTICE, msg);
      } else if ("error" in msg) {
        this.emit(WsConnection.getRejectEventNameById(msg.id), msg.error);
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
    if (WsConnection.CallbackMethods.has(method)) {
      params.unshift(id);
    }
    let call: RPC.RPCRequest = {
      id,
      method: "call",
      params: [this.apiIds[api] || 1, method, params]
    };
    let callStr = JSON.stringify(call);
    return new Promise((resolve, reject) => {
      if (this.rws && this.rws.readyState === ReconnectingWebSocket.OPEN) {
        // console.debug("CALLSTR: ", callStr);
        this.rws.send(callStr);
        let ev = WsConnection.getEventNameById(id);
        let rejectEv = WsConnection.getRejectEventNameById(id);
        let resHandle: any;
        let rejectHandle: any;

        resHandle = (result: any) => {
          resolve(result);
          this.removeListener(WsConnection.EVENT_DISCONNECT, rejectHandle);
        };

        rejectHandle = (err: any) => {
          reject(err || new Error("Connection error, request failed"));
          this.removeListener(ev, resHandle);
          this.removeListener(rejectEv, rejectHandle);
        };

        this.once(ev, resHandle);
        this.once(WsConnection.EVENT_DISCONNECT, rejectHandle);
        this.once(rejectEv, err => {
          this.removeListener(WsConnection.EVENT_DISCONNECT, rejectHandle);
          rejectHandle(err);
        });
      } else {
        throw Error("Connection is not opened yet");
      }
    }) as Promise<any>;
  };
}
