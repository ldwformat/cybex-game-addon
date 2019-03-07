import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { CoreState } from "../core";
import { gateway, GatewayState, gatewaySelectAsset } from "../core/gateway";
import {
  selectGateway,
  selectGatewayCurrentAsset,
  selectGatewayCurrentDepositInfo,
  selectGatewayCoinList
} from "../core/gateway/gateway.selectors";
import {
  withStyles,
  StyledComponentProps,
  StyleRulesCallback,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Card,
  Button,
  Typography,
  Divider,
  Icon
} from "@material-ui/core";
import QRCode from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import { corePushNoti } from "../core/core.actions";
import { FileCopy, CloudDownload } from "@material-ui/icons";
import { QRCodeDisplay } from "../components/qrcode";
import { withTranslation, WithTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";

type DepositStateProps = {
  gateway: GatewayState;
  coinList: CybexGateway.CoinInfo[];
  currentDeposit: CybexGateway.GetDepositAddress | undefined;
};
type DepositDispatchProps = {
  selectAsset: typeof gatewaySelectAsset;
  pushNoti: typeof corePushNoti;
};

const mapStateToProps: MapStateToProps<
  DepositStateProps,
  {},
  CoreState
> = state => ({
  gateway: selectGateway(state),
  currentDeposit: selectGatewayCurrentDepositInfo(state),
  coinList: selectGatewayCoinList(state)
});
const mapDispatchToProps: MapDispatchToProps<DepositDispatchProps, {}> = {
  selectAsset: gatewaySelectAsset,
  pushNoti: corePushNoti
};

const styles: StyleRulesCallback = theme => ({
  root: {
    height: "100%",
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
  }
});

export const Deposit = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(
      class extends React.Component<
        StyledComponentProps<"root" | "copyCard" | "innerWrapper"> &
          DepositStateProps &
          DepositDispatchProps &
          WithTranslation
      > {
        componentDidMount() {
          if (!this.props.currentDeposit && this.props.coinList.length) {
            this.props.selectAsset(this.props.coinList[0].asset);
          }
        }

        render() {
          let {
            coinList,
            gateway,
            selectAsset,
            currentDeposit,
            pushNoti,
            t
          } = this.props;
          let classes = this.props.classes || {};
          let currentCoin = coinList.find(
            coin => coin.asset === gateway.currentAsset
          );
          return (
            <Paper classes={{ root: classes.root }} square elevation={0}>
              <Grid
                className={classes.innerWrapper}
                container
                direction="column"
                alignItems="center"
                // justify="space-between"
              >
                <FormControl fullWidth>
                  <Select
                    fullWidth
                    value={gateway.currentAsset}
                    onChange={e => selectAsset(e.target.value)}
                    name="currentAsset"
                  >
                    {coinList.map(coin => (
                      <MenuItem key={coin.asset} value={coin.asset}>
                        {coin.currency}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {currentDeposit && (
                  <Grid
                    style={{ marginTop: "2em", textAlign: "center" }}
                    container
                    direction="column"
                    alignItems="center"
                  >
                    <QRCodeDisplay
                      text={currentDeposit.address.trim()}
                      filename={`${currentDeposit &&
                        [
                          currentDeposit.accountName,
                          currentDeposit.type,
                          currentDeposit.address
                        ].join("_")}.png`}
                    />
                  </Grid>
                )}
                <Card elevation={0} classes={{ root: classes.copyCard }}>
                  {currentDeposit && (
                    <CopyToClipboard
                      text={currentDeposit.address}
                      onCopy={() =>
                        pushNoti(
                          `${currentDeposit && currentDeposit.type}${t(
                            Dict.AddressCopied
                          )}`,
                          {
                            variant: "success"
                          }
                        )
                      }
                    >
                      <Grid
                        container
                        direction="column"
                        justify="space-around"
                        wrap="nowrap"
                        alignItems="center"
                        style={{ width: "100%" }}
                      >
                        <Typography
                          style={{
                            overflowWrap: "break-word",
                            whiteSpace: "pre-wrap",
                            maxWidth: "84%",
                            textAlign: "center",
                            padding: "0.5em 0"
                          }}
                          variant="body1"
                        >
                          {currentDeposit.address}
                        </Typography>
                        <Divider
                          style={{ width: "100%", background: "#ececec" }}
                        />
                        <Button color="secondary">
                          {t(Dict.CopyAddress)}
                          <FileCopy
                            style={{ marginLeft: "4px" }}
                            fontSize="small"
                          />
                        </Button>
                      </Grid>
                    </CopyToClipboard>
                  )}
                </Card>
              </Grid>
            </Paper>
          );
        }
      }
    )
  )
);
