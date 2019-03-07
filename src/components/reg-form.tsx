import * as React from "react";
import { PrimaryButton, renderTextField } from "../components/form-utils";
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
  authRegGetCaptcha,
  selectDefaultReferer
} from "../core/auth";
import { CoreState } from "../core";
import { Form, Field } from "react-final-form";
import { withTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";

export type RegFormData = {
  accountName: string | null;
  password: string | null;
  confirm?: string | null;
  captcha: string | null;
  referer?: string | null;
};

const validate = values => {
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

const usernameAvailable = toolset => async (value: string) => {
  if (!value) {
    return "Required";
  }
  let { chainAssisant } = toolset as IEffectDeps;
  let res = await chainAssisant.getAccounts(value);
  if (res[0]) {
    return "Exists";
  }
  return null;
};

const mapStateToProps: MapStateToPropsParam<
  {
    captcha: FaucetCaptcha | null;
    defaultReferer: string | null;
    initialValues?: Partial<RegFormData>;
  },
  {},
  CoreState
> = state => ({
  captcha: selectRegCaptcha(state),
  defaultReferer: selectDefaultReferer(state),
  initialValues: {
    accountName: "",
    password: "",
    confirm: "",
    captcha: "",
    referer: selectDefaultReferer(state) || ""
  }
});

type LoginPropsDispatch = {
  getCaptcha: typeof authRegGetCaptcha;
};

const mapDispatch: MapDispatchToProps<LoginPropsDispatch, {}> = {
  getCaptcha: authRegGetCaptcha
};

// Register Form
export const RegForm = withTranslation()(
  withToolset(
    connect(
      mapStateToProps,
      mapDispatch
    )(
      class RegForm extends React.Component<
        any,
        { showPassword: boolean; showConfirm: boolean }
      > {
        form: HTMLFormElement | null = null;
        state = {
          showPassword: false,
          showConfirm: false
        };

        render() {
          const {
            onSubmit,
            invalid,
            getCaptcha,
            captcha,
            defaultReferer,
            t
          } = this.props;
          const styleOfContent = {
            width: "90%",
            minWidth: "60vw",
            maxWidth: "90vw",
            padding: 0,
            margin: "10px auto"
          };
          return (
            <Form
              onSubmit={onSubmit}
              validate={validate}
              initialValues={
                {
                  accountName: "",
                  password: "",
                  confirm: "",
                  referer: defaultReferer,
                  captcha: ""
                } as RegFormData
              }
              render={({ handleSubmit, submitting, pristine, values }) => (
                <form ref={form => (this.form = form)} onSubmit={handleSubmit}>
                  <DialogContent style={styleOfContent}>
                    <div style={{ marginBottom: "0.5em" }}>
                      <Field
                        autoFocus
                        style={{ width: "100%" }}
                        name="accountName"
                        component={renderTextField as any}
                        validate={usernameAvailable(this.props.toolset)}
                        autoFocusd
                        label={t(Dict.AuthAccountName)}
                        helperText={t(Dict.AuthRegAccountNameHelper)}
                      />
                    </div>
                    <div style={{ marginBottom: "0.5em" }}>
                      <Field
                        style={{ width: "100%" }}
                        component={renderTextField as any}
                        name="password"
                        type={this.state.showPassword ? "text" : "password"}
                        label={t(Dict.AuthPassword)}
                        helperText={t(Dict.AuthRegPasswordHelper)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                tabIndex={-1}
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
                        component={renderTextField as any}
                        name="confirm"
                        label={t(Dict.AuthPasswordConfirm)}
                        helperText={t(Dict.AuthRegConfirmHelper)}
                        type={this.state.showConfirm ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                tabIndex={-1}
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
                        component={renderTextField as any}
                        name="captcha"
                        type="text"
                        label={t(Dict.AuthCaptcha)}
                        helperText={t(Dict.AuthCaptchaHelper)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {captcha && (
                                <SVGInline
                                  svg={(captcha as FaucetCaptcha).data.replace(
                                    "#4AA0E2",
                                    "#FFFFFF"
                                  )}
                                  onClick={getCaptcha}
                                />
                              )}
                            </InputAdornment>
                          )
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "0.5em" }}>
                      <Field
                        style={{ width: "100%" }}
                        name="referer"
                        component={renderTextField as any}
                        disabled={!!defaultReferer}
                        label={t(Dict.AuthReferrer)}
                        helperText={t(Dict.AuthReferrerHelper)}
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
                      {t(Dict.AuthRegister)}
                    </PrimaryButton>
                  </DialogActions>
                </form>
              )}
            />
          );
        }
      }
    )
  )
);
