export interface RPCResult {
  id: number;
  jsonrpc: "2.0";
  result: any;
}
export interface RPCRejectResult {
  id: number;
  jsonrpc: "2.0";
  error: any;
}
type CallID = number;
type ApiID = number;
type Method = string;
type Params = any[];
type NoticeArray = any[];
export type RPCRequestParams = [ApiID, Method, Params];

export interface RPCRequest {
  id: CallID;
  method: "call";
  params: RPCRequestParams;
}

export interface RPCNotice {
  method: "notice";
  params: [CallID, NoticeArray];
}
