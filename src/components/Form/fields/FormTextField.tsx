import { TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";
import * as React from "react";

interface TextFieldProps {
  name: string;
  type: string;
  placeholder: string;
  InputProps?: any;
}

export const FormTextField: React.FC<TextFieldProps & FieldAttributes<{}>> = ({
  type,
  placeholder,
  InputProps,
  ...props
}: TextFieldProps) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  if (type === "number") {
    return (
      <TextField
        id="outlined-number"
        variant="outlined"
        type={type}
        label={placeholder}
        InputProps={InputProps}
        {...field}
        helperText={errorText}
        error={!!errorText}
      />
    );
  }

  return (
    <TextField
      type={type}
      placeholder={placeholder}
      InputProps={InputProps}
      fullWidth
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
