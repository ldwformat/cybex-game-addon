/// <reference types="node" />
import { Store } from "redux";
import { EventEmitter } from "events";
import { IEffectDeps } from "./core/modes";
import { CoreState } from "./core/core.models";
export declare class CybexAddon {
    config: CybexAddonConfig;
    static EVENT_ACTION: string;
    static OVERLAY_CONTAINER_ID: string;
    theme: import("@material-ui/core").Theme;
    store: Store<CoreState> | null;
    notifier: EventEmitter | null;
    toolset: IEffectDeps | null;
    constructor(config?: CybexAddonConfig);
    init(): Promise<this>;
    patchPage: (Page: any, resolve?: (...args: any[]) => any) => Promise<void>;
    bootstrap: (Page: any) => (rootElement: HTMLElement, resolve?: (...args: any[]) => any) => Promise<void>;
    loginPage(): Promise<{}>;
    showInviteBtn(root: HTMLElement): Promise<{}>;
    depositPage(root: HTMLElement): Promise<{}>;
    referPage(root: HTMLElement): Promise<{}>;
    referRulePage(root: HTMLElement): Promise<{}>;
}
