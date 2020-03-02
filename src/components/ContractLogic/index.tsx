import * as React from "react";
import { useHistory } from "react-router-dom";

import { ContractInfo, ContractInfoProps } from "./ContractInfo";
import { NameDetails } from "./NameDetails";
import { FormValues }  from "../Form";
import { useError, useSdk } from "../../service";
import { SearchForm, NAME_FIELD } from "./SearchForm";

export interface ContractDetailsProps {
    readonly address: string;
    readonly name?: string;
}

const emptyInfo = {address: "", code_id: 0, creator: "", init_msg: {name: ""}};

function ContractLogic(props: ContractDetailsProps): JSX.Element {
    const { address, name } = props;
    const { getRestClient } = useSdk();
    const { setError } = useError();
    const history = useHistory();

    const [value, setValue] = React.useState<ContractInfoProps>(emptyInfo);

    // get the contracts
    React.useEffect(() => {
        getRestClient().getContractInfo(address)
            .then(info => setValue({...info, address} as ContractInfoProps))
            .catch(setError);
    }, [getRestClient, setError, address])

    const onSearch = (values: FormValues) => {
        const searchName = values[NAME_FIELD];
        history.push(`/contract/${address}/details/${searchName}`);
    }

    console.log(`ContractLogic with ${name}`);

    return (
        <div>
             <ContractInfo {...value} />
             <SearchForm handleSearch={onSearch}></SearchForm>
             { name ? (<NameDetails contractAddress={address} name={name} contract={value.init_msg} />) : "" }
        </div>
    );
}

export default ContractLogic;
