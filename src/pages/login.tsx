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
  selectAuthIsLogging
} from "../core/auth/auth.selectors";
import { CoreState } from "../core/core.models";
import {
  AuthState,
  authLogin,
  authShowModal,
  authCloseModal,
  authLogout
} from "../core/auth";
import { gatewayLoadGatewayInfo, gatewaySelectAsset } from "../core/gateway";

import {
  Button,
  Dialog,
  withStyles,
  StyledComponentProps,
  DialogContent,
  DialogActions,
  IconButton
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { Field, reduxForm } from "redux-form";
import { delay } from "../utils";
import {
  renderTextField,
  PrimaryButton
} from "../components/form-utils";
import { corePushNoti } from "../core/core.actions";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";

type LoginPropsDispatch = {
  login: typeof authLogin;
  logout: typeof authLogout;
  alert: typeof corePushNoti;
  showModal: typeof authShowModal;
  closeModal: typeof authCloseModal;
  loadGatewayInfo: typeof gatewayLoadGatewayInfo;
  selectAsset: typeof gatewaySelectAsset;
};

type LoginPropsState = {
  auth: AuthState;
  isLogging: boolean;
  isModalShowing: boolean;
};

const mapStateToProps: MapStateToPropsParam<
  { auth: AuthState },
  {},
  CoreState
> = state => ({
  auth: selectAuth(state),
  isLogging: selectAuthIsLogging(state),
  isModalShowing: selectAuthModal(state)
});

const mapDispatch: MapDispatchToProps<LoginPropsDispatch, {}> = {
  login: authLogin,
  logout: authLogout,
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

const validate = values => {
  const errors: any = {};
  const requiredFields = ["accountName", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};
const asyncValidate = (values /*, dispatch */) => {
  return delay(1000).then(() => {
    // simulate server latency
    if (["foo@foo.com", "bar@bar.com"].includes(values.email)) {
      // eslint-disable-next-line no-throw-literal
      throw { email: "Email already Exists" };
    }
  });
};

const formStyles = {
  root: {}
};
const LoginForm = reduxForm({
  form: "LoginForm", // a unique identifier for this form
  validate,
  asyncValidate
})(props => {
  const { handleSubmit, pristine, reset, submitting, invalid } = props;
  console.debug("Props: ", props);
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent
        style={{
          width: "80%",
          minWidth: "60vw",
          padding: 0,
          margin: "10px 16px"
        }}
      >
        <div style={{ marginBottom: "1em" }}>
          <Field
            autoFocus
            style={{ width: "100%" }}
            name="accountName"
            component={renderTextField}
            label="用户名"
            helperText="请输入您的云钱包账户名"
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <Field
            style={{ width: "100%" }}
            component={renderTextField}
            name="password"
            type="password"
            label="密码"
            helperText="请输入您的云钱包密码"
          />
        </div>
      </DialogContent>
      <DialogActions style={{ margin: "8px 12px" }}>
        <PrimaryButton
          color="primary"
          fullWidth
          type="submit"
          disabled={pristine || submitting || invalid}
        >
          登录
        </PrimaryButton>
      </DialogActions>
    </form>
  );
});

let LoginClass = withStyles(styles)(
  class extends React.Component<
    StyledComponentProps<"paper"> & LoginPropsDispatch & LoginPropsState
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
        auth,
        login,
        logout,
        selectAsset,
        loadGatewayInfo,
        closeModal,
        alert,
        isModalShowing
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
          <LoginForm onSubmit={this.onSubmit} />

          <Button onClick={this.onSubmit}>登录</Button>
          <Button onClick={logout}>登出</Button>
          <button onClick={loadGatewayInfo}>刷新列表</button>
          <button onClick={selectAsset.bind(this, "JADE.ETH")}>
            读取JADE.ETH充值信息
          </button>
          <button onClick={selectAsset.bind(this, "JADE.BTC")}>
            读取JADE.BTC
          </button>
        </Dialog>
      );
    }
  }
);

export const Login = connect(
  mapStateToProps,
  mapDispatch
)(LoginClass);
