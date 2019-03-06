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
// const validate = username =>
//   !username || username.trim() === "" ? "Username is a required field" : null;

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
export const LoginForm = class LoginForm extends React.Component<
  any,
  {
    showPassword: boolean;
  }
> {
  state = {
    showPassword: false
  };
  render() {
    const { onSubmit } = this.props as any;
    const styleOfContent = {
      width: "90%",
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
                  label="用户名"
                  helperText="请输入您的云钱包账户名"
                />
              </div>
              <div style={{ marginBottom: "1em" }}>
                <Field
                  style={{ width: "100%" }}
                  fullWidth
                  name="password"
                  type={this.state.showPassword ? "text" : "password"}
                  label="密码"
                  helperText="请输入您的云钱包密码"
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
                登录
              </PrimaryButton>
            </DialogActions>
          </form>
        )}
      />
    );
  }
};
