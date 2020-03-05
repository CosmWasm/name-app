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

export function ContractInfo(props: ContractInfoProps): JSX.Element {
  const classes = useBaseStyles();

  return (
    <div className={classes.card}>
      <MuiTypography variant="h5">Details of name service "{props.label}":</MuiTypography>
      <MuiTypography color="textSecondary">({props.address})</MuiTypography>
    </div>
  );
}
