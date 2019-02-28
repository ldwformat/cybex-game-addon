import * as React from "react";
export declare class QRCodeDisplay extends React.Component<{
    text: string;
    filename: string;
}> {
    qrcode: HTMLDivElement | undefined | null;
    download: (filename?: string) => void;
    render(): JSX.Element;
}
