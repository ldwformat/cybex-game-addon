import { Reducer } from "redux";
import { GatewayState } from "./gateway.models";
import { GatewayAction } from "./gateway.actions";
import { AuthAction } from "../auth";
export declare const gateway: Reducer<GatewayState, GatewayAction | AuthAction>;
