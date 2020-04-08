import { Form, Formik } from "formik";
import * as React from "react";

import { Button } from "../../theme";
import { useBaseStyles } from "../../theme";
import { FormValues } from "../Form";
import { FormTextField } from "../Form/fields/FormTextField";
import { TransferValidationSchema } from "../Form/validationSchema";

export const ADDRESS_FIELD = "addressField";

interface TransferFormProps {
  readonly loading: boolean;
  readonly handleTransfer: (values: FormValues) => void;
}

export const TransferForm: React.FC<TransferFormProps> = ({ handleTransfer, loading }: TransferFormProps) => {
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
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.input}>
            <FormTextField placeholder="enigma1234567..." name={ADDRESS_FIELD} type="text" />
          </div>
          <div>
            <Button type="submit" disabled={loading}>
              Transfer
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
