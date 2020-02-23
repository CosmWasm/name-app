import { types } from "@cosmwasm/sdk";
import * as React from "react";

import { useSdk } from "../service";
import { Header } from "../theme";

interface State {
    readonly account?: types.CosmosSdkAccount;
    readonly error?: string;
}

// HeaderLogic calculates the values to render the header component (which can be theme'd)
function HeaderLogic(): JSX.Element {
    const { getClient } = useSdk();

    const [value, setValue] = React.useState<State>({});

    // TODO: periodic updates somehow
    React.useEffect(() => {
        // TODO: call faucet on zero balance
        getClient().getAccount()
            .then(account => setValue({account}))
            .catch(err => setValue({error: `${err}`}));
    }, [getClient])

    return (<Header {...value}/>);    
}
  
export default HeaderLogic;
