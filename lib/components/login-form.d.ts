import * as React from "react";
export declare const LoginForm: {
    new (props: Readonly<any>): {
        state: {
            showPassword: boolean;
        };
        render(): JSX.Element;
        context: any;
        setState<K extends "showPassword">(state: {
            showPassword: boolean;
        } | ((prevState: Readonly<{
            showPassword: boolean;
        }>, props: Readonly<any>) => {
            showPassword: boolean;
        } | Pick<{
            showPassword: boolean;
        }, K> | null) | Pick<{
            showPassword: boolean;
        }, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: any, context?: any): {
        state: {
            showPassword: boolean;
        };
        render(): JSX.Element;
        context: any;
        setState<K extends "showPassword">(state: {
            showPassword: boolean;
        } | ((prevState: Readonly<{
            showPassword: boolean;
        }>, props: Readonly<any>) => {
            showPassword: boolean;
        } | Pick<{
            showPassword: boolean;
        }, K> | null) | Pick<{
            showPassword: boolean;
        }, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
};
