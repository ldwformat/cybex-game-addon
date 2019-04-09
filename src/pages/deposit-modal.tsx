import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { CoreState } from "../core";
import {
  gateway,
  GatewayState,
  gatewaySelectAsset,
  gatewayModalClose
} from "../core/gateway";
import {
  selectGateway,
  selectGatewayCurrentAsset,
  selectGatewayCurrentDepositInfo,
  selectGatewayCoinList,
  selectGatewayModalShow
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
  Icon,
  InputLabel,
  Input
} from "@material-ui/core";
import QRCode from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import { corePushNoti } from "../core/core.actions";
import { FileCopy, CloudDownload } from "@material-ui/icons";
import { QRCodeDisplay } from "../components/qrcode";
import { withTranslation, WithTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";
import { CoinInfo, GetDepositAddress } from "../utils/fetcher";
import { DialogWrapper } from "../components/dialog-wrapper";
import { PrimaryButton } from "../components/form-utils";

type DepositStateProps = {
  showModal: boolean;
  gateway: GatewayState;
  coinList: CoinInfo[];
  currentDeposit: GetDepositAddress | undefined;
};
type DepositDispatchProps = {
  closeModal: typeof gatewayModalClose;
  selectAsset: typeof gatewaySelectAsset;
  pushNoti: typeof corePushNoti;
};

const mapStateToProps: MapStateToProps<
  DepositStateProps,
  {},
  CoreState
> = state => ({
  showModal: selectGatewayModalShow(state),
  gateway: selectGateway(state),
  currentDeposit: selectGatewayCurrentDepositInfo(state),
  coinList: selectGatewayCoinList(state)
});
const mapDispatchToProps: MapDispatchToProps<DepositDispatchProps, {}> = {
  selectAsset: gatewaySelectAsset,
  closeModal: gatewayModalClose,
  pushNoti: corePushNoti
};

const styles: StyleRulesCallback = theme => ({
  root: {
    height: "100%"
  },
  innerWrapper: {
    margin: `${theme.spacing.unit * 2}px 0`,
    // width: `calc(100% - ${theme.spacing.unit * 4}px)`,
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

export const DepositModal = connect(
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
            showModal,
            closeModal,
            t
          } = this.props;
          let classes = this.props.classes || {};
          let currentCoin = coinList.find(
            coin => coin.asset === gateway.currentAsset
          );
          return (
            <DialogWrapper
              open={showModal}
              dialogProps={{ disableBackdropClick: true }}
              onCloseClick={closeModal}
              title={"充值"}
            >
              <Paper classes={{ root: classes.root }} square elevation={0}>
                <Grid
                  className={classes.innerWrapper}
                  container
                  direction="column"
                  alignItems="center"
                  // justify="space-between"
                >
                  <FormControl fullWidth>
                    <InputLabel
                      style={{ fontSize: "17.5px" }}
                      shrink
                      htmlFor="currentAsset"
                    >
                      {t(Dict.AssetType)}
                    </InputLabel>
                    <Select
                      fullWidth
                      displayEmpty
                      value={gateway.currentAsset}
                      input={<Input name="currentAsset" id="currentAsset" />}
                      onChange={e => selectAsset(e.target.value)}
                      style={{ fontSize: "16px" }}
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
                    <Typography
                      style={{
                        overflowWrap: "break-word",
                        whiteSpace: "pre-wrap",
                        textAlign: "center",
                        fontSize: "14px",
                        padding: "24px 0"
                      }}
                      variant="body1"
                    >
                      {currentDeposit && currentDeposit.address}
                    </Typography>
                  </Card>

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
                      <PrimaryButton
                        fullWidth
                        style={{
                          height: "48px",
                          marginTop: "24px",
                          fontSize: "16px"
                        }}
                      >
                        {t(Dict.CopyAddress)}
                      </PrimaryButton>
                    </CopyToClipboard>
                  )}
                </Grid>
              </Paper>
            </DialogWrapper>
          );
        }
      }
    )
  )
);
