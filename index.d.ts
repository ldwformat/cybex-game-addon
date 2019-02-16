declare namespace CybexConnect {
  export interface WsConnectionOptions {}

  export class WsConnection {
    options: WsConnectionOptions;
    constructor(url: string, options?: WsConnectionOptions);
    constructor(options: WsConnectionOptions);
    connect(): Promise<WsConnection>;
  }
}
declare namespace RPC {
  interface RPCResult {
    id: number;
    jsonrpc: "2.0";
    result: any;
  }
  type CallID = number;
  type ApiID = number;
  type Method = string;
  type Params = any[];
  type NoticeArray = any[];
  type RPCRequestParams = [ApiID, Method, Params];
  
  interface RPCRequest {
    id: CallID;
    method: "call";
    params: RPCRequestParams;
  }

  interface RPCNotice {
    method: "notice";
    params: [CallID, NoticeArray];
  }
}

declare enum ApiFailedMode {
  Ignore,
  Panic
}

declare interface WsConnectionOption {
  url: string;
  apis?: string[];
  mode?: ApiFailedMode;
  protocol?: string;
}

declare namespace Cybex {
  export interface Asset {
    id: string;
    symbol: string;
    precision: number;
    issuer: string;
    options: {
      max_supply: string;
      market_fee_percent: number;
      max_market_fee: string;
      issuer_permissions: number;
      flags: number;
      core_exchange_rate: any[];
      whitelist_authorities: any[];
      blacklist_authorities: any[];
      whitelist_markets: any[];
      blacklist_markets: any[];
      description: string;
      extensions: any[];
    };
    dynamic_asset_data_id: string;
  }

  export interface Account {
    id: string;
    name: string;
  }
}

//
declare const ByteBuffer;
