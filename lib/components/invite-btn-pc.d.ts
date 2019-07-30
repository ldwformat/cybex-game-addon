import * as React from "react";
import { Subscription } from "indefinite-observable";
import { Panels } from "./share-btn";
export declare const MenuBtn: ({ onClick, open }: {
    onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => any;
    open: boolean;
}) => JSX.Element;
export declare const HelpBtn: React.ComponentType<Pick<{
    onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => any;
    open: boolean;
    classes?: any;
}, "open" | "onClick"> & import("@material-ui/core").StyledComponentProps<string>>;
declare class InviteBtnPC extends React.Component<{
    onCopyLinkClick: any;
    onHelpClick: any;
    copyText: any;
    accountName: any;
    accountReferUrl: any;
    isShowPoster: any;
    postChange: any;
}, {
    [menuOpen: string]: boolean;
}> {
    wrapper: HTMLDivElement | null;
    subscription: Subscription | null;
    state: {
        [Panels.Drawer]: boolean;
        [Panels.RefReadme]: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    switchMenu: (e: any) => void;
    handleExpand: (panel: Panels) => void;
    render(): JSX.Element;
}
declare const MapInviteBtnPC: import("react-redux").ConnectedComponentClass<typeof InviteBtnPC, Pick<{
    onCopyLinkClick: any;
    onHelpClick: any;
    copyText: any;
    accountName: any;
    accountReferUrl: any;
    isShowPoster: any;
    postChange: any;
}, "accountName" | "accountReferUrl" | "onCopyLinkClick" | "onHelpClick" | "copyText">>;
export { MapInviteBtnPC };
