import * as React from "react";

import { useError, useSdk } from "../../service";
import { useBaseStyles } from "../../theme";
import { NameDetails, Prices } from "./NameDetails";
import { SearchForm } from "./SearchForm";

export interface ContractDetailsProps {
  readonly address: string;
  readonly name?: string;
}

function ContractLogic({ address, name }: ContractDetailsProps): JSX.Element {
  const classes = useBaseStyles();
  const { getClient } = useSdk();
  const { setError } = useError();

  const [label, setLabel] = React.useState<string>("");
  const [prices, setPrices] = React.useState<Prices>({});

  // get the contracts
  React.useEffect(() => {
    getClient()
      .getContract(address)
      .then((info) => setLabel(info.label))
      .catch(setError);

    getClient()
      .queryContractSmart(address, { config: {} })
      .then((response) => {
        setPrices({
          purchase: response.purchase_price,
          transfer: response.transfer_price,
        });
      })
      .catch(setError);
  }, [setError, address, getClient]);

  return (
    <div className={classes.contractLogicContainer}>
      <SearchForm label={label} address={address} />
      {name ? <NameDetails contractAddress={address} name={name} prices={prices} /> : ""}
    </div>
  );
}

export default ContractLogic;
