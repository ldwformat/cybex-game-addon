import * as React from "react";
import { Form } from "react-form";
import { PrimaryButton, createTextField } from "../components/form-utils";
import {
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { AccountCircle, VisibilityOff, Visibility } from "@material-ui/icons";
const validate = username =>
  !username || username.trim() === "" ? "Username is a required field" : null;

const AccountNameInput = createTextField(validate);
const PasswordInput = createTextField(validate);

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
      <Form>
        {formApi => (
          <form onSubmit={onSubmit}>
            <DialogContent style={styleOfContent}>
              <div style={{ marginBottom: "1em" }}>
                <AccountNameInput
                  autoFocus
                  style={{ width: "100%" }}
                  name="accountName"
                  field="accountName"
                  label="用户名"
                  helperText="请输入您的云钱包账户名"
                />
              </div>
              <div style={{ marginBottom: "1em" }}>
                <PasswordInput
                  style={{ width: "100%" }}
                  field="password"
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
                disabled={formApi.validationFailed}
              >
                登录
              </PrimaryButton>
            </DialogActions>
          </form>
        )}
      </Form>
    );
  }
};
