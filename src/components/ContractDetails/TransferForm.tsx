import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import * as React from "react";
import { useMemo } from "react";
import { useForm } from "react-final-form-hooks";

import { composeValidators, longerThan, required, FormValues, TextField }  from "../Form";

export const ADDRESS_FIELD = "addressField";
const ADDRESS_MIN_LENGTH = 45;

interface Props {
    readonly onSubmit: (values: FormValues) => void;
}
  
export const TransferForm = (props: Props): JSX.Element => {
    const onSubmit = (values: object) => props.onSubmit(values as FormValues);
  
    const { form, handleSubmit, submitting, invalid } = useForm({
      onSubmit,
    });
  
    // TODO optimize update of validators with array of dependencies
    const validatorName = useMemo(() => {
      // TODO: better check for valid cosmos address
      return composeValidators(required, longerThan(ADDRESS_MIN_LENGTH));
    }, []);
  
    return (
        <form onSubmit={handleSubmit}>
          <Box display="block" marginTop={2} marginBottom={1}>
            <TextField
              label="New Owner"
              placeholder="cosmos1234567..."
              type="text"
              form={form}
              required
              fullWidth
              name={ADDRESS_FIELD}
              validate={validatorName}
            />
          </Box>
          <Box width={120} display="flex" justifyContent="space-between">
              <Button fullWidth color="primary" type="submit" disabled={invalid || submitting}>Transfer</Button>
          </Box>
        </form>
    );
  };
  