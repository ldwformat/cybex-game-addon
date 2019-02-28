import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { CoreState } from "../core";
import { gateway, GatewayState, gatewaySelectAsset } from "../core/gateway";
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
  Select,
  MenuItem,
  FormControl,
  Grid,
  Card,
  Button,
  Typography,
  Divider
} from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { corePushNoti } from "../core/core.actions";
import { FileCopy, CloudDownload } from "@material-ui/icons";
import { QRCodeDisplay } from "../components/qrcode";
import { selectCurrentAccount } from "../core/auth/auth.selectors";

const ReferBg = require("../assets/images/refer-bg.jpg");

type DepositStateProps = {
  accountName: string | null;
  myRegisterReferrer: Backend.Referrer | undefined;
  myRegisterReferral: Backend.TypesReferral | undefined;
  myGameReferrer: Backend.Referrer | undefined;
  myGameReferral: Backend.TypesReferral | undefined;
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
  accountName: selectCurrentAccount(state),
  myRegisterReferrer: selectMyRegisterReferrer(state),
  myRegisterReferral: selectMyRegisterReferral(state),
  myGameReferrer: selectMyGameReferrer(state),
  myGameReferral: selectMyGameReferral(state)
});

const styles: StyleRulesCallback = theme => ({
  root: {
    height: "100%"
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
const referCodeStyle: StyleRulesCallback = theme => ({
  root: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px`,
    height: 160,
    borderRadius: `${theme.spacing.unit}px`,
    boxShadow: `0 ${(theme.spacing.unit * 3) / 4}px ${(theme.spacing.unit * 3) /
      4}px rgba(0,0,0,0.15)`,
    backgroundImage: `url(${ReferBg})`,
    backgroundSize: "cover",
    clipPath: "url(#mask)"
  }
});

export const ReferCode = withStyles(referCodeStyle)(
  ({ code, classes }: { code?: string } & StyledComponentProps<"root">) => (
    <>
      <svg style={{ position: "fixed", zIndex: -1 }}>
        <defs>
          <clipPath id="mask" viewBox="0 0 279 160">
            <path d={`M 0 0 V 70 A 10 10 0 1 1 0 90 V 160 H 279 V 90 a 10 10 0 0 1 0 -20 V 0 z`} />
          </clipPath>
        </defs>
      </svg>
      <div className={classes && (classes.root as string)}>{code && code}</div>
    </>
  )
);

export const Refer = connect(mapStateToProps)(
  withStyles(styles)(
    class extends React.Component<
      StyledComponentProps<"root" | "copyCard" | "innerWrapper"> &
        DepositStateProps &
        DepositDispatchProps
    > {
      render() {
        let { accountName } = this.props;
        let classes = this.props.classes || {};

        return (
          <Paper classes={{ root: classes.root }} square elevation={0}>
            <ReferCode code={accountName as string} />
          </Paper>
        );
      }
    }
  )
);
