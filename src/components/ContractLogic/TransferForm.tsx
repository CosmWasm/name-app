import * as React from "react";
import { Formik, Form } from 'formik';

import { Button } from "../../theme";
import { FormValues }  from "../Form";
import { FormTextField } from "../Form/fields/FormTextField";
import { TransferValidationSchema } from "../Form/validationSchema";
import { useBaseStyles } from "../../theme";

export const ADDRESS_FIELD = "addressField";

interface TransferFormProps {
    readonly handleTransfer: (values: FormValues) => void;
}

export const TransferForm: React.FC<TransferFormProps> = ({ handleTransfer }: TransferFormProps) => {
  const classes = useBaseStyles();

    return (
      <Formik
        initialValues={{
          addressField: '',
        }}
        validationSchema={TransferValidationSchema}
        onSubmit={async ({ addressField }, { setSubmitting }) => {
          setSubmitting(true);
          handleTransfer({ addressField });

        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.input}>
              <FormTextField
                placeholder="cosmos1234567..."
                name={ADDRESS_FIELD}
                type="text"
                />
            </div>
            <div>
              <Button type="submit" disabled={isSubmitting}>
                Transfer
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };
