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
declare type CallID = number;
declare type ApiID = number;
declare type Method = string;
declare type Params = any[];
declare type NoticeArray = any[];
export declare type RPCRequestParams = [ApiID, Method, Params];
export interface RPCRequest {
    id: CallID;
    method: "call";
    params: RPCRequestParams;
}
export interface RPCNotice {
    method: "notice";
    params: [CallID, NoticeArray];
}
export {};
