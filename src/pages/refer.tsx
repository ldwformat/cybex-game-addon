import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { CoreState } from "../core";
import { gatewaySelectAsset } from "../core/gateway";
import {
  selectMyRegisterReferrer,
  selectMyGameReferral,
  selectMyRegisterReferral,
  selectMyGameReferrer
} from "../core/refer";
import {
  withStyles,
  StyledComponentProps,
  StyleRulesCallback,
  Paper,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  Typography,
  Button,
  SwipeableDrawer
} from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { corePushNoti } from "../core/core.actions";
import {
  FileCopy,
  CloudDownload,
  ExpandLess,
  ExpandMore
} from "@material-ui/icons";
import { QRCodeDisplay } from "../components/qrcode";
import { selectCurrentAccount } from "../core/auth/auth.selectors";
import { ReferCode } from "../components/refer-code";
import { formatTime } from "../utils/datetime";
import { PrimaryButton } from "../components/form-utils";
import { ShareButton } from "../components/share-btn";
import { ReferModal } from "../components/refer-modal";
import { Dict } from "../providers/i18n";
import { withTranslation, WithTranslation } from "react-i18next";

type StateProps = {
  accountName: string | null;
  myRegisterReferrer: Backend.Referrer | undefined;
  myRegisterReferral: Backend.TypesReferral | undefined;
  myGameReferrer: Backend.Referrer | undefined;
  myGameReferral: Backend.TypesReferral | undefined;
};
type DispatchProps = {
  selectAsset: typeof gatewaySelectAsset;
  pushNoti: typeof corePushNoti;
};

const mapStateToProps: MapStateToProps<StateProps, {}, CoreState> = state => ({
  accountName: selectCurrentAccount(state),
  myRegisterReferrer: selectMyRegisterReferrer(state),
  myRegisterReferral: selectMyRegisterReferral(state),
  myGameReferrer: selectMyGameReferrer(state),
  myGameReferral: selectMyGameReferral(state)
});

const styles: StyleRulesCallback = theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  innerWrapper: {
    margin: theme.spacing.unit * 2,
    width: `calc(100% - ${theme.spacing.unit * 4}px)`,
    height: "100%",
    "&>*:not(:first-of-type)": {
      marginTop: theme.spacing.unit * 2
    }
  },
  copyCard: {
    background: "rgb(243,243,243)",
    width: "100%"
  },
  buttonRoot: {
    borderRadius: "unset"
  }
});

export const Refer = connect(mapStateToProps)(
  withStyles(styles)(
    withTranslation()(
      class Refer extends React.Component<
        StyledComponentProps<
          "root" | "copyCard" | "innerWrapper" | "buttonRoot"
        > &
          StateProps &
          DispatchProps &
          WithTranslation
      > {
        static Panels = {
          RegisterRef: "RegisterRef",
          GameRegisterRef: "GameRegisterRef",
          Drawer: "Drawer",
          ReferModal: "ReferModal"
        };

        state = {
          [Refer.Panels.RegisterRef]: false,
          [Refer.Panels.GameRegisterRef]: false,
          [Refer.Panels.Drawer]: false,
          [Refer.Panels.ReferModal]: false
        };

        componentWillUnmount = () => {
          this.setState({
            [Refer.Panels.RegisterRef]: false,
            [Refer.Panels.GameRegisterRef]: false,
            [Refer.Panels.Drawer]: false,
            [Refer.Panels.ReferModal]: false
          });
        };

        handleExpand = (panel: string) => {
          this.setState(prev => ({
            [panel]: !prev[panel]
          }));
        };

        render() {
          let {
            accountName,
            myGameReferrer,
            myGameReferral,
            myRegisterReferrer,
            myRegisterReferral,
            t
          } = this.props;
          let classes = this.props.classes || {};

          return (
            <Paper classes={{ root: classes.root }} square elevation={0}>
              <div style={{ flex: "1 1 auto", overflowY: "auto" }}>
                <ReferCode code={accountName as string} />
                <List>
                  <ListItem divider>
                    <ListItemText primary={t(Dict.MyRegisterReferrer)} />
                    {(myRegisterReferrer && myRegisterReferrer.referrer) || "-"}
                  </ListItem>
                  <ListItem divider>
                    <ListItemText primary={t(Dict.MyGameReferrer)} />
                    {(myGameReferrer && myGameReferrer.referrer) || (
                      <Button
                        color="secondary"
                        onClick={this.handleExpand.bind(
                          this,
                          Refer.Panels.ReferModal
                        )}
                      >
                        {t(Dict.PatchReferrer)}
                      </Button>
                    )}
                  </ListItem>
                  <ListItem
                    button
                    onClick={this.handleExpand.bind(
                      this,
                      Refer.Panels.RegisterRef
                    )}
                  >
                    <ListItemText primary={t(Dict.MyGameReferral)} />
                    {(myRegisterReferral &&
                      myRegisterReferral.referrals.length.toString()) ||
                      0}
                    人{" "}
                    {this.state[Refer.Panels.RegisterRef] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItem>
                  <Collapse
                    in={this.state[Refer.Panels.RegisterRef]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List style={{ opacity: 0.5 }} disablePadding>
                      {myRegisterReferral &&
                        myRegisterReferral.referrals.map(refer => (
                          <ListItem key={refer.referral} divider>
                            <ListItemText primary={refer.referral} />
                            <Typography>{formatTime(refer.ts)}</Typography>
                          </ListItem>
                        ))}
                    </List>
                  </Collapse>
                  <ListItem
                    button
                    divider
                    onClick={this.handleExpand.bind(
                      this,
                      Refer.Panels.GameRegisterRef
                    )}
                  >
                    <ListItemText primary={t(Dict.MyGameReferral)} />
                    {(myGameReferral &&
                      myGameReferral.referrals.length.toString()) ||
                      0}
                    人{" "}
                    {this.state[Refer.Panels.GameRegisterRef] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItem>
                  <Collapse
                    in={this.state[Refer.Panels.GameRegisterRef]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List style={{ opacity: 0.5 }} disablePadding>
                      {myGameReferral &&
                        myGameReferral.referrals.map(refer => (
                          <ListItem divider key={refer.referral}>
                            <ListItemText primary={refer.referral} />
                            <Typography>{formatTime(refer.ts)}</Typography>
                          </ListItem>
                        ))}
                    </List>
                  </Collapse>
                </List>
              </div>
              <ShareButton />
              <ReferModal
                isModalShowing={this.state[Refer.Panels.ReferModal]}
                onModalClose={this.handleExpand.bind(
                  this,
                  Refer.Panels.ReferModal
                )}
              />
            </Paper>
          );
        }
      }
    )
  )
);
