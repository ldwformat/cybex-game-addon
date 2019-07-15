import * as React from "react";
import { Subscription } from "indefinite-observable";
export declare class InviteBtn extends React.Component<any> {
    wrapper: HTMLDivElement | null;
    subscription: Subscription | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
