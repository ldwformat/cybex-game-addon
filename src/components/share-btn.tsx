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
  DialogContent,
  Drawer
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
import { withTranslation, WithTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";
import { PosterDisplay, Poster } from "./poster";
import { selectAccountReferUrl } from "../core/refer";

const ShareItem = ({
  IconComponent,
  title,
  color = colors.grey[300],
  style,
  onClick
}: {
  IconComponent: React.ComponentType<SvgIconProps>;
  onClick: () => any;
  color: string;
  title: string;
  style?: any;
}) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      ...style
    }}
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
  accountReferUrl: string | null;
};

type DispatchProps = {
  pushNoti: typeof corePushNoti;
};

const mapStateToProps: MapStateToProps<StateProps, {}, CoreState> = state => ({
  accountName: selectCurrentAccount(state),
  accountReferUrl: selectAccountReferUrl(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
  pushNoti: corePushNoti
};

const styles: StyleRulesCallback = theme => ({
  buttonRoot: {
    borderRadius: "unset",
    flexShrink: 0
  },
  drawerRoot: {
    height: "188px",
    backgroundColor: "rgba(27,34,48, 0.8)"
  }
});

export enum Panels {
  Drawer = "Drawer",
  QRCode = "QRCode",
  RefReadme = "RefReadme"
}

export const ShareButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(
      class ShareButton extends React.Component<
        StyledComponentProps<"buttonRoot" | "drawerRoot"> &
          StateProps &
          DispatchProps &
          WithTranslation
      > {
        state = {
          [Panels.Drawer]: false,
          [Panels.QRCode]: false
        };

        handleExpand = (panel: string) => {
          this.setState(prev => ({
            [panel]: !prev[panel]
          }));
        };

        render() {
          let classes = this.props.classes || {};
          let { pushNoti, accountName, accountReferUrl, t } = this.props;
          return (
            <>
              <PrimaryButton
                onClick={this.handleExpand.bind(this, Panels.Drawer)}
                size="large"
                classes={{ root: classes.buttonRoot }}
                fullWidth
              >
                {t(Dict.ShareLink)}
              </PrimaryButton>
              {accountReferUrl && accountName && (
                <Drawer
                  classes={{ paper: classes.drawerRoot }}
                  open={this.state[Panels.Drawer]}
                  // onOpen={this.handleExpand.bind(this, Panels.Drawer)}
                  onClose={this.handleExpand.bind(this, Panels.Drawer)}
                  anchor="bottom"
                >
                  <Grid
                    style={{ height: "100%" }}
                    container
                    alignItems="center"
                    justify="space-around"
                  >
                    {accountReferUrl && (
                      <CopyToClipboard
                        text={`${t(
                          Dict.CopyShareLinkPrefix
                        )} ${accountReferUrl}`}
                        onCopy={() =>
                          pushNoti(t(Dict.ShareLinkCopied), {
                            variant: "success"
                          })
                        }
                      >
                        <ShareItem
                          IconComponent={Link}
                          title={t(Dict.CopyShareLink)}
                          // style={{ width: "50%", textAlign: "center" }}
                          color={colors.orange[300]}
                          onClick={this.handleExpand.bind(this, Panels.Drawer)}
                        />
                      </CopyToClipboard>
                    )}
                    <ShareItem
                      IconComponent={Image}
                      color={colors.blue[300]}
                      title={t(Dict.ShareQRCode)}
                      // style={{ width: "50%", textAlign: "center" }}
                      onClick={() => {
                        this.handleExpand(Panels.QRCode);
                        this.handleExpand(Panels.Drawer);
                      }}
                    />
                  </Grid>
                </Drawer>
              )}

              <Poster
                open={this.state[Panels.QRCode]}
                onClose={this.handleExpand.bind(this, Panels.QRCode)}
                posterLink={accountReferUrl}
                filename={`cybex_invite_${accountName}.png`}
              />
            </>
          );
        }
      }
    )
  )
);
