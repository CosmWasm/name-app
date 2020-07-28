import * as React from "react";

import { useError, useSdk } from "../../service";
import { useBaseStyles } from "../../theme";
import { InitMsg, NameDetails } from "./NameDetails";
import { SearchForm, SearchFormProps } from "./SearchForm";

export interface ContractDetailsProps {
  readonly address: string;
  readonly name?: string;
}

type State = SearchFormProps & { readonly initMsg: InitMsg };

const emptyInfo: State = {
  address: "",
  label: "",
  initMsg: {},
};

function ContractLogic({ address, name }: ContractDetailsProps): JSX.Element {
  const classes = useBaseStyles();
  const { getClient } = useSdk();
  const { setError } = useError();

  const [value, setValue] = React.useState<State>(emptyInfo);

  // get the contracts
  React.useEffect(() => {
    getClient()
      .getContract(address)
      .then((info) =>
        setValue({
          ...info,
          address,
          initMsg: {}, // TODO: get from somewhere
        }),
      )
      .catch(setError);
  }, [setError, address, getClient]);

  return (
    <div className={classes.contractLogicContainer}>
      <SearchForm label={value.label} address={address} />
      {name ? <NameDetails contractAddress={address} name={name} contract={value.initMsg} /> : ""}
    </div>
  );
}

export default ContractLogic;
