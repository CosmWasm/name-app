import { Coin } from "@cosmjs/sdk38";
import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

import { useAccount, useError, useSdk } from "../../service";
import { printableCoin } from "../../service/helpers";
import { Button, useBaseStyles } from "../../theme";
import { FormValues } from "../Form";
import { ADDRESS_FIELD, TransferForm } from "./TransferForm";

export interface InitMsg {
  readonly purchase_price?: Coin;
  readonly transfer_price?: Coin;
}

export interface NameDetailsProps {
  readonly contractAddress: string;
  readonly name: string;
  readonly contract: InitMsg;
}

export interface State {
  readonly owner?: string;
  readonly loading: boolean;
}

interface QueryResponse {
  readonly address: string;
}

export function NameDetails(props: NameDetailsProps): JSX.Element {
  const classes = useBaseStyles();
  const { name, contractAddress } = props;
  const { address, getClient } = useSdk();
  const { setError } = useError();
  const { refreshAccount } = useAccount();

  const [state, setState] = React.useState<State>({ loading: false });

  React.useEffect(() => {
    setState({ loading: true });
    getClient()
      /* eslint-disable-next-line @typescript-eslint/camelcase */
      .queryContractSmart(contractAddress, { resolve_record: { name } })
      .then(res => {
        setState({ owner: res.address, loading: false });
      })
      .catch(err => {
        setState({ loading: false });
        // a not found error means it is free, other errors need to be reported
        if (!err.toString().includes("NameRecord not found")) {
          setError(err);
        }
      });
  }, [getClient, setError, contractAddress, name]);

  // TODO: add visual feedback for "in process state"
  const doPurchase = async (): Promise<boolean> => {
    /* eslint-disable-next-line @typescript-eslint/camelcase */
    const { purchase_price: purchasePrice } = props.contract;
    const payment = purchasePrice ? [purchasePrice] : undefined;
    setState({ loading: true });
    try {
      await getClient().execute(
        contractAddress,
        { register: { name: props.name } },
        "Buying my name",
        payment,
      );
      setState({ owner: address, loading: false });
      refreshAccount();
    } catch (err) {
      setState({ loading: false });
      setError(err);
    }
    return true;
  };

  const doTransfer = async (values: FormValues): Promise<void> => {
    const { transfer_price: transferPrice } = props.contract;
    const payment = transferPrice ? [transferPrice] : undefined;
    const newOwner = values[ADDRESS_FIELD];
    setState({ owner: address, loading: true });
    try {
      await getClient().execute(
        props.contractAddress,
        { transfer: { name: props.name, to: newOwner } },
        "Transferring my name",
        payment,
      );
      setState({ owner: newOwner, loading: false });
      refreshAccount();
    } catch (err) {
      setState({ owner: address, loading: false });
      setError(err);
    }
  };

  // TODO: clean up all this logic.
  // Use separate route for the transfer form (just inline the button, then new page for form)
  // TODO: better loading state feedback

  if (state.owner) {
    const selfOwned = state.owner === address;
    if (selfOwned) {
      return (
        <div className={classes.card}>
          <MuiTypography color="secondary" variant="h6">
            You own {props.name}
          </MuiTypography>
          <MuiTypography variant="body2">Do you want to transfer it?</MuiTypography>
          <MuiTypography className={classes.bottomSpacer} variant="body2">
            Price: {printableCoin(props.contract.transfer_price)}
          </MuiTypography>
          <TransferForm handleTransfer={doTransfer} loading={state.loading} />
        </div>
      );
    }
    return (
      <div className={classes.card}>
        <MuiTypography color="secondary" variant="h6">
          {props.name} is owned
        </MuiTypography>
        <span>Owned by: {state.owner}</span>
      </div>
    );
  }

  return (
    <div className={classes.card}>
      <MuiTypography className={classes.isFree} variant="h6">
        {props.name} is available.
        <br />
        Price: {printableCoin(props.contract.purchase_price)}
      </MuiTypography>
      <Button color="primary" type="submit" onClick={doPurchase} disabled={state.loading}>
        Register
      </Button>
    </div>
  );
}
