import List from "@material-ui/core/List";
import * as React from "react";

import { config } from "../../config";
import { useError, useSdk } from "../../service";
import { ContractItem, ContractItemProps } from "./ContractItem";

const defaultCodeId = config.codeId;

function ContractList(): JSX.Element {
  const { getClient } = useSdk();
  const { setError } = useError();

  const [contracts, setContracts] = React.useState<readonly ContractItemProps[]>([]);

  // get the contracts
  React.useEffect(() => {
    getClient()
      .getContracts(defaultCodeId)
      .then(contracts => setContracts(contracts))
      .catch(setError);
  }, [getClient, setError]);

  return (
    <List>
      {contracts.map(props => (
        <ContractItem {...props} key={props.address} />
      ))}
    </List>
  );
}

export default ContractList;
