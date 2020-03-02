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

const emptyInfo: ContractInfoProps = {
  address: "",
  codeId: 0,
  creator: "",
  label: "",
  initMsg: {}
};

function ContractLogic({ address, name }: ContractDetailsProps): JSX.Element {
    const { getClient } = useSdk();
    const { setError } = useError();
    const history = useHistory();

    const [value, setValue] = React.useState<ContractInfoProps>(emptyInfo);

    // get the contracts
    React.useEffect(() => {
        getClient().getContract(address)
            .then(info => setValue({...info, address}))
            .catch(setError);
    }, [setError, address, getClient]);

    const onSearch = (values: FormValues) => {
        const searchName = values[NAME_FIELD];
        history.push(`/contract/${address}/details/${searchName}`);
    }

    console.log(`ContractLogic with ${name}`);

    return (
        <div>
             <ContractInfo {...value} />
             <SearchForm handleSearch={onSearch}></SearchForm>
             { name ? (<NameDetails contractAddress={address} name={name} contract={value.initMsg} />) : "" }
        </div>
    );
}

export default ContractLogic;
