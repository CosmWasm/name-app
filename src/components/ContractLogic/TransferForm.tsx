import { Form, Formik } from "formik";
import * as React from "react";

import { Button } from "../../theme";
import { useBaseStyles } from "../../theme";
import { FormValues } from "../Form";
import { FormTextField } from "../Form/fields/FormTextField";
import { TransferValidationSchema } from "../Form/validationSchema";

export const ADDRESS_FIELD = "addressField";

interface TransferFormProps {
  readonly handleTransfer: (values: FormValues) => void;
}

export const TransferForm: React.FC<TransferFormProps> = ({ handleTransfer }: TransferFormProps) => {
  const classes = useBaseStyles();

  return (
    <Formik
      initialValues={{
        addressField: "",
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
            <FormTextField placeholder="cosmos1234567..." name={ADDRESS_FIELD} type="text" />
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
