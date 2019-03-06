import React from "react";
import { InjectedNotistackProps } from "notistack";
import { Noti } from "../core/core.models";
export declare const Notifier: import("react-redux").ConnectedComponentClass<React.ComponentClass<Pick<InjectedNotistackProps & {
    notifications: Noti[];
    removeSnackbar: (key: string) => import("../core/core.actions").ActionCoreRemoveNoti;
}, "notifications" | "removeSnackbar">, any> & {
    WrappedComponent: React.ComponentType<InjectedNotistackProps & {
        notifications: Noti[];
        removeSnackbar: (key: string) => import("../core/core.actions").ActionCoreRemoveNoti;
    }>;
}, Pick<Pick<InjectedNotistackProps & {
    notifications: Noti[];
    removeSnackbar: (key: string) => import("../core/core.actions").ActionCoreRemoveNoti;
}, "notifications" | "removeSnackbar">, never>>;
