import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import MuiTypography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import { Form, Formik } from "formik";
import * as React from "react";
import { useHistory } from "react-router-dom";

import { useBaseStyles } from "../../theme";
import { FormValues } from "../Form";
import { FormTextField } from "../Form/fields/FormTextField";
import { SearchValidationSchema } from "../Form/validationSchema";

export const NAME_FIELD = "name";

export interface SearchFormProps {
  readonly address: string;
  readonly label: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({ address, label }: SearchFormProps) => {
  const classes = useBaseStyles();
  const history = useHistory();

  const onSearch = (values: FormValues): void => {
    const searchName = values[NAME_FIELD];
    history.push(`/contract/${address}/details/${searchName}`);
  };

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={SearchValidationSchema}
      onSubmit={async ({ name }, { setSubmitting }) => {
        setSubmitting(true);
        onSearch({ name });
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className={`${classes.card} ${classes.form}`}>
          <MuiTypography variant="h5">Details of name service "{label}":</MuiTypography>
          <MuiTypography color="textSecondary">({address})</MuiTypography>
          <div className={classes.input}>
            <FormTextField
              placeholder="Name"
              name="name"
              type="text"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon>
                      <SearchIcon />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
