/// <reference types="node" />
import { Store } from "redux";
import { EventEmitter } from "events";
import { IEffectDeps } from "./core/modes";
import { CoreState } from "./core/core.models";
export declare function getPageContext(): any;
export declare class CybexAddon {
    pageContext: any;
    static EVENT_ACTION: string;
    static OVERLAY_CONTAINER_ID: string;
    static INVATION_OVERLAY_CONTAINER_ID: string;
    theme: import("@material-ui/core").Theme;
    store: Store<CoreState> | null;
    notifier: EventEmitter | null;
    toolset: IEffectDeps | null;
    config: CybexAddonConfig;
    constructor(config?: CybexAddonConfig, pageContext?: any);
    init(): Promise<this>;
    patchPage: (Page: any, resolve?: (...args: any[]) => any, rootContainer?: HTMLElement | null) => Promise<void>;
    bootstrap: (Page: any, props?: any) => (rootElement: HTMLElement, resolve?: (...args: any[]) => any) => Promise<void>;
    loginPage(): Promise<{}>;
    showInviteBtn(onClick: (e: any) => any): Promise<{}>;
    depositPage(root: HTMLElement): Promise<{}>;
    referPage(root: HTMLElement): Promise<{}>;
    referRulePage(root: HTMLElement): Promise<{}>;
}
