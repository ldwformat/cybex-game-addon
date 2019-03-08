/// <reference types="node" />
import { Store } from "redux";
import { CybexAddonConfig, CybexAddonConfigOptions } from "./config";
import { EventEmitter } from "events";
import { IEffectDeps } from "./core/modes";
import { CoreState } from "./core/core.models";
import { i18n } from "./providers/i18n";
export declare function getPageContext(): any;
export declare class CybexAddon {
    pageContext: any;
    static EVENT_ACTION: string;
    static OVERLAY_CONTAINER_ID: string;
    static INVATION_OVERLAY_CONTAINER_ID: string;
    i18n: i18n.i18n;
    theme: import("@material-ui/core").Theme;
    store: Store<CoreState> | null;
    notifier: EventEmitter | null;
    toolset: IEffectDeps | null;
    config: CybexAddonConfig;
    constructor(config?: CybexAddonConfigOptions, pageContext?: any);
    init(): Promise<this>;
    patchPage: (Page: any, resolve?: (...args: any[]) => any, rootContainer?: HTMLElement | null) => Promise<void>;
    bootstrap: (Page: any, props?: any) => (rootElement: HTMLElement, resolve?: (...args: any[]) => any) => Promise<void>;
    setLang(lang: string): Promise<i18n.TFunction>;
    loginPage(): Promise<{}>;
    logout(): void;
    showInviteBtn(onClick: (e: any) => any): Promise<{}>;
    hideInviteBtn(): void;
    depositPage(root: HTMLElement): Promise<{}>;
    referPage(root: HTMLElement): Promise<{}>;
    referRulePage(root: HTMLElement): Promise<{}>;
}
