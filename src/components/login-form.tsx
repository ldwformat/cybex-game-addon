import * as React from "react";
import { Form, Field } from "react-final-form";

import { PrimaryButton, renderTextField } from "../components/form-utils";
import {
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { AccountCircle, VisibilityOff, Visibility } from "@material-ui/icons";
import { useTranslation, withTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";
// const validate = username =>
//   !username || username.trim() === "" ? "Username is a required field" : null;

const validate = values => {
  const errors: any = {};
  const requiredFields = ["accountName", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = Dict[`ErrorRequired_${field}`] || Dict.ErrorRequired;
    }
  });
  return errors;
};
export const LoginForm = withTranslation()(
  class LoginForm extends React.Component<
    any,
    {
      showPassword: boolean;
    }
  > {
    state = {
      showPassword: false
    };
    render() {
      const { onSubmit, t } = this.props as any;
      const styleOfContent = {
        minWidth: "70vw",
        padding: 0,
        margin: "10px 16px"
      };
      return (
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({
            handleSubmit,
            reset,
            submitting,
            pristine,
            values,
            invalid
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent style={styleOfContent}>
                <div style={{ marginBottom: "1em" }}>
                  <Field
                    fullWidth
                    autoFocus
                    name="accountName"
                    component={renderTextField as any}
                    type="text"
                    label={t(Dict.AuthAccountName)}
                    helperText={t(Dict.AuthAccountNameHelper)}
                  />
                </div>
                <div style={{ marginBottom: "1em" }}>
                  <Field
                    style={{ width: "100%" }}
                    fullWidth
                    name="password"
                    type={this.state.showPassword ? "text" : "password"}
                    label={t(Dict.AuthPassword)}
                    helperText={t(Dict.AuthLoginPasswordHelper)}
                    component={renderTextField as any}
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
                  {t(Dict.LoginSubmit)}
                </PrimaryButton>
              </DialogActions>
            </form>
          )}
        />
      );
    }
  }
);
