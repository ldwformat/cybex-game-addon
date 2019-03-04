import * as React from "react";
import {
  connect,
  MapStateToPropsParam,
  MapStateToProps,
  MapDispatchToProps
} from "react-redux";
import {
  selectAuth,
  selectAuthModal,
  selectAuthIsLogging,
  selectLoginPanel
} from "../core/auth/auth.selectors";
import { CoreState } from "../core/core.models";
import {
  AuthState,
  authLogin,
  authShowModal,
  authCloseModal,
  authLogout,
  LoginPanel,
  FaucetCaptcha,
  authModalSwitchPanel
} from "../core/auth";
import { gatewayLoadGatewayInfo, gatewaySelectAsset } from "../core/gateway";

import {
  Button,
  Dialog,
  withStyles,
  StyledComponentProps,
  IconButton,
  Typography
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { corePushNoti } from "../core/core.actions";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { LoginForm } from "../components/login-form";
import { RegForm } from "../components/reg-form";

type LoginPropsDispatch = {
  login: typeof authLogin;
  logout: typeof authLogout;
  alert: typeof corePushNoti;
  showModal: typeof authShowModal;
  switchPanel: typeof authModalSwitchPanel;
  closeModal: typeof authCloseModal;
  loadGatewayInfo: typeof gatewayLoadGatewayInfo;
  selectAsset: typeof gatewaySelectAsset;
};

type LoginPropsState = {
  auth: AuthState;
  isLogging: boolean;
  isModalShowing: boolean;
  currentPanel: LoginPanel;
  captcha: FaucetCaptcha;
};

const mapStateToProps: MapStateToPropsParam<
  { auth: AuthState },
  {},
  CoreState
> = state => ({
  auth: selectAuth(state),
  currentPanel: selectLoginPanel(state),
  isLogging: selectAuthIsLogging(state),
  isModalShowing: selectAuthModal(state)
});

const mapDispatch: MapDispatchToProps<LoginPropsDispatch, {}> = {
  login: authLogin,
  logout: authLogout,
  switchPanel: authModalSwitchPanel,
  alert: corePushNoti,
  closeModal: authCloseModal,
  showModal: authShowModal,
  loadGatewayInfo: gatewayLoadGatewayInfo,
  selectAsset: gatewaySelectAsset
};

const styles = theme => ({
  paper: {
    margin: 0,
    padding: "16px 0 8px 0"
  }
});

type LoginProps = {
  onRegister: () => any;
};

let LoginClass = withStyles(styles)(
  class Login extends React.Component<
    StyledComponentProps<"paper"> &
      LoginPropsDispatch &
      LoginPropsState &
      LoginProps
  > {
    logging$ = new Subject();

    componentDidUpdate = (prevProps, prevState) => {
      if (prevProps.isLogging && !this.props.isLogging) {
        this.logging$.next(false);
      }
    };

    constructor(props) {
      super(props);
      console.debug("New Login: ", props);
    }

    onSubmit = data => {
      return new Promise((resolve, reject) => {
        this.props.login(data);
        this.logging$
          .pipe(take(1))
          .subscribe(() => setTimeout(resolve, 2000), reject);
      });
    };

    render() {
      let {
        classes,
        logout,
        closeModal,
        isModalShowing,
        currentPanel,
        switchPanel
      } = this.props;
      return (
        <Dialog
          open={isModalShowing}
          disableBackdropClick
          classes={classes && { paper: classes.paper }}
          maxWidth="lg"
          onClose={closeModal}
        >
          <div style={{ position: "absolute", right: 0, top: 0 }}>
            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </div>
          {currentPanel === LoginPanel.Login ? (
            <LoginForm onSubmit={this.onSubmit}>
              <div style={{ textAlign: "right" }}>
                <a
                  href="javascript:;"
                  style={{ textDecoration: "none" }}
                  onClick={switchPanel}
                >
                  <Typography component="span" color="secondary">
                    注册新账户
                  </Typography>
                </a>
              </div>
            </LoginForm>
          ) : (
            <RegForm onSubmit={this.onSubmit}>
              <div style={{ textAlign: "right" }}>
                <a
                  href="javascript:;"
                  style={{ textDecoration: "none" }}
                  onClick={switchPanel}
                >
                  <Typography component="span" color="secondary">
                    返回登录
                  </Typography>
                </a>
              </div>
            </RegForm>
          )}
          <Button onClick={logout}>登出</Button>
        </Dialog>
      );
    }
  }
);

export const Login = connect(
  mapStateToProps,
  mapDispatch
)(LoginClass);
