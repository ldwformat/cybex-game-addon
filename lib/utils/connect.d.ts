/// <reference types="react" />
/// <reference types="node" />
import { EventEmitter } from "events";
import ReconnectingWebSocket, { Options as RsOptions } from "reconnecting-websocket";
export declare class WsConnection extends EventEmitter {
    private options;
    readonly callId: number;
    constructor(options: WsConnectionOption & RsOptions);
    static EVENT_DISCONNECT: string;
    static EVENT_RESULT: string;
    static EVENT_NOTICE: string;
    static CallbackMethods: Set<string>;
    rws: ReconnectingWebSocket | WebSocket | undefined;
    _callId: number;
    apiIds: {
        [ApiType: string]: any;
    };
    static getEventNameById: (id: import("react").ReactText) => string;
    static getRejectEventNameById: (id: import("react").ReactText) => string;
    connect(): Promise<void>;
    msgHandler: (e: {
        data: string;
    }) => void;
    login(): Promise<void[]>;
    api: (api: string) => (method: string, ...params: any[]) => Promise<any>;
}
