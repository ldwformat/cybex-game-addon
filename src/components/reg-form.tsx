import * as React from "react";
import { Field, reduxForm, ValidateCallback } from "redux-form";
import { renderTextField, PrimaryButton } from "../components/form-utils";
import { delay } from "../utils";
import {
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { withToolset } from "../providers/toolset";
import { ChainValidation } from "../cybex/chain";
import { IEffectDeps } from "../core/modes";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import SVGInline from "react-svg-inline";
import { connect, MapStateToPropsParam, MapDispatchToProps } from "react-redux";
import {
  selectRegCaptcha,
  FaucetCaptcha,
  authRegGetCaptcha
} from "../core/auth";
import { CoreState } from "../core";

type FormData = {
  accountName: string | null;
  password: string | null;
  confirm: string | null;
  captcha: string | null;
};
const validate = (values: FormData) => {
  const errors: any = {};
  const requiredFields = ["accountName", "password", "confirm", "captcha"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.accountName &&
    (!!ChainValidation.is_account_name_error(values.accountName, false) ||
      !ChainValidation.is_cheap_name(values.accountName))
  ) {
    errors.accountName = "Invalid";
  }
  if (
    values.password &&
    !/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{12,}/.test(values.password)
  ) {
    errors.password = "Invalid";
  }
  if (values.confirm && values.confirm !== values.password) {
    errors.confirm = "Match";
  }
  return errors;
};

const asyncValidate = (values: FormData, dispatch, { toolset }) => {
  let accountName = values.accountName;
  if (accountName) {
    let { chainAssisant } = toolset as IEffectDeps;
    return chainAssisant.getAccounts(accountName).then(res => {
      console.debug("MayNull: ", res);
      if (res[0]) {
        throw {
          accountName: "Exists"
        };
      }
      return null;
    });
  }
  return delay(0).then(() => {
    return null;
  });
};

const mapStateToProps: MapStateToPropsParam<
  { captcha: FaucetCaptcha | null },
  {},
  CoreState
> = state => ({
  captcha: selectRegCaptcha(state)
});

type LoginPropsDispatch = {
  getCaptcha: typeof authRegGetCaptcha;
};

const mapDispatch: MapDispatchToProps<LoginPropsDispatch, {}> = {
  getCaptcha: authRegGetCaptcha
};

// Register Form
export const RegForm = withToolset(
  reduxForm({
    form: "RegForm", // a unique identifier for this form
    validate,
    asyncValidate
  })(connect(
    mapStateToProps,
    mapDispatch
  )(
    class RegForm extends React.Component<
      any,
      { showPassword: boolean; showConfirm: boolean }
    > {
      state = {
        showPassword: false,
        showConfirm: false
      };
      render() {
        const {
          handleSubmit,
          pristine,
          submitting,
          invalid,
          getCaptcha,
          captcha
        } = this.props;
        const styleOfContent = {
          width: "80%",
          minWidth: "60vw",
          padding: 0,
          margin: "10px 16px"
        };
        return (
          <form onSubmit={handleSubmit}>
            <DialogContent style={styleOfContent}>
              <div style={{ marginBottom: "0.5em" }}>
                <Field
                  autoFocus
                  style={{ width: "100%" }}
                  name="accountName"
                  component={renderTextField}
                  label="用户名"
                  helperText={`请输入您的云钱包账户名, 用户名须为小写，并需包含数字或字母间连字符"-"`}
                />
              </div>
              <div style={{ marginBottom: "0.5em" }}>
                <Field
                  style={{ width: "100%" }}
                  component={renderTextField}
                  name="password"
                  type={this.state.showPassword ? "text" : "password"}
                  label="密码"
                  helperText="包含至少 12 位字符, 且需要同时包含数字和大小写英文字母，并推荐包含特殊符号。"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            this.setState(prev => ({
                              showPassword: !prev.showPassword
                            }))
                          }
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div style={{ marginBottom: "0.5em" }}>
                <Field
                  style={{ width: "100%" }}
                  component={renderTextField}
                  name="confirm"
                  label="确认密码"
                  helperText="再次输入您的密码"
                  type={this.state.showConfirm ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            this.setState(prev => ({
                              showConfirm: !prev.showConfirm
                            }))
                          }
                        >
                          {this.state.showConfirm ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div style={{ marginBottom: "0.5em" }}>
                <Field
                  style={{ width: "100%" }}
                  component={renderTextField}
                  name="captcha"
                  type="text"
                  label="验证码"
                  helperText="请输入右侧验证码"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {captcha && (
                          <SVGInline
                            svg={(captcha as FaucetCaptcha).data}
                            onClick={getCaptcha}
                          />
                        )}
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </DialogContent>
            <DialogContent style={styleOfContent}>
              {this.props.children}
            </DialogContent>
            <DialogActions style={{ margin: "8px 12px" }}>
              <PrimaryButton
                color="primary"
                fullWidth
                type="submit"
                disabled={pristine || submitting || invalid}
              >
                注册
              </PrimaryButton>
            </DialogActions>
          </form>
        );
      }
    }
  ) as any)
);
