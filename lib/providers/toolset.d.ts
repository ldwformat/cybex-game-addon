import * as React from "react";
import { IEffectDeps } from "../core/modes";
declare type ToolsetContext = {
    toolset: IEffectDeps | null;
};
export declare type withTooltipProps = {
    toolset: ToolsetContext;
};
export declare const ToolsetContext: React.Context<ToolsetContext>;
export declare const withToolset: (Component: any) => (props: any) => JSX.Element;
export {};
