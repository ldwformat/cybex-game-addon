import * as React from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
  FormHelperText,
  InputLabel,
  Select,
  Button,
  withStyles
} from "@material-ui/core";
import { Colors } from "./colors";
import { ButtonProps } from "@material-ui/core/Button";
import { Form, Field } from "react-final-form";
import {
  TextFieldProps,
  StandardTextFieldProps
} from "@material-ui/core/TextField";

// export const createTextField = (validate?, asyncValidate?) => (
//   props: StandardTextFieldProps & { field }
// ) => {
//   console.debug("LoginForm: ", props.type);
//   return (
//     <Field
//       validate={validate}
//       asyncValidate={asyncValidate}
//       field={props.field}
//     >
//       {fieldApi => {
//         const {
//           helperText,
//           label,
//           onChange,
//           onBlur,
//           field,
//           onClick,
//           ...rest
//         } = props;

//         const {
//           value,
//           error,
//           touched,
//           warning,
//           success,
//           setValue,
//           setTouched
//         } = fieldApi;
//         return (
//           <TextField
//             {...rest}
//             label={label}
//             value={value || ""}
//             onClick={e => {
//               setValue(value);
//               if (onClick) {
//                 onClick(e);
//               }
//             }}
//             onChange={e => {
//               setValue(e.target.value);
//               if (onChange) {
//                 onChange(e);
//               }
//             }}
//             onBlur={e => {
//               setTouched();
//               if (onBlur) {
//                 onBlur(e);
//               }
//             }}
//             error={error}
//             helperText={(touched && error) || helperText}
//           />
//         );
//       }}
//     </Field>
//   );
// };

export const renderTextField = ({
  label,
  input,
  meta: { asyncValidating, touched, invalid, error },
  helperText,
  ...custom
}) => {
  return (
    <TextField
      label={label}
      // placeholder={label}
      error={touched && invalid}
      helperText={(touched && error) || helperText}
      {...input}
      {...custom}
    />
  );
};
export const renderPasswordField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    // placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);
export const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
);

export const radioButton = ({ input, ...rest }) => (
  <FormControl>
    <RadioGroup {...input} {...rest}>
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
    </RadioGroup>
  </FormControl>
);

export const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="age-native-simple">Age</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: "age",
        id: "age-native-simple"
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

const ButtonStyles = theme => ({
  root: {
    color: Colors.btnPrimary,
    background: Colors.btnBgPrimary,
    "&:disabled": {
      background: Colors.btnBgDisabled
    }
  }
});

export const PrimaryButton = withStyles(ButtonStyles)(
  class extends React.Component<ButtonProps> {
    render() {
      return <Button classes={this.props.classes} {...this.props} />;
    }
  }
);
