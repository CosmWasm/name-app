import { types } from "@cosmwasm/sdk";
import Button from "@material-ui/core/Button";
import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

import { useSdk } from "../../service";

export interface NameDetailsProps {
    readonly contractAddress: string;
    readonly name: string;
    readonly owner?: string;
    readonly contract: InitMsg;
    readonly onUpdate?: (signer: string) => void | Promise<void>;
}
  
interface InitMsg {
    readonly name: string;
    readonly purchase_price?: types.Coin;
    readonly transfer_price?: types.Coin;
}

export function NameDetails(props: NameDetailsProps): JSX.Element {
    const { address, getClient } = useSdk();

    const onClick = async () => {
        const { purchase_price } = props.contract;
        const payment = purchase_price ? [purchase_price] : undefined;
        console.log("buying")
        try {
            await getClient().execute(props.contractAddress, {register: {name: props.name}}, "Buying my name", payment);
            console.log(`Purchased`);
            if (props.onUpdate) { props.onUpdate(address); }
        } catch (err) {
            console.log(`Purchase failed: ${err}`);
        }
    }

    if (props.owner) {
        return (
            <div>
                <MuiTypography color="secondary" variant="h6">{props.name} is owned</MuiTypography>
                <span>Owned by: {props.owner}</span>
                <span>TODO: add transfer if I am owner</span>
            </div>
        )
    }

    return (
        <div>
            <MuiTypography variant="h6">{props.name} is free</MuiTypography>
            <Button type="submit" onClick={onClick}>
                Buy
              </Button>
        </div>
    );
}