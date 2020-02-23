import { types } from "@cosmwasm/sdk";
import { Encoding } from "@iov/encoding";
import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

import { NameDetails } from "./NameDetails";
import { FormValues }  from "../Form";
import { useError, useSdk } from "../../service";
import { SearchForm, NAME_FIELD } from "./SearchForm";

export interface ContractDetailsProps {
    readonly address: string;
}

export interface ContractInfo {
    readonly code_id: number;
    /** Bech32 account address */
    readonly creator: string;
    /** Argument passed on initialization of the contract */
    readonly init_msg: InitMsg;
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

function parseQueryJson<T>(raw: Uint8Array): T {
    return JSON.parse(Encoding.fromUtf8(raw));
}

interface QueryResponse {
    readonly address: string;
}

function ContractLogic(props: ContractDetailsProps): JSX.Element {
    const { address } = props;
    const { getClient, getRestClient } = useSdk();
    const { setError } = useError();

    const [value, setValue] = React.useState<ContractInfo>(emptyInfo);
    const [state, setState] = React.useState<State>({loading: false});

    // get the contracts
    React.useEffect(() => {
        getRestClient().getContractInfo(address)
            .then(info => setValue(info as ContractInfo))
            .catch(setError);
    }, [getRestClient, setError, address])

    React.useEffect(() => {
        if (state.name) {
            getClient()
                .queryContractSmart(address, {resolverecord: {name: state.name}})
                .then(res => { const o = parseQueryJson<QueryResponse>(res); setState({name: state.name, owner: o.address, loading: false})})
                .catch(err => {
                    // a not found error means it is free, other errors need to be repeated
                    if (err.toString().includes("NameRecord not found")) {
                        setState({name: state.name, loading: false});
                    } else {
                        setState({loading: false});
                        setError(err); 
                    }
                });
        }
    }, [getClient, setError, address, state.name])

    const onSearch = (values: FormValues) => {
        setState({name: values[NAME_FIELD], loading: true});
    }

    const onPurchase = (owner: string) => {
        setState({...state, owner});
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
             <SearchForm onSubmit={onSearch}></SearchForm>
             <hr />
             { state.name ? state.loading ? (<div>Loading...</div>) : (<NameDetails contractAddress={address} name={state.name} owner={state.owner} contract={value.init_msg} onUpdate={onPurchase}/>) : "" }
        </div>
    );
}
  
export default ContractLogic;
  