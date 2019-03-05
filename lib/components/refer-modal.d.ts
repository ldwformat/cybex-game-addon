import * as React from "react";
import { StyledComponentProps } from "@material-ui/core";
import { referAdd } from "../core/refer";
export declare const ReferModalForm: import("redux-form").DecoratedComponentClass<any, Partial<import("redux-form").ConfigProps<any, {}, string>>, string>;
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
export declare const ReferModal: import("react-redux").ConnectedComponentClass<React.ComponentType<Pick<StyledComponentProps<"paper"> & ReferModalPropsDispatch & ReferModalPropsState & ReferModalProps, "game" | "innerRef" | "isLogging" | "isModalShowing" | "myGameReferrer" | "addRefer" | "account" | "onModalClose"> & StyledComponentProps<"paper">>, Pick<Pick<StyledComponentProps<"paper"> & ReferModalPropsDispatch & ReferModalPropsState & ReferModalProps, "game" | "innerRef" | "isLogging" | "isModalShowing" | "myGameReferrer" | "addRefer" | "account" | "onModalClose"> & StyledComponentProps<"paper">, "classes" | "innerRef" | "isModalShowing" | "onModalClose">>;
export {};
