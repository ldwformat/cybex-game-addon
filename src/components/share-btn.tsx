import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { CoreState } from "../core";
import {
  withStyles,
  StyledComponentProps,
  StyleRulesCallback,
  SwipeableDrawer,
  Grid,
  Typography,
  Avatar,
  colors,
  Dialog,
  DialogContent
} from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { corePushNoti } from "../core/core.actions";
import { Link, Image } from "@material-ui/icons";
import { QRCodeDisplay } from "../components/qrcode";
import { selectCurrentAccount } from "../core/auth/auth.selectors";
import { formatTime } from "../utils/datetime";
import { PrimaryButton } from "../components/form-utils";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { selectReferUrl } from "../core/core.selectors";
import { getReferUrl } from "../utils/refer-url";
const ShareItem = ({
  IconComponent,
  title,
  color = colors.grey[300],
  onClick
}: {
  IconComponent: React.ComponentType<SvgIconProps>;
  onClick: () => any;
  color: string;
  title: string;
}) => (
  <div
    onClick={onClick}
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    <Avatar style={{ background: color, width: 48, height: 48 }}>
      <IconComponent />
    </Avatar>
    <Typography style={{ color: "white", marginTop: "0.8em" }} variant="body2">
      {title}
    </Typography>
  </div>
);

type StateProps = {
  accountName: string | null;
  referUrl: string | null;
};

type DispatchProps = {
  pushNoti: typeof corePushNoti;
};

const mapStateToProps: MapStateToProps<StateProps, {}, CoreState> = state => ({
  accountName: selectCurrentAccount(state),
  referUrl: selectReferUrl(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
  pushNoti: corePushNoti
};

const styles: StyleRulesCallback = theme => ({
  buttonRoot: {
    borderRadius: "unset"
  },
  drawerRoot: {
    height: "188px",
    backgroundColor: "rgba(27,34,48, 0.8)"
  }
});

export const ShareButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    class ShareButton extends React.Component<
      StyledComponentProps<"buttonRoot" | "drawerRoot"> &
        StateProps &
        DispatchProps
    > {
      static Panels = {
        Drawer: "Drawer",
        QRCode: "QRCode"
      };

      state = {
        [ShareButton.Panels.Drawer]: false,
        [ShareButton.Panels.QRCode]: false
      };

      handleExpand = (panel: string) => {
        this.setState(prev => ({
          [panel]: !prev[panel]
        }));
      };

      render() {
        let classes = this.props.classes || {};
        let { pushNoti, accountName, referUrl: referUrlPrefix } = this.props;
        let referUrl = getReferUrl(
          referUrlPrefix as string,
          accountName as string
        );
        return (
          <>
            <PrimaryButton
              onClick={this.handleExpand.bind(this, ShareButton.Panels.Drawer)}
              size="large"
              classes={{ root: classes.buttonRoot }}
              fullWidth
            >
              分享邀请
            </PrimaryButton>
            <SwipeableDrawer
              classes={{ paper: classes.drawerRoot }}
              open={this.state[ShareButton.Panels.Drawer]}
              onOpen={this.handleExpand.bind(this, ShareButton.Panels.Drawer)}
              onClose={this.handleExpand.bind(this, ShareButton.Panels.Drawer)}
              anchor="bottom"
            >
              <Grid
                style={{ height: "100%" }}
                container
                alignItems="center"
                justify="space-evenly"
              >
                {referUrl && accountName && (
                  <CopyToClipboard
                    text={referUrl.trim()}
                    onCopy={() =>
                      pushNoti(`邀请链接已复制到剪贴板`, {
                        variant: "success"
                      })
                    }
                  >
                    <ShareItem
                      IconComponent={Link}
                      title="复制邀请链接"
                      color={colors.orange[300]}
                      onClick={this.handleExpand.bind(
                        this,
                        ShareButton.Panels.Drawer
                      )}
                    />
                  </CopyToClipboard>
                )}
                <ShareItem
                  IconComponent={Image}
                  color={colors.blue[300]}
                  title="邀请二维码"
                  onClick={() => {
                    this.handleExpand(ShareButton.Panels.QRCode);
                    this.handleExpand(ShareButton.Panels.Drawer);
                  }}
                />
              </Grid>
            </SwipeableDrawer>
            <Dialog
              open={this.state[ShareButton.Panels.QRCode]}
              onClose={this.handleExpand.bind(this, ShareButton.Panels.QRCode)}
            >
              <DialogContent style={{ padding: "2em", paddingBottom: "0.5em" }}>
                <QRCodeDisplay
                  text={referUrl}
                  filename={`cybex_invite_${accountName}.png`}
                />
              </DialogContent>
            </Dialog>
          </>
        );
      }
    }
  )
);
