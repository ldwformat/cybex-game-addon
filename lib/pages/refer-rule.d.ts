import * as React from "react";
import { StyledComponentProps } from "@material-ui/core";
import { WithTranslation } from "react-i18next";
export declare const Paragraph: ({ title, contents }: {
    title: string;
    contents?: string[] | undefined;
}) => JSX.Element;
export declare const Rules: () => JSX.Element;
export declare const ReferRule: React.ComponentType<(Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper" | "buttonRoot"> & WithTranslation, "classes" | "innerRef">, "innerRef"> & StyledComponentProps<string>) | (Pick<Pick<StyledComponentProps<"root" | "copyCard" | "innerWrapper" | "buttonRoot"> & WithTranslation, "classes" | "innerRef"> & {
    children?: React.ReactNode;
}, "children" | "innerRef"> & StyledComponentProps<string>)>;