import { types } from "@cosmwasm/sdk";
import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

import { useBaseStyles } from "../../theme";

export interface InitMsg {
  readonly purchase_price?: types.Coin;
  readonly transfer_price?: types.Coin;
}

export interface ContractInfoProps {
  readonly address: string;
  readonly codeId: number;
  /** Bech32 account address */
  readonly creator: string;
  readonly label: string;
  /** Argument passed on initialization of the contract */
  readonly initMsg: InitMsg;
}

function coin_str(coin?: types.Coin): string {
  return coin ? `${coin.amount} ${coin.denom}` : "0";
}

export function ContractInfo(props: ContractInfoProps): JSX.Element {
  const classes = useBaseStyles();

  return (
    <div className={classes.card}>
      <MuiTypography variant="h5">Details of name service "{props.label}":</MuiTypography>
      <ul>
        <li>
          <p>Code ID:</p> <p>{props.codeId}</p>
        </li>
        <li>
          <p>Address:</p> <p>{props.address}</p>
        </li>
        <li>
          <p>Purchase price:</p> <p>{coin_str(props.initMsg.purchase_price)}</p>
        </li>
        <li>
          <p>Transfer price:</p> <p>{coin_str(props.initMsg.transfer_price)}</p>
        </li>
      </ul>
    </div>
  );
}
