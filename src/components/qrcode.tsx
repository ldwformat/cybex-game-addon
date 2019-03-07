import * as React from "react";
import QRCode from "qrcode.react";
import { Button, Grid } from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";
import { Dict } from "../providers/i18n";
import { withTranslation, WithTranslation } from "react-i18next";

export const QRCodeDisplay = withTranslation()(
  class extends React.Component<
    {
      text: string;
      filename: string;
    } & WithTranslation
  > {
    qrcode: HTMLDivElement | undefined | null;

    download = (filename: string = "deposit.jpg") => {
      if (!this.qrcode) {
        return;
      }
      let canvas = this.qrcode.getElementsByTagName("canvas")[0];
      if (!canvas) {
        return;
      }
      canvas.toBlob(blob => {
        if (!blob) {
          return;
        }
        let file = new File([blob], filename, { type: "image/png" });
        let url = URL.createObjectURL(file);
        let a = document.createElement("a");
        a.download = filename;
        a.href = url;
        a.target = "_blank";
        a.dispatchEvent(new MouseEvent("click"));
      });
    };

    render() {
      let { text, filename, t } = this.props;
      return (
        <Grid container direction="column" alignContent="center">
          <div ref={qrcode => (this.qrcode = qrcode)}>
            <QRCode value={text} />
          </div>
          <Button color="secondary" onClick={_e => this.download(filename)}>
            {t(Dict.SaveQRCode)}
            <CloudDownload style={{ marginLeft: "4px" }} fontSize="small" />
          </Button>
        </Grid>
      );
    }
  }
);
