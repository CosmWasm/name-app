import { RestClient } from "@cosmwasm/sdk";
import List from "@material-ui/core/List";
import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

import { useSdk } from "../../service";
import {ContractItem, ContractItemProps} from "./ContractItem";

export interface State {
    readonly contracts: readonly ContractItemProps[];
    readonly error?: string;
}

// TODO: make configurable
const defaultCodeId = 1;

async function listContractsByCodeId(client: RestClient, codeId: number): Promise<readonly ContractItemProps[]> {
    let result = [];
    const addrs = await client.listContractAddresses();
    for (const address of addrs) {
        const info = await client.getContractInfo(address);
        if (info.code_id === codeId) {
            result.push({...info, address})
        }
    }
    return result;
}

function ContractList(): JSX.Element {
    const { getRestClient } = useSdk();

    const [value, setValue] = React.useState<State>({contracts: []});

    // get the contracts
    React.useEffect(() => {
        listContractsByCodeId(getRestClient(), defaultCodeId)
            .then(contracts => setValue({ contracts }))
            .catch(err => setValue({contracts: [], error: `${err}`}));
    }, [getRestClient])

    if (value.error) {
        return (
            <MuiTypography color="secondary" variant="h6">Error: {value.error}</MuiTypography>
        )
    }
    return (
        <List>
            {value.contracts.map(props  => 
                <ContractItem {...props} key={props.code_id} />
            )}
        </List>
    );
}
  
export default ContractList;
  