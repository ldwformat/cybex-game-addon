import React from "react";
import { InjectedNotistackProps } from "notistack";
import { Noti } from "../core/core.models";
import { WithTranslation } from "react-i18next";
export declare const Notifier: import("react-redux").ConnectedComponentClass<React.ComponentClass<Pick<Pick<InjectedNotistackProps & {
    notifications: Noti[];
    removeSnackbar: (key: string) => import("../core/core.actions").ActionCoreRemoveNoti;
} & WithTranslation, "onPresentSnackbar" | "enqueueSnackbar" | "closeSnackbar" | "notifications" | "removeSnackbar">, "notifications" | "removeSnackbar">, any> & {
    WrappedComponent: React.ComponentType<Pick<InjectedNotistackProps & {
        notifications: Noti[];
        removeSnackbar: (key: string) => import("../core/core.actions").ActionCoreRemoveNoti;
    } & WithTranslation, "onPresentSnackbar" | "enqueueSnackbar" | "closeSnackbar" | "notifications" | "removeSnackbar">>;
}, Pick<Pick<Pick<InjectedNotistackProps & {
    notifications: Noti[];
    removeSnackbar: (key: string) => import("../core/core.actions").ActionCoreRemoveNoti;
} & WithTranslation, "onPresentSnackbar" | "enqueueSnackbar" | "closeSnackbar" | "notifications" | "removeSnackbar">, "notifications" | "removeSnackbar">, never>>;
