import * as React from "react";
import { WithTranslation } from "react-i18next";
export declare const QRCodeDisplay: React.ComponentType<Pick<{
    text: string;
    filename: string;
} & WithTranslation, "text" | "filename">>;
