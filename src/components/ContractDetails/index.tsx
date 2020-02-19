import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

import { useSdk } from "../../service";

export interface ContractDetailsProps {
    readonly address: string;
}

export interface ContractInfo {
    readonly code_id: number;
    /** Bech32 account address */
    readonly creator: string;
    /** Argument passed on initialization of the contract */
    readonly init_msg: object;
    readonly error?: string;
  }
  

const emptyInfo = {code_id: 0, creator: "", init_msg: {}};

function ContractDetails(props: ContractDetailsProps): JSX.Element {
    const { address } = props;
    const { getRestClient } = useSdk();

    const [value, setValue] = React.useState<ContractInfo>(emptyInfo);

    // get the contracts
    React.useEffect(() => {
        getRestClient().getContractInfo(address)
            .then(info => setValue(info))
            .catch(err => setValue({...emptyInfo, error: `${err}`}));
    }, [getRestClient, address])

    if (value.error) {
        return (
            <MuiTypography color="secondary" variant="h6">Error: {value.error}</MuiTypography>
        )
    }

    return (
        <div>
             <MuiTypography variant="h5">Details of contract {address}:</MuiTypography>
             <ul>
                 <li>Code ID: {value.code_id}</li>
                 <li>Creator: {value.creator}</li>
                 <li>Init Msg: {JSON.stringify(value.init_msg)}</li>
             </ul>
        </div>
    );
}
  
export default ContractDetails;
  