import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { CoreState } from "../core";
import {
  gateway,
  GatewayState,
  gatewaySelectAsset,
  gatewayModalClose,
  gatewaySelectFirstAsset,
  GatewayModalState,
  gatewayVerifyAddress,
  AddressVerifyState,
  gatewayWithdraw
} from "../core/gateway";
import {
  selectGateway,
  selectGatewayCurrentAsset,
  selectGatewayCurrentDepositInfo,
  selectGatewayCoinList,
  selectGatewayModalShow,
  selectGatewayModalState,
  selectGatewayAddressVerification,
  selectGatewayCurrentCoinInfo
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
  Input,
  Tabs,
  Tab,
  InputAdornment,
  TextField
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
import { selectBalances, BalanceObj } from "../core/auth";

type DepositStateProps = {
  modalState: GatewayModalState;
  state: CoreState;
  gateway: GatewayState;
  balances: BalanceObj;
  coinList: CoinInfo[];
  currentCoinInfo: CoinInfo | undefined;
  currentDeposit: GetDepositAddress | undefined;
};
type DepositDispatchProps = {
  doWithdraw: typeof gatewayWithdraw;
  verifyAddress: typeof gatewayVerifyAddress;
  closeModal: typeof gatewayModalClose;
  selectAsset: typeof gatewaySelectAsset;
  selectFirstAsset: typeof gatewaySelectFirstAsset;
  pushNoti: typeof corePushNoti;
};

const mapStateToProps: MapStateToProps<
  DepositStateProps,
  {},
  CoreState
> = state => ({
  modalState: selectGatewayModalState(state),
  gateway: selectGateway(state),
  balances: selectBalances(state),
  currentDeposit: selectGatewayCurrentDepositInfo(state),
  currentCoinInfo: selectGatewayCurrentCoinInfo(state),
  coinList: selectGatewayCoinList(state),
  state
});
const mapDispatchToProps: MapDispatchToProps<DepositDispatchProps, {}> = {
  doWithdraw: gatewayWithdraw,
  verifyAddress: gatewayVerifyAddress,
  selectAsset: gatewaySelectAsset,
  selectFirstAsset: gatewaySelectFirstAsset,
  closeModal: gatewayModalClose,
  pushNoti: corePushNoti
};

const styles: StyleRulesCallback = theme => ({
  root: {
    height: "470px"
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
  },
  inputBase: {
    fontSize: "16px"
  },
  inputLabel: {
    fontSize: "17.6px"
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
        state = {
          currentTab: 0,
          withValue: 0,
          address: ""
        };
        componentDidMount() {
          if (!this.props.currentDeposit) {
            this.props.selectFirstAsset();
          }
        }

        render() {
          let {
            coinList,
            gateway,
            verifyAddress,
            selectAsset,
            currentDeposit,
            currentCoinInfo,
            pushNoti,
            modalState,
            doWithdraw,
            closeModal,
            balances,
            state,
            t
          } = this.props;
          let classes = this.props.classes || {};
          let currentCoin = coinList.find(
            coin => coin.asset === gateway.currentAsset
          );
          let balance =
            currentDeposit && balances
              ? balances[currentDeposit.asset]
              : { value: 0 };
          let addressError =
            !!this.state.address &&
            !!currentDeposit &&
            selectGatewayAddressVerification(
              currentDeposit.type,
              this.state.address
            )(state) === AddressVerifyState.Invalid;
          let addressValid =
            !!this.state.address &&
            !!currentDeposit &&
            selectGatewayAddressVerification(
              currentDeposit.type,
              this.state.address
            )(state) === AddressVerifyState.Valid;
          let withdrawValid =
            addressValid &&
            currentCoinInfo &&
            this.state.withValue >= +currentCoinInfo.raw.minWithdraw;
          this.state.withValue <= balance.value && this.state.withValue > 0;
          return (
            <DialogWrapper
              open={modalState !== GatewayModalState.Closed}
              dialogProps={{ disableBackdropClick: true }}
              onCloseClick={closeModal}
              title={t(Dict.Funding)}
            >
              <Tabs
                value={this.state.currentTab}
                onChange={(e, currentTab) => this.setState({ currentTab })}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label={t(Dict.Deposit)} />
                {/* <Tab label={t(Dict.Withdraw)} /> */}
              </Tabs>
              {this.state.currentTab === 0 && (
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
              )}
              {this.state.currentTab === 1 && (
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
                    <FormControl fullWidth>
                      <InputLabel
                        style={{ fontSize: "17.5px" }}
                        htmlFor="withValue"
                      >
                        {t(Dict.Amount)}
                      </InputLabel>
                      <Input
                        id="withValue"
                        placeholder={t(Dict.WithdrawMinimum)} 
                        value={this.state.withValue}
                        style={{ fontSize: "16px" }}
                        onChange={e =>
                          this.setState({ withValue: Number(e.target.value) })
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            {balance.value}
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        id="address"
                        label={t(Dict.WithdrawAddress)}
                        error={addressError}
                        helperText={(addressError && t(Dict.AddressError)) || " "}
                        InputLabelProps={{
                          style: {
                            fontSize: "17.5px"
                          }
                        }}
                        inputProps={{
                          style: {
                            fontSize: "16px"
                          }
                        }}
                        value={this.state.address}
                        onChange={e =>
                          this.setState({ address: e.target.value }, () => {
                            if (this.state.address && currentDeposit) {
                              verifyAddress(
                                currentDeposit.type,
                                this.state.address
                              );
                            }
                          })
                        }
                      />
                    </FormControl>
                    <div style={{ marginTop: "12px" }} />
                    <Grid container wrap="nowrap">
                      {/* <FormControl>
                        <InputLabel
                          style={{ fontSize: "17.5px" }}
                          htmlFor="minWithdraw"
                        >
                          {t(Dict.WithdrawMinimum)}
                        </InputLabel>
                        <Input
                          disabled
                          disableUnderline
                          id="minWithdraw"
                          value={
                            currentCoinInfo && currentCoinInfo.raw.minDeposit
                          }
                          style={{ fontSize: "16px" }}
                        />
                      </FormControl> */}
                      <FormControl>
                        <InputLabel
                          style={{ fontSize: "17.5px" }}
                          htmlFor="withdrawFee"
                        >
                          {t(Dict.WithdrawalFee)}
                        </InputLabel>
                        <Input
                          disabled
                          disableUnderline
                          id="withdrawFee"
                          value={
                            currentCoinInfo && currentCoinInfo.raw.withdrawFee
                          }
                          style={{ fontSize: "16px" }}
                        />
                      </FormControl>
                      <FormControl>
                        <InputLabel
                          style={{ fontSize: "17.5px" }}
                          htmlFor="withdrawFee"
                        >
                          {t(Dict.YouWillGet)}
                        </InputLabel>
                        <Input
                          disabled
                          disableUnderline
                          id="withdrawFee"
                          value={Math.max(
                            0,
                            this.state.withValue -
                            (currentCoinInfo
                              ? +currentCoinInfo.raw.withdrawFee
                              : this.state.withValue)
                          )}
                          style={{ fontSize: "16px" }}
                        />
                      </FormControl>
                    </Grid>
                    <PrimaryButton
                      fullWidth
                      disabled={!withdrawValid}
                      style={{
                        height: "48px",
                        marginTop: "24px",
                        fontSize: "16px"
                      }}
                      onClick={() => {
                        if (!currentCoinInfo) {
                          return;
                        }
                        doWithdraw({
                          to: currentCoinInfo.raw.gatewayAccount,
                          asset: currentCoinInfo.asset,
                          coinType: currentCoinInfo.currency,
                          address: this.state.address,
                          value: this.state.withValue,
                          memoPrefix: currentCoinInfo.raw.withdrawPrefix
                        });
                      }}
                    >
                      {t(Dict.Withdraw)}
                    </PrimaryButton>
                  </Grid>
                </Paper>
              )}
            </DialogWrapper>
          );
        }
      }
    )
  )
);
