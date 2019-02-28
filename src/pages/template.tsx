import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { CoreState } from "../core";
import { gateway, GatewayState, gatewaySelectAsset } from "../core/gateway";
import { selectGateway } from "../core/gateway/gateway.selectors";
import {
  withStyles,
  StyledComponentProps,
  StyleRulesCallback
} from "@material-ui/core";

type DepositStateProps = { gateway: GatewayState };
type DepositDispatchProps = { selectAsset: typeof gatewaySelectAsset };

const mapStateToProps: MapStateToProps<
  DepositStateProps,
  {},
  CoreState
> = state => ({
  gateway: selectGateway(state)
});
const mapDispatchToProps: MapDispatchToProps<
  DepositDispatchProps,
  {}
> = dispatch => ({
  selectAsset: gatewaySelectAsset
});

const styles: StyleRulesCallback = theme => ({
  root: {}
});

const Deposit = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    class extends React.Component<
      StyledComponentProps<"root"> & DepositStateProps & DepositDispatchProps
    > {}
  )
);
