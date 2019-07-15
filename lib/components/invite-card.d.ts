import * as React from "react";
import { StyledComponentProps } from "@material-ui/core";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
declare type InviteCardProps = {
    children?: any;
    color?: string;
    title: string;
    IconComponent: React.ComponentType<SvgIconProps>;
};
export declare const InviteCard: React.ComponentType<Pick<InviteCardProps & StyledComponentProps<string>, "title" | "color" | "children" | "innerRef" | "IconComponent"> & StyledComponentProps<string>>;
export {};
