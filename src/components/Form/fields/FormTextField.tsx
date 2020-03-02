import * as React from 'react';
import { FieldAttributes, useField } from 'formik';
import { TextField } from '@material-ui/core';

interface TextFieldProps {
  name: string;
  type: string;
  placeholder: string;
}

export const FormTextField: React.FC<TextFieldProps & FieldAttributes<{}>> = ({
  type,
  placeholder,
  ...props
}: TextFieldProps) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  if (type === 'number') {
    return (
      <TextField
        id="outlined-number"
        variant="outlined"
        type={type}
        label={placeholder}
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
      fullWidth
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
