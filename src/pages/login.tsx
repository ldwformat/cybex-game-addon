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
  IAuthParams,
  authUnlock
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
import { withTranslation, WithTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";
import { PassSetter } from "./pass-setter";
import { Locker } from "../components/locker";

type LoginPropsDispatch = {
  login: typeof authLogin;
  logout: typeof authLogout;
  unlock: typeof authUnlock;
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
  unlock: authUnlock,
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
  withTranslation()(
    class Login extends React.Component<
      StyledComponentProps<"paper"> &
        LoginPropsDispatch &
        LoginPropsState &
        LoginProps &
        WithTranslation
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
          switchPanel,
          unlock,
          t
        } = this.props;
        return (
          <>
            <Dialog
              open={isModalShowing}
              disableBackdropClick
              classes={classes && { paper: classes.paper }}
              maxWidth="lg"
              onClose={closeModal}
            >
              <div
                style={{ position: "absolute", right: 0, top: 0, zIndex: 100 }}
              >
                <IconButton onClick={closeModal}>
                  <CloseIcon />
                </IconButton>
              </div>
              {currentPanel === LoginPanel.Unlock ? (
                <>
                  <Button onClick={logout}>登出</Button>
                  <Locker />
                  <Button onClick={() => unlock("qwer1234")}>解锁</Button>
                </>
              ) : (
                <>
                  {currentPanel === LoginPanel.Login ? (
                    <LoginForm onSubmit={this.onSubmit} />
                  ) : (
                    <RegForm onSubmit={this.onRegister} />
                  )}
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
                        ? t(Dict.HasNoAccountYet)
                        : t(Dict.HasAccountAlready)}
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
                          ? t(Dict.AuthRegisterLong)
                          : t(Dict.LoginLong)}
                      </Typography>
                    </a>
                  </div>
                </>
              )}
            </Dialog>

            <PassSetter />
          </>
        );
      }
    }
  )
);

export const Login = connect(
  mapStateToProps,
  mapDispatch
)(LoginClass);
