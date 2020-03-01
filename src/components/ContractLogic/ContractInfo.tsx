import * as React from "react";
import { types } from "@cosmwasm/sdk";
import MuiTypography from "@material-ui/core/Typography";
import { useBaseStyles } from '../../theme'

export interface InitMsg {
    readonly name: string;
    readonly purchase_price?: types.Coin;
    readonly transfer_price?: types.Coin;
}

export interface ContractInfoProps {
    readonly address: string;
    readonly code_id: number;
    /** Bech32 account address */
    readonly creator: string;
    /** Argument passed on initialization of the contract */
    readonly init_msg: InitMsg;
}

function coin_str(coin?: types.Coin): string {
    return coin ? `${coin.amount} ${coin.denom}` : "0";
}

export function ContractInfo(props: ContractInfoProps): JSX.Element {
    const classes= useBaseStyles();

    return (
        <div className={classes.card}>
            <MuiTypography variant="h5">Details of name service "{props.init_msg.name}":</MuiTypography>
            <ul>
                <li><p>Code ID:</p> <p>{props.code_id}</p></li>
                <li><p>Address:</p> <p>{props.address}</p></li>
                <li><p>Purchase price:</p> <p>{coin_str(props.init_msg.purchase_price)}</p></li>
                <li><p>Transfer price:</p> <p>{coin_str(props.init_msg.transfer_price)}</p></li>
            </ul>
        </div>
    );
}