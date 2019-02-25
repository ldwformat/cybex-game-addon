import * as React from "react";
import {
  connect,
  MapStateToPropsParam,
  MapStateToProps,
  MapDispatchToProps
} from "react-redux";
import { selectAuth } from "../core/auth/auth.selectors";
import { CoreState } from "../core";
import { AuthState, authLogin } from "../core/auth";
import { gatewayLoadGatewayInfo, gatewaySelectAsset } from "../core/gateway";

import { Button } from "@material-ui/core";

const mapStateToProps: MapStateToPropsParam<
  { auth: AuthState },
  {},
  CoreState
> = state => ({
  auth: selectAuth(state)
});

const mapDispatch: MapDispatchToProps<
  {
    login: typeof authLogin;
    loadGatewayInfo: typeof gatewayLoadGatewayInfo;
    selectAsset: typeof gatewaySelectAsset;
  },
  {}
> = {
  login: authLogin,
  loadGatewayInfo: gatewayLoadGatewayInfo,
  selectAsset: gatewaySelectAsset
};

class LoginClass extends React.Component<{
  auth: AuthState;
  login: typeof authLogin;
  loadGatewayInfo: typeof gatewayLoadGatewayInfo;
  selectAsset: typeof gatewaySelectAsset;
}> {
  constructor(props) {
    super(props);
    console.debug("New Login: ", props);
  }
  render() {
    let { auth, login, selectAsset, loadGatewayInfo } = this.props;
    return (
      <>
        <code>{JSON.stringify(auth.account)}</code>
        <h1>Login Page Works!</h1>
        <Button
          onClick={() =>
            login({
              accountName: "create-test12",
              password: "qwer1234qwer1234"
            })
          }
        >
          登录
        </Button>
        <button onClick={loadGatewayInfo}>刷新列表</button>
        <button onClick={selectAsset.bind(this, "JADE.ETH")}>
          读取JADE.ETH充值信息
        </button>
        <button onClick={selectAsset.bind(this, "JADE.BTC")}>
          读取JADE.BTC
        </button>
      </>
    );
  }
}

export const Login = connect(
  mapStateToProps,
  mapDispatch
)(LoginClass);
