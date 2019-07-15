import * as React from "react";
import { StyledComponentProps } from "@material-ui/core";
import { authSetWalletPass, authUnlock } from "../core/auth";
import { WithTranslation } from "react-i18next";
declare type LockerPropsDispatch = {
    setPassword: typeof authSetWalletPass;
    unlock: typeof authUnlock;
};
export declare enum LockerType {
    Lock = 0,
    Unlock = 1
}
export declare enum Size {
    Big = 0,
    Small = 1
}
export declare const LockerInner: React.ComponentType<Pick<Pick<Pick<WithTranslation & StyledComponentProps<"locker"> & {
    type: LockerType;
    size: Size;
} & Partial<LockerPropsDispatch>, "size" | "type" | "classes" | "innerRef" | "setPassword" | "unlock">, "size" | "type" | "classes" | "innerRef">, "size" | "type" | "innerRef"> & StyledComponentProps<string>>;
export declare const Locker: ({ type }: {
    type: LockerType;
}) => JSX.Element;
export {};
