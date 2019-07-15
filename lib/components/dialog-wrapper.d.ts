/// <reference types="react" />
import { DialogProps } from "@material-ui/core/Dialog";
import { TypographyProps } from "@material-ui/core/Typography";
declare type DialogWrapperProps = {
    title?: string;
    open: boolean;
    hideHeader?: boolean;
    onCloseClick: any;
    children?: any;
    titleProps?: Partial<TypographyProps>;
    dialogProps?: Partial<DialogProps>;
};
export declare const DialogWrapper: ({ title, open, onCloseClick, children, hideHeader, dialogProps, titleProps, ...rest }: DialogWrapperProps) => JSX.Element;
export {};
