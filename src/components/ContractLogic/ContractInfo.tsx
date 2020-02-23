import { types } from "@cosmwasm/sdk";
import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

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
    return (
        <React.Fragment>
            <MuiTypography variant="h5">Details of name service "{props.init_msg.name}":</MuiTypography>
            <ul>
                <li>Code ID: {props.code_id}</li>
                <li>Address: {props.address}</li>
                <li>Purchase price: {coin_str(props.init_msg.purchase_price)}</li>
                <li>Transfer price: {coin_str(props.init_msg.transfer_price)}</li>
            </ul>    
        </React.Fragment>
    );
}