import * as React from "react";
import { Form, Field } from "react-final-form";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/styles";
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

export const LoginForm = ({
  onSubmit,
  children
}: {
  onSubmit: any;
  children?: any;
}) => {
  const [showPassword, switchPassword] = React.useState(false);
  const { t, i18n } = useTranslation();
  const matches = useMediaQuery("(min-width:600px)");
  const styleOfContent = {
    padding: 0,
    margin: `10px ${matches ? 48 : 16}px`
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
                type={showPassword ? "text" : "password"}
                label={t(Dict.AuthPassword)}
                helperText={t(Dict.AuthLoginPasswordHelper)}
                component={renderTextField as any}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => switchPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </DialogContent>
          <DialogContent style={styleOfContent}>{children}</DialogContent>
          <DialogActions style={{ margin: `8px ${matches ? 42 : 12}px` }}>
            <PrimaryButton
              color="primary"
              style={{ height: "48px", fontSize: "16px" }}
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
};
