import * as React from "react";
import { PrimaryButton, renderTextField } from "../components/form-utils";
import { delay } from "../utils";
import {
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel
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
import { withTranslation, useTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";
import { unstable_useMediaQuery } from "@material-ui/core/useMediaQuery";

export type RegFormData = {
  accountName: string | null;
  password: string | null;
  confirm?: string | null;
  captcha: string | null;
  referer?: string | null;
};

const validate = values => {
  const errors: any = {};
  const requiredFields = [
    "accountName",
    "password",
    "confirm",
    "captcha",
    "agreement"
  ];
  console.debug("Values: ", values);
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = Dict[`ErrorRequired_${field}`] || Dict.ErrorRequired;
    }
  });
  if (
    values.accountName &&
    (!!ChainValidation.is_account_name_error(values.accountName, false) ||
      !ChainValidation.is_cheap_name(values.accountName))
  ) {
    errors.accountName = Dict.AuthRegAccountNameHelper;
  }
  if (
    values.password &&
    !/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{12,}/.test(values.password)
  ) {
    errors.password = Dict.AuthRegPasswordHelper;
  }
  if (values.confirm && values.confirm !== values.password) {
    errors.confirm = Dict.ErrorMatch;
  }
  return errors;
};

const usernameAvailable = toolset => async (value: string) => {
  if (!value) {
    return Dict.ErrorRequired_accountName;
  }
  let { chainAssisant } = toolset as IEffectDeps;
  let res = await chainAssisant.getAccounts(value);
  if (res[0]) {
    return Dict.ErrorAccountExists;
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
    agreement: false,
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
export const RegForm = withToolset(
  connect(
    mapStateToProps,
    mapDispatch
  )(props => {
    const [showPassword, switchPassword] = React.useState(false);
    const [showConfirm, switchConfirm] = React.useState(false);
    const { t, i18n } = useTranslation();
    const matches = unstable_useMediaQuery("(min-width:600px)");
    const styleOfContent = {
      padding: 0,
      margin: "16px 0"
    };
    const {
      onSubmit,
      invalid,
      getCaptcha,
      captcha,
      valid,
      defaultReferer,
      children,
      toolset
    } = props;
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
            agreement: false,
            captcha: ""
          } as RegFormData
        }
        render={({
          handleSubmit,
          submitting,
          pristine,
          values,
          invalid,
          valid
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent style={styleOfContent}>
              <div style={{ marginBottom: "0.5em" }}>
                <Field
                  autoFocus
                  style={{ width: "100%" }}
                  name="accountName"
                  component={renderTextField as any}
                  validate={usernameAvailable(toolset)}
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
                  type={showPassword ? "text" : "password"}
                  label={t(Dict.AuthPassword)}
                  helperText={t(Dict.AuthRegPasswordHelper)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          tabIndex={-1}
                          onClick={() => switchPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
                  type={showConfirm ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          tabIndex={-1}
                          onClick={() => switchConfirm(!showConfirm)}
                        >
                          {showConfirm ? <VisibilityOff /> : <Visibility />}
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
              <div style={{ marginBottom: "1em" }}>
                <Field
                  style={{ width: "100%" }}
                  name="referer"
                  component={renderTextField as any}
                  disabled={!!defaultReferer}
                  label={t(Dict.AuthReferrer)}
                  helperText={t(Dict.AuthReferrerHelper)}
                />
              </div>
              <div>
                <Field
                  name="agreement"
                  component={({ input }) => (
                    <FormControlLabel
                      style={{ marginRight: 0, textAlign: "justify" }}
                      htmlFor="agreement"
                      onClick={() => input.onChange(!input.value as any)}
                      control={
                        <Checkbox
                          id="agreement"
                          checked={input.value ? true : false}
                          onChange={input.onChange}
                        />
                      }
                      label={t(Dict.PasswordBackupTip)}
                    />
                  )}
                  type="checkbox"
                />
              </div>
            </DialogContent>
            <DialogContent style={styleOfContent}>{children}</DialogContent>
            <DialogActions style={{ margin: 0 }}>
              <PrimaryButton
                color="primary"
                fullWidth
                type="submit"
                style={{ height: "48px", fontSize: "16px", margin: 0 }}
                disabled={pristine || submitting || invalid}
              >
                {t(Dict.AuthRegister)}
              </PrimaryButton>
            </DialogActions>
          </form>
        )}
      />
    );
  })
);
