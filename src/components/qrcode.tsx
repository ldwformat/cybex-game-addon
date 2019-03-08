import * as React from "react";
import QRCode from "qrcode.react";
import { Button, Grid, Typography } from "@material-ui/core";
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
    qrcodeImg: HTMLImageElement | undefined | null;

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

    componentDidMount() {
      this.updateQRImg();
    }

    componentDidUpdate() {
      this.updateQRImg();
    }

    updateQRImg = () => {
      if (this.qrcode && this.qrcodeImg) {
        let canvas = this.qrcode.getElementsByTagName("canvas")[0];
        if (!canvas) {
          return;
        }
        canvas.toBlob(blob => {
          if (!blob || !this.qrcodeImg) {
            return;
          }
          let urlObj = URL.createObjectURL(blob);
          this.qrcodeImg.src = urlObj;
          let revoke = () => {
            window.URL.revokeObjectURL(urlObj);
            if (this.qrcodeImg) {
              this.qrcodeImg.removeEventListener("load", revoke);
            }
          };
          this.qrcodeImg.addEventListener("load", revoke);
        });
      }
    };

    isAppleDevice = () => {
      return /iphone|ipad|ipod/i.test(navigator.userAgent);
    };

    render() {
      let { text, filename, t } = this.props;
      return (
        <Grid container direction="column" alignContent="center">
          <div ref={qrcode => (this.qrcode = qrcode)}>
            <div style={{ display: "none" }}>
              <QRCode value={text} />
            </div>
            <img
              style={{ width: "12em", height: "12em" }}
              ref={qrcodeImg => (this.qrcodeImg = qrcodeImg)}
            />
          </div>
          {!this.isAppleDevice() ? (
            <Button color="secondary" onClick={_e => this.download(filename)}>
              {t(Dict.SaveQRCode)}
              <CloudDownload style={{ marginLeft: "4px" }} fontSize="small" />
            </Button>
          ) : (
            <Typography align="center" style={{ margin: "0.5em" }}>
              {t(Dict.SaveQRCodeLongPress)}
            </Typography>
          )}
        </Grid>
      );
    }
  }
);
