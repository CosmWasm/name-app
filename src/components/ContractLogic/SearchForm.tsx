import Box from "@material-ui/core/Box";
import * as React from "react";
import { useMemo } from "react";
import { useForm } from "react-final-form-hooks";

import { Button } from "../../theme";
import { composeValidators, longerThan, required, FormValues, TextField }  from "../Form";

export const NAME_FIELD = "nameField";
const NAME_MIN_LENGTH = 4;

interface Props {
    readonly onSubmit: (values: FormValues) => void;
}
  
export const SearchForm = (props: Props): JSX.Element => {
    const onSubmit = (values: object) => props.onSubmit(values as FormValues);
  
    const { form, handleSubmit, submitting, invalid } = useForm({
      onSubmit,
    });
  
    // TODO optimize update of validators with array of dependencies
    const validatorName = useMemo(() => {
      return composeValidators(required, longerThan(NAME_MIN_LENGTH));
    }, []);
  
    return (
        <form onSubmit={handleSubmit}>
          <Box display="block" marginTop={2} marginBottom={1}>
            <TextField
              label="Name"
              placeholder="Name"
              type="text"
              form={form}
              required
              fullWidth
              name={NAME_FIELD}
              validate={validatorName}
            />
          </Box>
          <Box width={120} display="flex" justifyContent="space-between">
              <Button color="primary" fullWidth type="submit" disabled={invalid || submitting}>
                Search
              </Button>
          </Box>
        </form>
    );
  };
  