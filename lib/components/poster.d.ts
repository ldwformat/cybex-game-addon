import * as React from "react";
import { WithTranslation } from "react-i18next";
export declare const PosterDisplay: React.ComponentType<Pick<{
    text: string;
    filename: string;
} & WithTranslation, "text" | "filename">>;
export declare const Poster: ({ open, onClose, posterLink, filename }: {
    open: any;
    onClose: any;
    posterLink: any;
    filename: any;
}) => JSX.Element;
