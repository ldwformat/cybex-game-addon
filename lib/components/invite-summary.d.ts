import * as React from "react";
import { StyledComponentProps } from "@material-ui/core";
declare type InviteSummaryProps = {
    amount: string | number;
    title: string;
};
export declare const InviteSummary: React.ComponentType<Pick<InviteSummaryProps & StyledComponentProps<"font" | "container">, "title" | "innerRef" | "amount"> & StyledComponentProps<string>>;
export {};
