import { types } from "@cosmwasm/sdk";
import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

import { NameDetails } from "./NameDetails";
import { FormValues }  from "../Form";
import { useSdk } from "../../service";
import { Form, NAME_FIELD } from "./Form";

export interface ContractDetailsProps {
    readonly address: string;
}

export interface ContractInfo {
    readonly code_id: number;
    /** Bech32 account address */
    readonly creator: string;
    /** Argument passed on initialization of the contract */
    readonly init_msg: InitMsg;
    readonly error?: string;
}

export interface State{
    readonly name?: string;
    readonly owner?: string;
    readonly loading: boolean;
}
  
interface InitMsg {
    readonly name: string;
    readonly purchase_price?: types.Coin;
    readonly transfer_price?: types.Coin;
}
  
const emptyInfo = {code_id: 0, creator: "", init_msg: {name: ""}};

function coin_str(coin?: types.Coin): string {
    return coin ? `${coin.amount} ${coin.denom}` : "0";
}

function ContractDetails(props: ContractDetailsProps): JSX.Element {
    const { address } = props;
    const { getClient, getRestClient } = useSdk();

    const [value, setValue] = React.useState<ContractInfo>(emptyInfo);
    const [state, setState] = React.useState<State>({loading: false});

    // get the contracts
    React.useEffect(() => {
        getRestClient().getContractInfo(address)
            .then(info => setValue(info as ContractInfo))
            .catch(err => setValue({...emptyInfo, error: `${err}`}));
    }, [getRestClient, address])

    React.useEffect(() => {
        if (state.name) {
            getClient().queryContractSmart(address, {resolverecord: {name: state.name}})
                .then(res => console.log(res)) // TODO
                .catch(err => { console.log(err); setState({name: state.name, loading: false});});
        }
    }, [getClient, address, state.name])

    const onSearch = (values: FormValues) => {
        setState({name: values[NAME_FIELD], loading: true});
    }

    const onPurchase = (owner: string) => {
        setState({...state, owner});
    }

    if (value.error) {
        return (
            <MuiTypography color="secondary" variant="h6">Error: {value.error}</MuiTypography>
        )
    }

    return (
        <div>
             <MuiTypography variant="h5">Details of name service "{value.init_msg.name}":</MuiTypography>
             <ul>
                 <li>Code ID: {value.code_id}</li>
                 <li>Address: {address}</li>
                 <li>Purchase price: {coin_str(value.init_msg.purchase_price)}</li>
                 <li>Transfer price: {coin_str(value.init_msg.transfer_price)}</li>
             </ul>
             <Form onSubmit={onSearch}></Form>
             <hr />
             { state.name ? state.loading ? (<div>Loading...</div>) : (<NameDetails contractAddress={address} name={state.name} contract={value.init_msg} onUpdate={onPurchase}/>) : "" }
        </div>
    );
}
  
export default ContractDetails;
  