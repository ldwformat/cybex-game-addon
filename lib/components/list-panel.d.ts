import * as React from "react";
import { StyledComponentProps } from "@material-ui/core";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
export declare const EmptyTip: ({ IconComponent, title, style }: {
    IconComponent: React.ComponentType<SvgIconProps>;
    title: string;
    style?: any;
}) => JSX.Element;
export declare type ListColConfig = {
    header: string;
    name: string;
    align: "left" | "center" | "right";
    cell?: (value: any) => any;
    cellStyle?: React.CSSProperties;
};
declare type ListPanelProps = {
    title: string;
    listData: any[];
    colConfig: ListColConfig[];
    emptyComponent?: any;
};
export declare const ListPanel: React.ComponentType<Pick<ListPanelProps & StyledComponentProps<string>, "title" | "innerRef" | "listData" | "colConfig" | "emptyComponent"> & StyledComponentProps<string>>;
export {};
