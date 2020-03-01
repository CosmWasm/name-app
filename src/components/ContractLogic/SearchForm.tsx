import * as React from "react";
import { Formik, Form } from 'formik';

import { Button } from "../../theme";
import { FormValues }  from "../Form";
import { FormTextField } from "../Form/fields/FormTextField";
import { SearchValidationSchema } from "../Form/validationSchema";
import { useBaseStyles } from "../../theme";

export const NAME_FIELD = "name";

interface SearchFormProps {
    readonly handleSearch: (values: FormValues) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ handleSearch }: SearchFormProps) => {
  const classes = useBaseStyles();

    return (
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={SearchValidationSchema}
        onSubmit={async ({ name }, { setSubmitting }) => {
          setSubmitting(true);
          handleSearch({ name });
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className={`${classes.card} ${classes.form}`}>
            <div className={classes.input}>
              <FormTextField
                placeholder="Name"
                name="name"
                type="text"
                />
            </div>
            <div>
              <Button type="submit" disabled={isSubmitting}>
                Search
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };
