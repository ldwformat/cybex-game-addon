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
import { IEffectDeps } from "../core/modes";
import { calcValue } from "../utils/calc";
import { withToolset } from "../providers/toolset";
import { debounce } from "lodash";
import BigNumber from "bignumber.js";

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
    // height: "470px"
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

export const DepositModal = withToolset(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withTranslation()(
      class extends React.Component<
        StyledComponentProps<"root" | "copyCard" | "innerWrapper"> &
        DepositStateProps &
        DepositDispatchProps &
        WithTranslation & { toolset: IEffectDeps }
        > {
        state = {
          currentTab: 0,
          withValue: "",
          address: "",
          fee: 0,
          feeCurrency: "",
          feeAsset: {}
        };
        verifyAddress = debounce(this.props.verifyAddress, 150);

        updateFee = debounce(async () => {
          if (!this.props.balances) {
            return
          }

          let currentAsset = this.props.currentDeposit;
          if (!currentAsset) {
            return this.setState({ fee: 0 })
          }

          const currentCoinInfo = this.props.currentCoinInfo;
          let memo = this.state.address;
          if (currentCoinInfo) {
            memo = `${currentCoinInfo.raw.withdrawPrefix}:${currentCoinInfo.currency}:${this.state.address}`;
          }

          let res = await this.props.toolset.chainAssisant.getFakeTransferFee("CYB", memo)
          let asset = await this.props.toolset.fetcher.fetchAsset("CYB");

          if (this.props.balances["CYB"]["value"] >= calcValue(res.amount, asset.precision)) {
            this.setState({
              fee: calcValue(res.amount, asset.precision),
              feeCurrency: "CYB",
              feeAsset: res
            });
          } else {
            res = await this.props.toolset.chainAssisant.getFakeTransferFee(currentAsset.asset, memo)
            asset = await this.props.toolset.fetcher.fetchAsset(currentAsset.asset);
            if (!asset) { return; }

            this.setState({
              fee: calcValue(res.amount, asset.precision),
              feeCurrency: currentCoinInfo && currentCoinInfo.currency,
              feeAsset: res
            });
          }
        }, 150)
        setAddress = (e) => {
          this.setState({ address: e.target.value }, () => {
            if (this.state.address && this.props.currentDeposit) {
              this.verifyAddress(
                this.props.currentDeposit.type,
                this.state.address
              );
            }
            this.updateFee();
          });
        }

        setWithValue = (e) => {
          this.setState({
            withValue: e.target.value
          })
        }

        componentDidMount() {
          if (!this.props.currentDeposit) {
            this.props.selectFirstAsset();
          }
          this.updateFee();
        }
        componentDidUpdate(prevProps) {
          if (this.props.state.gateway.withdrawSuccess && this.props.state.gateway.withdrawSuccess !== prevProps.state.gateway.withdrawSuccess) {
            this.setState({
              withValue: "",
              address: "",
            })
          }
          if (this.props.currentDeposit !== prevProps.currentDeposit) {
            this.updateFee();
          }

          if (this.props.modalState != prevProps.modalState && this.props.modalState == GatewayModalState.Closed) {
            this.setState({
              withValue: "",
              address: "",
            })
          }

          if (!prevProps.balances && this.props.balances) {
            this.updateFee();
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
            toolset,
            t
          } = this.props;
          let classes = this.props.classes || {};
          let currentCoin = coinList.find(
            coin => coin.asset === gateway.currentAsset
          );
          let balance = (currentDeposit &&
            balances &&
            balances[currentDeposit.asset]) || { value: 0 };
          
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


          let withValueError = false
          let withValueErrorMsg = ""

          if (this.state.withValue !== "") {
            if (currentCoinInfo &&
              Number(this.state.withValue) < +currentCoinInfo.raw.minWithdraw) {
                withValueErrorMsg = t(Dict.withValueErrorMsgLess)
                withValueError = true
            }
  
            if (Number(this.state.withValue) > balance.value) {
              withValueErrorMsg = t(Dict.withValueErrorMsgOver)
              withValueError = true
            }
          }

          let withdrawValid =
            addressValid &&
            currentCoinInfo &&
            Number(this.state.withValue) >= +currentCoinInfo.raw.minWithdraw &&
            (new BigNumber(balance.value).minus(Number(this.state.withValue)).toNumber() >= 0);

          let willGet = ""

          if (this.state.feeCurrency == "CYB") {
            willGet = Math.max(new BigNumber(this.state.withValue || 0).minus(Number(currentCoinInfo ? currentCoinInfo.raw.withdrawFee : 0)).toNumber(), 0) + " " + (currentCoinInfo && currentCoinInfo.currency)
          } else {
            if (new BigNumber(balance.value).minus(this.state.withValue || 0).toNumber() >= this.state.fee) {
              willGet = Math.max(new BigNumber(this.state.withValue || 0).minus(Number(currentCoinInfo ? currentCoinInfo.raw.withdrawFee : 0)).toNumber(), 0) + " " + (currentCoinInfo && currentCoinInfo.currency)
            } else {
              let left = new BigNumber(balance.value).minus(this.state.withValue || 0).toNumber()
              willGet = Math.max(new BigNumber(this.state.withValue || 0).minus(Number(currentCoinInfo ? currentCoinInfo.raw.withdrawFee : 0)).minus(this.state.fee).plus(left).toNumber(), 0) + " " + (currentCoinInfo && currentCoinInfo.currency)
            }
          }

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
                <Tab label={t(Dict.Withdraw)} />
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
                    {/* coinList */}
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
                    {/* amount */}
                    <FormControl fullWidth>
                      <TextField
                        id="withValue"
                        label={t(Dict.Amount)}
                        error={withValueError}
                        helperText={
                          (withValueError && withValueErrorMsg || " ")
                        }
                        InputLabelProps={{
                          style: {
                            fontSize: "17.5px"
                          }
                        }}
                        InputProps={{
                          style: {
                            fontSize: "16px"
                          },
                          placeholder: t(Dict.WithdrawMinimum),
                          type: "number",
                          endAdornment: <InputAdornment position="end" style={{ width: "80px", textAlign: "right" }}>
                            {t(Dict.Balance) + ": " + balance.value}
                          </InputAdornment>
                        }}
                        value={this.state.withValue}
                        onChange={this.setWithValue}
                      />
                    </FormControl>
                    {/* address */}
                    <FormControl fullWidth>
                      <TextField
                        id="address"
                        label={t(Dict.WithdrawAddress)}
                        error={addressError}
                        helperText={
                          (addressError && t(Dict.AddressError).replace("{symbol}", currentCoinInfo ? currentCoinInfo.currency : "")) || " "
                        }
                        InputLabelProps={{
                          style: {
                            fontSize: "17.5px"
                          }
                        }}
                        InputProps={{
                          style: {
                            fontSize: "16px"
                          }
                        }}
                        value={this.state.address}
                        onChange={this.setAddress}
                      />
                    </FormControl>
                    <div style={{ marginTop: "12px" }} />
                    <Grid container>
                      <Grid item xs={6} sm={3}>
                        <FormControl>
                          <InputLabel
                            style={{ fontSize: "17.5px", lineHeight: "20px" }}
                            htmlFor="minWithdraw"
                          >
                            {t(Dict.WithdrawMinimum)}
                          </InputLabel>
                          <Input
                            disabled
                            disableUnderline
                            id="minWithdraw"
                            value={
                              currentCoinInfo && (currentCoinInfo.raw.minWithdraw + " " + currentCoinInfo.currency)
                            }
                            style={{ fontSize: "14px", marginTop: "30px" }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <FormControl>
                          <InputLabel
                            style={{ fontSize: "17.5px", lineHeight: "20px" }}
                            htmlFor="withdrawFee"
                          >
                            {t(Dict.WithdrawalFee)}
                          </InputLabel>
                          <Input
                            disabled
                            disableUnderline
                            id="withdrawFee"
                            value={
                              currentCoinInfo && (currentCoinInfo.raw.withdrawFee + " " + currentCoinInfo.currency)
                            }
                            style={{ fontSize: "14px", marginTop: "30px" }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <FormControl>
                          <InputLabel
                            style={{ fontSize: "17.5px", lineHeight: "20px" }}
                            htmlFor="transferFee"
                          >
                            {t(Dict.TransferFee)}
                          </InputLabel>
                          <Input
                            disabled
                            disableUnderline
                            id="transferFee"
                            value={this.state.fee + " " + this.state.feeCurrency}
                            style={{ fontSize: "14px", marginTop: "30px" }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        {/* 实际到账 */}
                        <FormControl>
                          <InputLabel
                            style={{ fontSize: "17.5px", lineHeight: "20px" }}
                            htmlFor="willGet"
                          >
                            {t(Dict.YouWillGet)}
                          </InputLabel>
                          <Input
                            disabled
                            disableUnderline
                            id="willGet"
                            value={willGet}
                            style={{ fontSize: "14px", marginTop: "30px" }}
                          />
                        </FormControl>
                       </Grid>
                    </Grid>
                    <div style={{ display: "flex", flexDirection: "column", fontSize: "14px", lineHeight: "22px" }}>
                      <p style={{ margin: 0, color: "#000000" }}>{t(Dict.WithdrawImportant)}：</p>
                      <p style={{ margin: 0, color: "#9b9b9b" }}>{t(Dict.WithdrawImportantAddress)}</p>
                      <p style={{ margin: 0, color: "#9b9b9b" }}>{t(Dict.WithdrawImportantFee)}</p>
                    </div>
                    <PrimaryButton
                      fullWidth
                      disabled={!withdrawValid}
                      style={{
                        display: "flex", 
                        height: "48px",
                        marginTop: "24px",
                        fontSize: "16px"
                      }}
                      onClick={() => {
                        if (!currentCoinInfo) {
                          return;
                        }

                        let value = 0;
                        if (this.state.feeCurrency == "CYB") {
                          value = Number(this.state.withValue)
                        } else {
                          if (new BigNumber(balance.value).minus(this.state.withValue || 0).toNumber() < this.state.fee) {
                            let left = new BigNumber(balance.value).minus(this.state.withValue || 0).toNumber()
                            value = new BigNumber(this.state.withValue || 0).minus(this.state.fee).plus(left).toNumber()
                          } else {
                            value = Number(this.state.withValue)
                          }
                        }

                        doWithdraw({
                          to: currentCoinInfo.raw.gatewayAccount,
                          fee: this.state.feeAsset as any,
                          asset: currentCoinInfo.asset,
                          coinType: currentCoinInfo.currency,
                          address: this.state.address,
                          value,
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
));
