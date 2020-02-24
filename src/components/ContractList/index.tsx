import { RestClient } from "@cosmwasm/sdk";
import List from "@material-ui/core/List";
import * as React from "react";

import { config } from "../../config";
import { useError, useSdk } from "../../service";
import {ContractItem, ContractItemProps} from "./ContractItem";

const defaultCodeId = config.codeId;

// TODO: we need to fix rest api, so this is one call (currently the list by code id doesn't return addresses of the contracts)
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
    const { setError } = useError();

    const [contracts, setContracts] = React.useState<readonly ContractItemProps[]>([]);

    // get the contracts
    React.useEffect(() => {
        listContractsByCodeId(getRestClient(), defaultCodeId)
            .then(contracts => setContracts(contracts))
            .catch(setError);
    }, [getRestClient, setError])

    return (
        <List>
            {contracts.map(props  =>
                <ContractItem {...props} key={props.address} />
            )}
        </List>
    );
}
  
export default ContractList;
  