import * as React from "react";
import QRCode from "qrcode.react";
import { Button, Grid } from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";

export class QRCodeDisplay extends React.Component<{
  text: string;
  filename: string;
}> {
  qrcode: HTMLDivElement | undefined | null;

  download = (filename: string = "deposit.jpg") => {
    console.debug("Download: ", this);
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
      console.debug("File: ", file);
      a.download = filename;
      a.href = url;
      a.target = "_blank";
      a.dispatchEvent(new MouseEvent("click"));
    });
  };

  render() {
    let { text, filename } = this.props;
    return (
      <Grid container direction="column" alignContent="center">
        <div ref={qrcode => (this.qrcode = qrcode)}>
          <QRCode value={text} />
        </div>
        <Button color="secondary" onClick={_e => this.download(filename)}>
          保存二维码
          <CloudDownload style={{ marginLeft: "4px" }} fontSize="small" />
        </Button>
      </Grid>
    );
  }
}
