import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { renderTextField, PrimaryButton } from "../components/form-utils";
import { delay } from "../utils";
import {
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { AccountCircle, VisibilityOff, Visibility } from "@material-ui/icons";

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

export const LoginForm = reduxForm({
  form: "LoginForm", // a unique identifier for this form
  validate
})(
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
      const { handleSubmit, pristine, reset, submitting, invalid } = this
        .props as any;
      console.debug("Props: ", this.props);
      const styleOfContent = {
        width: "80%",
        minWidth: "60vw",
        padding: 0,
        margin: "10px 16px"
      };
      return (
        <form onSubmit={handleSubmit}>
          <DialogContent style={styleOfContent}>
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
                type={this.state.showPassword ? "text" : "password"}
                label="密码"
                helperText="请输入您的云钱包密码"
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
      );
    }
  }
);
