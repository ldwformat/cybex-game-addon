import * as React from "react";
import QRCode from "qrcode.react";
import { Button, Grid, Typography } from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";
import { Dict } from "../providers/i18n";
import { withTranslation, WithTranslation } from "react-i18next";
import { findFirstEmptyZone } from "../utils/canvas-helper";

function drawCanvasToImg(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  canvas.toBlob(blob => {
    if (!blob || !img) {
      return;
    }
    let urlObj = URL.createObjectURL(blob);
    img.src = urlObj;
    // let revoke = () => {
    //   window.URL.revokeObjectURL(urlObj);
    //   if (img) {
    //     img.removeEventListener("load", revoke);
    //   }
    // };
    // img.addEventListener("load", revoke);
  });
}

export const PosterDisplay = withTranslation()(
  class extends React.Component<
    {
      text: string;
      filename: string;
    } & WithTranslation
  > {
    qrcode: HTMLDivElement | undefined | null;
    qrcodeImg: HTMLImageElement | undefined | null;
    qrCanvas: HTMLCanvasElement | undefined | null;

    download = (filename: string = "deposit.jpg") => {
      if (!this.qrcodeImg || !this.qrCanvas) {
        return;
      }
      let canvas = this.qrCanvas;
      // let canvas = this.qrcode.getElementsByTagName("canvas")[0];
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

    componentWillUnmount() {
      let domedCodeWrapper = document.getElementById("$POSTER");
      if (domedCodeWrapper) {
        domedCodeWrapper.remove();
      }
    }

    updateQRImg = async () => {
      let posterBase64 = await import("./../assets/images/poster").then(
        poster => poster.PosterImgBase64
      );
      let posterImg = document.createElement("img");
      posterImg.src = posterBase64;
      let posterCanvas = (this.qrCanvas = document.createElement("canvas"));
      posterCanvas.width = posterImg.width;
      posterCanvas.height = posterImg.height;
      let posterCtx = posterCanvas.getContext("2d") as CanvasRenderingContext2D;
      posterCtx.drawImage(posterImg, 0, 0);
      let posterSpace = findFirstEmptyZone(
        posterCtx,
        posterCanvas.width,
        posterCanvas.height
      );
      if (!posterSpace) {
        if (this.qrcode && this.qrcodeImg) {
          let canvas = this.qrcode.getElementsByTagName("canvas")[0];
          if (!canvas) {
            return;
          }
          drawCanvasToImg(canvas, this.qrcodeImg);
        }
        return;
      }
      posterSpace;
      let QRCode = await import("./../utils/qrcode").then(
        ({ QRCode }) => QRCode
      );

      let oriPosterImg = document.getElementById("$POSTER");
      if (oriPosterImg) {
        oriPosterImg.remove();
      }
      let codeWrapper = document.createElement("div");
      codeWrapper.style.zIndex = "-1";
      codeWrapper.style.position = "fixed";
      codeWrapper.style.top = "0";
      codeWrapper.style.width = "0";
      codeWrapper.style.height = "0";
      codeWrapper.style.overflow = "hidden";
      codeWrapper.id = "$POSTER";
      new QRCode(codeWrapper, {
        text: this.props.text,
        width: posterSpace.width - 4,
        height: posterSpace.height - 8,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      document.body.prepend(codeWrapper);
      let domedCodeWrapper = document.getElementById("$POSTER");
      if (!domedCodeWrapper) {
        return;
      }
      let codeImg = (domedCodeWrapper.getElementsByTagName("img") || [])[0];
      if (!codeImg) {
        return;
      }
      codeImg.addEventListener("load", () => {
        if (!posterSpace) {
          return;
        }
        posterCtx.drawImage(codeImg, posterSpace.left + 2, posterSpace.top + 4);
        if (this.qrcodeImg) {
          drawCanvasToImg(posterCanvas, this.qrcodeImg);
        }
      });
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
              {/* <QRCode value={text} /> */}
            </div>
            <img
              style={{ width: "12em" }}
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
