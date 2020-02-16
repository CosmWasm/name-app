import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

import { types } from "@cosmwasm/sdk";

import { useSdk } from "../../service";

export interface HeaderProps {
    readonly children: any;
}

interface State {
    readonly account?: types.CosmosSdkAccount;
    readonly error?: string;
}

function renderAccount({coins}: types.CosmosSdkAccount): string {
    return coins.map(({amount, denom}) => `${amount} ${denom}`).join(", ");
}

function Header(props: HeaderProps): JSX.Element {
    const { address, getAccount } = useSdk();

    const [value, setValue] = React.useState<State>({});

    const balance = value.account ? renderAccount(value.account) : (value.error ? value.error : "(Loading)");

    // TODO: periodic updates somehow
    React.useEffect(() => {
        getAccount()
            .then(account => setValue({account}))
            .catch(err => setValue({error: `${err}`}));
    }, [])

    return (
        <div>
            <MuiTypography color="secondary" variant="h6">Address: {address}</MuiTypography>
            <span>Balance: {balance}</span>
            {props.children}
        </div>
    )
}

export default Header;
