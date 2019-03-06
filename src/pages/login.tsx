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
  selectLoginPanel,
  selectDefaultReferer
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
  authModalSwitchPanel,
  authRegImpl,
  IAuthParams
} from "../core/auth";
import { gatewayLoadGatewayInfo, gatewaySelectAsset } from "../core/gateway";
import {
  Button,
  Dialog,
  withStyles,
  StyledComponentProps,
  IconButton,
  Typography,
  DialogActions
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { corePushNoti } from "../core/core.actions";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { LoginForm } from "../components/login-form";
import { RegForm, RegFormData } from "../components/reg-form";
import { PositionProperty } from "csstype";
import { selectGame } from "../core/core.selectors";

type LoginPropsDispatch = {
  login: typeof authLogin;
  logout: typeof authLogout;
  regImpl: typeof authRegImpl;
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
  defaultReferrer: string | null;
  game: string;
  captcha: FaucetCaptcha;
};

const mapStateToProps: MapStateToPropsParam<
  { auth: AuthState },
  {},
  CoreState
> = state => ({
  auth: selectAuth(state),
  game: selectGame(state),
  defaultReferrer: selectDefaultReferer(state),
  currentPanel: selectLoginPanel(state),
  isLogging: selectAuthIsLogging(state),
  isModalShowing: selectAuthModal(state)
});

const mapDispatch: MapDispatchToProps<LoginPropsDispatch, {}> = {
  login: authLogin,
  regImpl: authRegImpl,
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
    position: "relative" as PositionProperty,
    margin: 0,
    width: "90vw",
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

    onSubmit = _data => {
      let data: IAuthParams = {
        ..._data,
        refer: this.props.defaultReferrer
          ? {
              referrer: this.props.defaultReferrer,
              action: this.props.game
            }
          : undefined
      };
      return new Promise((resolve, reject) => {
        this.props.login(data);
        this.logging$
          .pipe(take(1))
          .subscribe(() => setTimeout(resolve, 2000), reject);
      });
    };

    onRegister = (regData: RegFormData) => {
      return new Promise((resolve, reject) => {
        this.props.regImpl(regData);
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
            <LoginForm onSubmit={this.onSubmit} />
          ) : (
            <RegForm onSubmit={this.onRegister} />
          )}
          {/* <Button onClick={logout}>登出</Button> */}
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#fff",
              position: "sticky",
              padding: "0.5em",
              bottom: "-8px"
            }}
          >
            <Typography style={{ display: "inline" }} component="span">
              {currentPanel === LoginPanel.Login
                ? "还没有Cybex云账户？"
                : "已经有Cybex云账户？"}
            </Typography>

            <a
              href="javascript:;"
              style={{ textDecoration: "none" }}
              onClick={switchPanel}
            >
              <Typography
                style={{ display: "inline" }}
                component="span"
                color="secondary"
              >
                {currentPanel === LoginPanel.Login
                  ? "注册新账户"
                  : "登录云账户"}
              </Typography>
            </a>
          </div>
        </Dialog>
      );
    }
  }
);

export const Login = connect(
  mapStateToProps,
  mapDispatch
)(LoginClass);
