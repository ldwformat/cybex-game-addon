import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { CoreState } from "../core";
import { gatewaySelectAsset } from "../core/gateway";
import {
  selectMyRegisterReferrer,
  selectMyGameReferral,
  selectMyRegisterReferral,
  selectMyGameReferrer,
  Referrer,
  TypesReferral,
  selectTotalRebatesByAsset,
  selectReferRebates,
  ReferSingleRebateWithValue,
  SummaryAsset,
  selectAccountReferUrl
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
  SwipeableDrawer,
  Hidden,
  Icon,
  Grid,
  colors
} from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { corePushNoti } from "../core/core.actions";
import {
  FileCopy,
  CloudDownload,
  ExpandLess,
  ExpandMore,
  AccountBox,
  AccountCircle,
  ShareRounded
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
import { ListPanel, EmptyTip } from "../components/list-panel";
import { EmptyPrize } from "../icons/empty-prize";
import { EmptyInvite } from "../icons/empty-invite";
import { InviteCard } from "../components/invite-card";
import { Account, EmailOpen, ContentCopy } from "mdi-material-ui";
import { InviteSummary } from "../components/invite-summary";
import { normalizeAssetName } from "../utils/asset-name";
import { Colors } from "../components/colors";
import { InviteBtnPC } from "../components/invite-btn-pc";
import { selectReferUrl } from "../core/core.selectors";

type StateProps = {
  accountName: string | null;
  totalRebate: number;
  accountReferUrl: string | null;
  myRegisterReferrer: Referrer | undefined;
  myRegisterReferral: TypesReferral | undefined;
  myGameReferrer: Referrer | undefined;
  myGameReferral: TypesReferral | undefined;
  rebates: ReferSingleRebateWithValue[];
};
type DispatchProps = {
  selectAsset: typeof gatewaySelectAsset;
  pushNoti: typeof corePushNoti;
};

const mapStateToProps: MapStateToProps<StateProps, {}, CoreState> = state => ({
  accountReferUrl: selectAccountReferUrl(state),
  accountName: selectCurrentAccount(state),
  totalRebate: selectTotalRebatesByAsset(SummaryAsset.USDT)(state),
  myRegisterReferrer: selectMyRegisterReferrer(state),
  myRegisterReferral: selectMyRegisterReferral(state),
  myGameReferrer: selectMyGameReferrer(state),
  myGameReferral: selectMyGameReferral(state),
  rebates: selectReferRebates(state)
});

const mapDispatchToProps: MapDispatchToProps<
  { pushNoti: typeof corePushNoti },
  any
> = {
  pushNoti: corePushNoti
};

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
  },
  accountText: {
    flexShrink: 1,
    wordBreak: "break-word"
  },
  textRight: {
    textAlign: "right"
  },
  noShrink: {
    flexShrink: 0
  },
  itemV: {
    padding: "12px 0"
  },
  itemH: {
    padding: "0 12px"
  },
  summary: {
    flexShrink: 0,
    flexBasis: "auto",
    height: "255px",
    flexGrow: 0
  }
});

export const Refer = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(
      class Refer extends React.Component<
        StyledComponentProps<
          | "root"
          | "copyCard"
          | "innerWrapper"
          | "buttonRoot"
          | "textRight"
          | "accountText"
          | "noShrink"
          | "itemH"
          | "itemV"
          | "summary"
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

        _renderMobile = () => {
          let {
            accountName,
            myGameReferrer,
            myGameReferral,
            myRegisterReferrer,
            myRegisterReferral,
            totalRebate,
            t
          } = this.props;
          let classes = this.props.classes || {};
          return (
            <Paper classes={{ root: classes.root }} square elevation={0}>
              <div style={{ flex: "1 10 auto", overflowY: "auto" }}>
                {/* <ReferCode code={accountName as string} /> */}
                <div
                  className="wrapper"
                  style={{ margin: "16px", width: "calc(100% - 32px)" }}
                >
                  <InviteSummary title="Demo" amount={totalRebate} />
                </div>
                <List>
                  <ListItem divider>
                    <ListItemText
                      style={{ flexShrink: 0 }}
                      primary={t(Dict.MyRegisterReferrer)}
                    />
                    <Typography
                      className={`${classes.textRight} ${classes.accountText}`}
                      variant="body1"
                    >
                      {(myRegisterReferrer && myRegisterReferrer.referrer) ||
                        "-"}
                    </Typography>
                  </ListItem>
                  <ListItem divider>
                    <ListItemText
                      style={{ flexShrink: 0 }}
                      primary={t(Dict.MyGameReferrer)}
                    />
                    {(myGameReferrer && myGameReferrer.referrer && (
                      <Typography
                        className={`${classes.textRight} ${
                          classes.accountText
                        }`}
                        variant="body1"
                      >
                        {myGameReferrer && myGameReferrer.referrer}
                      </Typography>
                    )) || (
                      <Button
                        color="secondary"
                        style={{ padding: 0 }}
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
                    divider
                    onClick={this.handleExpand.bind(
                      this,
                      Refer.Panels.RegisterRef
                    )}
                  >
                    <ListItemText primary={t(Dict.MyRegisterReferral)} />
                    {(myRegisterReferral &&
                      myRegisterReferral.referrals.length.toString()) ||
                      0}
                    {t(Dict.PeopleUnit)}{" "}
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
                            <ListItemText
                              classes={{ primary: classes.accountText }}
                              primary={refer.referral}
                            />
                            <Typography style={{ flexShrink: 0 }}>
                              {formatTime(refer.ts)}
                            </Typography>
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
                    {t(Dict.PeopleUnit)}{" "}
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
                            <ListItemText
                              classes={{ primary: classes.accountText }}
                              primary={refer.referral}
                            />
                            <Typography style={{ flexShrink: 0 }}>
                              {formatTime(refer.ts)}
                            </Typography>
                          </ListItem>
                        ))}
                    </List>
                  </Collapse>
                </List>
              </div>
              <ShareButton />
            </Paper>
          );
        };

        render() {
          let {
            accountName,
            totalRebate,
            pushNoti,
            myGameReferrer,
            myGameReferral,
            myRegisterReferrer,
            myRegisterReferral,
            rebates,
            accountReferUrl,
            t
          } = this.props;
          let classes = this.props.classes || {};

          return (
            <>
              <Hidden smUp>
                {/* for Mobile */
                this._renderMobile()}
              </Hidden>
              <Hidden xsDown>
                <Grid
                  item
                  xs
                  container
                  direction="column"
                  alignItems="center"
                  wrap="nowrap"
                  className={classes.itemV}
                  style={{ height: "100%", overflow: "auto" }}
                >
                  <Grid
                    item
                    xs
                    container
                    className={classes.itemV}
                    classes={{ container: classes.summary }}
                  >
                    <Grid item className={classes.itemH} container xs={6}>
                      <InviteSummary title="Demo" amount={totalRebate} />
                    </Grid>
                    <Grid item className={classes.itemH} container xs={6}>
                      <ListPanel
                        listData={rebates}
                        emptyComponent={
                          <EmptyTip
                            IconComponent={EmptyPrize}
                            title={t(Dict.EmptyRebate)}
                          />
                        }
                        colConfig={[
                          {
                            name: "asset",
                            header: Dict.AssetType,
                            align: "left",
                            cell: (asset: Cybex.Asset) =>
                              normalizeAssetName(asset.symbol)
                          },
                          {
                            name: "should_transferValue",
                            header: Dict.ToBeCleard,
                            align: "right"
                          },
                          {
                            name: "transferredValue",
                            header: Dict.Cleard,
                            align: "right",
                            cellStyle: {
                              color: Colors.primary
                            }
                          }
                        ]}
                        title={t(Dict.RebateDetail)}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    className={classes.itemV}
                    style={{ flexShrink: 0 }}
                  >
                    <Grid item className={classes.itemH} xs={4}>
                      <InviteCard
                        title={t(Dict.MyRefererCode)}
                        color={colors.purple[300]}
                        IconComponent={EmailOpen}
                      >
                        <Typography
                          variant="h4"
                          style={{
                            overflowWrap: "break-word",
                            maxWidth: "100%"
                          }}
                          align="center"
                        >
                          {accountName ? accountName : "-"}
                        </Typography>
                        {accountName && (
                          <CopyToClipboard
                            text={accountName}
                            onCopy={() =>
                              pushNoti(t(Dict.ReferCodeCopied), {
                                variant: "success"
                              })
                            }
                          >
                            <PrimaryButton
                              size="large"
                              style={{
                                fontSize: "14px",
                                marginLeft: "0.2em"
                              }}
                            >
                              <ContentCopy
                                style={{
                                  marginRight: "0.3em",
                                  fontSize: "18px"
                                }}
                              />
                              {t(Dict.Copy)}
                            </PrimaryButton>
                          </CopyToClipboard>
                        )}
                      </InviteCard>
                    </Grid>
                    <Grid item className={classes.itemH} xs={4}>
                      <InviteCard
                        title={t(Dict.MyRegisterReferrer)}
                        color={colors.blue[300]}
                        IconComponent={Account}
                      >
                        <Typography variant="h4" align="center">
                          {(myRegisterReferrer &&
                            myRegisterReferrer.referrer) ||
                            "-"}
                        </Typography>
                      </InviteCard>
                    </Grid>
                    <Grid item className={classes.itemH} xs={4}>
                      <InviteCard
                        title={t(Dict.MyGameReferrer)}
                        color={colors.yellow[700]}
                        IconComponent={Account}
                      >
                        <Typography variant="h4" align="center">
                          {(myGameReferrer && myGameReferrer.referrer) || (
                            <PrimaryButton
                              size="large"
                              style={{ fontSize: "14px", width: "16em" }}
                              onClick={this.handleExpand.bind(
                                this,
                                Refer.Panels.ReferModal
                              )}
                            >
                              {t(Dict.PatchReferrer)}
                            </PrimaryButton>
                          )}
                        </Typography>
                      </InviteCard>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs
                    container
                    className={classes.itemV}
                    //  spacing={24}
                    style={{ minHeight: "231px" }}
                  >
                    <Grid item className={classes.itemH} container xs={6}>
                      <ListPanel
                        listData={
                          (myRegisterReferral &&
                            myRegisterReferral.referrals) ||
                          []
                        }
                        emptyComponent={
                          <EmptyTip
                            IconComponent={EmptyInvite}
                            title={t(Dict.EmptyRegisterReferral)}
                          />
                        }
                        colConfig={[
                          {
                            name: "referral",
                            header: Dict.ReferralName,
                            align: "left"
                          },
                          {
                            name: "ts",
                            header: Dict.InviteTime,
                            cell: ts => formatTime(ts),
                            align: "right"
                          }
                        ]}
                        title={`${t(
                          Dict.MyRegisterReferral
                        )} (${(myRegisterReferral &&
                          myRegisterReferral.referrals.length) ||
                          0}${t(Dict.PeopleUnit)})`}
                      />
                    </Grid>
                    <Grid item className={classes.itemH} container xs={6}>
                      <ListPanel
                        listData={
                          (myGameReferral && myGameReferral.referrals) || []
                        }
                        emptyComponent={
                          <EmptyTip
                            IconComponent={EmptyInvite}
                            title={t(Dict.EmptyGameReferral)}
                          />
                        }
                        colConfig={[
                          {
                            name: "referral",
                            header: Dict.ReferralName,
                            align: "left"
                          },
                          {
                            name: "ts",
                            header: Dict.InviteTime,
                            cell: ts => formatTime(ts),
                            align: "right"
                          }
                        ]}
                        title={`${t(Dict.MyGameReferral)} (${(myGameReferral &&
                          myGameReferral.referrals.length) ||
                          0}${t(Dict.PeopleUnit)})`}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <InviteBtnPC
                  copyText={`${t(Dict.CopyShareLinkPrefix)} ${accountReferUrl}`}
                  accountName={accountName}
                  accountReferUrl={accountReferUrl}
                  onCopyLinkClick={() =>
                    pushNoti(t(Dict.ShareLinkCopied), {
                      variant: "success"
                    })
                  }
                  onHelpClick={() => void 0}
                />
              </Hidden>
              <ReferModal
                isModalShowing={this.state[Refer.Panels.ReferModal]}
                onModalClose={this.handleExpand.bind(
                  this,
                  Refer.Panels.ReferModal
                )}
              />
            </>
          );
        }
      }
    )
  )
);
export default Refer;
