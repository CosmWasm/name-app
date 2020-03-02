import * as React from "react";
import { Encoding } from "@iov/encoding";
import MuiTypography from "@material-ui/core/Typography";

import { useError, useSdk } from "../../service";
import { Button, useBaseStyles } from "../../theme";
import { FormValues }  from "../Form";
import { InitMsg } from "./ContractInfo";
import { TransferForm, ADDRESS_FIELD } from "./TransferForm";

export interface NameDetailsProps {
    readonly contractAddress: string;
    readonly name: string;
    readonly contract: InitMsg;
}

export interface State{
    readonly owner?: string;
    readonly loading: boolean;
}

function parseQueryJson<T>(raw: Uint8Array): T {
    return JSON.parse(Encoding.fromUtf8(raw));
}

interface QueryResponse {
    readonly address: string;
}

export function NameDetails(props: NameDetailsProps): JSX.Element {
    const classes = useBaseStyles()
    const { name, contractAddress } = props;
    const { address, getClient } = useSdk();
    const { setError } = useError();

    const [state, setState] = React.useState<State>({loading: false});

    React.useEffect(() => {
            setState({loading: true});
            getClient()
                .queryContractSmart(contractAddress, {resolverecord: {name}})
                .then(res => { const o = parseQueryJson<QueryResponse>(res); setState({owner: o.address, loading: false})})
                .catch(err => {
                    setState({loading: false});
                    // a not found error means it is free, other errors need to be reported
                    if (!err.toString().includes("NameRecord not found")) {
                        setError(err);
                    }
                });
    }, [getClient, setError, contractAddress, name])

    // TODO: add visual feedback for "in process state"
    const doPurchase = async () => {
        const { purchase_price } = props.contract;
        const payment = purchase_price ? [purchase_price] : undefined;
        console.log("buying")
        try {
            await getClient().execute(contractAddress, {register: {name: props.name}}, "Buying my name", payment);
            console.log(`Purchased`);
            setState({owner: address, loading: false});
        } catch (err) {
            setError(err);
        }
    }

    const doTransfer = async (values: FormValues) => {
        const { transfer_price } = props.contract;
        const payment = transfer_price ? [transfer_price] : undefined;
        const newOwner = values[ADDRESS_FIELD];
        setState({loading: true});
        console.log("transferring")
        try {
            await getClient().execute(props.contractAddress, {transfer: {name: props.name, to: newOwner}}, "Transferring my name", payment);
            console.log(`Transferred`);
            setState({owner: newOwner, loading: false});
        } catch (err) {
            setState({loading: false});
            setError(err);
        }
    }

    // TODO: clean up all this logic.
    // Use separate route for the transfer form (just inline the button, then new page for form)
    // TODO: better loading state feedback

    if (state.owner) {
        const selfOwned = state.owner === address;
        if (selfOwned) {
            return (<div className={classes.card}>
                <MuiTypography color="secondary" variant="h6">You own {props.name}</MuiTypography>
                <MuiTypography className={classes.bottomSpacer} variant="body2">Do you want to transfer it?</MuiTypography>
                <TransferForm handleTransfer={doTransfer} />
            </div>);
        }
        return (
            <div className={classes.card}>
                <MuiTypography color="secondary" variant="h6">{props.name} is owned</MuiTypography>
                <span>Owned by: {state.owner}</span>
            </div>
        )
    }

    return (
        <div className={classes.card}>
            <MuiTypography className={classes.isFree} variant="h6">{props.name} is free</MuiTypography>
            <Button color="primary" type="submit" onClick={doPurchase}>Buy</Button>
        </div>
    );
}