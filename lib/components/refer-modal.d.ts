import * as React from "react";
import { StyledComponentProps } from "@material-ui/core";
import { referAdd, Referrer } from "../core/refer";
export declare const ReferModalForm: (props: any) => JSX.Element;
declare type ReferModalPropsDispatch = {
    addRefer: typeof referAdd;
};
declare type ReferModalPropsState = {
    isLogging: boolean;
    account: string | null;
    myGameReferrer: Referrer | undefined;
    game: string;
};
declare type ReferModalProps = {
    isModalShowing: boolean;
    onModalClose: () => any;
};
export declare const ReferModal: import("react-redux").ConnectedComponentClass<React.ComponentType<Pick<StyledComponentProps<"paper"> & ReferModalPropsDispatch & ReferModalPropsState & ReferModalProps, "account" | "innerRef" | "game" | "isModalShowing" | "isLogging" | "addRefer" | "myGameReferrer" | "onModalClose"> & StyledComponentProps<"paper">>, Pick<Pick<StyledComponentProps<"paper"> & ReferModalPropsDispatch & ReferModalPropsState & ReferModalProps, "account" | "innerRef" | "game" | "isModalShowing" | "isLogging" | "addRefer" | "myGameReferrer" | "onModalClose"> & StyledComponentProps<"paper">, "classes" | "innerRef" | "isModalShowing" | "onModalClose">>;
export {};
