import * as React from "react";
export declare const renderTextField: ({ label, input, meta: { touched, invalid, error }, ...custom }: {
    [x: string]: any;
    label: any;
    input: any;
    meta: {
        touched: any;
        invalid: any;
        error: any;
    };
}) => JSX.Element;
export declare const renderPasswordField: ({ label, input, meta: { touched, invalid, error }, ...custom }: {
    [x: string]: any;
    label: any;
    input: any;
    meta: {
        touched: any;
        invalid: any;
        error: any;
    };
}) => JSX.Element;
export declare const renderCheckbox: ({ input, label }: {
    input: any;
    label: any;
}) => JSX.Element;
export declare const radioButton: ({ input, ...rest }: {
    [x: string]: any;
    input: any;
}) => JSX.Element;
export declare const renderFromHelper: ({ touched, error }: {
    touched: any;
    error: any;
}) => JSX.Element | undefined;
export declare const renderSelectField: ({ input, label, meta: { touched, error }, children, ...custom }: {
    [x: string]: any;
    input: any;
    label: any;
    meta: {
        touched: any;
        error: any;
    };
    children: any;
}) => JSX.Element;
export declare const PrimaryButton: React.ComponentType<Pick<any, string | number | symbol> & import("@material-ui/core").StyledComponentProps<"root">>;
