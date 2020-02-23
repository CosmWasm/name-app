import { types } from "@cosmwasm/sdk";
import Button from "@material-ui/core/Button";
import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

import { useError, useSdk } from "../../service";
import { FormValues }  from "../Form";
import { TransferForm, ADDRESS_FIELD } from "./TransferForm";

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
    const { setError } = useError();

    // TODO: add visual feedback for "in process state"
    const doPurchase = async () => {
        const { purchase_price } = props.contract;
        const payment = purchase_price ? [purchase_price] : undefined;
        console.log("buying")
        try {
            await getClient().execute(props.contractAddress, {register: {name: props.name}}, "Buying my name", payment);
            console.log(`Purchased`);
            if (props.onUpdate) { props.onUpdate(address); }
        } catch (err) {
            setError(err);
        }
    }

    const doTransfer = async (values: FormValues) => {
        const { transfer_price } = props.contract;
        const payment = transfer_price ? [transfer_price] : undefined;
        const newOwner = values[ADDRESS_FIELD];
        console.log("transfering")
        try {
            await getClient().execute(props.contractAddress, {transfer: {name: props.name, to: newOwner}}, "Transferring my name", payment);
            console.log(`Transferred`);
            if (props.onUpdate) { props.onUpdate(newOwner); }
        } catch (err) {
            setError(err);
        }
    }

    if (props.owner) {
        const selfOwned = props.owner === address;
        if (selfOwned) {
            return (<div>
                <MuiTypography color="secondary" variant="h6">You own {props.name}</MuiTypography>
                <span>Do you want to transfer it?</span>
                <TransferForm onSubmit={doTransfer} />
            </div>);
        }
        return (
            <div>
                <MuiTypography color="secondary" variant="h6">{props.name} is owned</MuiTypography>
                <span>Owned by: {props.owner}</span>
            </div>
        )
    }

    return (
        <div>
            <MuiTypography variant="h6">{props.name} is free</MuiTypography>
            <Button color="primary" type="button" onClick={doPurchase}>Buy</Button>
        </div>
    );
}