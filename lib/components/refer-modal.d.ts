import * as React from "react";
import { StyledComponentProps } from "@material-ui/core";
import { referAdd } from "../core/refer";
export declare const ReferModalForm: {
    new (props: Readonly<any>): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<any>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<any>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: any, context?: any): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<any>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<any>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
};
declare type ReferModalPropsDispatch = {
    addRefer: typeof referAdd;
};
declare type ReferModalPropsState = {
    isLogging: boolean;
    account: string | null;
    myGameReferrer: Backend.Referrer | undefined;
    game: string;
};
declare type ReferModalProps = {
    isModalShowing: boolean;
    onModalClose: () => any;
};
export declare const ReferModal: import("react-redux").ConnectedComponentClass<React.ComponentType<Pick<StyledComponentProps<"paper"> & ReferModalPropsDispatch & ReferModalPropsState & ReferModalProps, "account" | "innerRef" | "game" | "isLogging" | "isModalShowing" | "addRefer" | "myGameReferrer" | "onModalClose"> & StyledComponentProps<"paper">>, Pick<Pick<StyledComponentProps<"paper"> & ReferModalPropsDispatch & ReferModalPropsState & ReferModalProps, "account" | "innerRef" | "game" | "isLogging" | "isModalShowing" | "addRefer" | "myGameReferrer" | "onModalClose"> & StyledComponentProps<"paper">, "classes" | "innerRef" | "isModalShowing" | "onModalClose">>;
export {};
