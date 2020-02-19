import { ArrowBack } from "@material-ui/icons";
import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

import { types } from "@cosmwasm/sdk";

import { useSdk } from "../../service";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";

export interface HeaderProps {
    readonly children: any;
}

interface State {
    readonly account?: types.CosmosSdkAccount;
    readonly error?: string;
}

function renderAccount({coins}: types.CosmosSdkAccount): string {
    return coins.map(({amount, denom}) => `${amount} ${denom}`).join(", ") || '(Empty Account)';
}

export function Header(props: HeaderProps): JSX.Element {
    const { address, getClient } = useSdk();

    const [value, setValue] = React.useState<State>({});

    const balance = value.account ? renderAccount(value.account) : (value.error ? value.error : "(Loading)");

    // TODO: periodic updates somehow
    React.useEffect(() => {
        // TODO: call faucet on zero balance
        getClient().getAccount()
            .then(account => setValue({account}))
            .catch(err => setValue({error: `${err}`}));
    }, [getClient])

    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Link to="/">
                        <IconButton edge="start" color="inherit">
                            <ArrowBack />
                        </IconButton>
                    </Link>
                    <MuiTypography variant="h6">{address} - {balance}</MuiTypography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            {props.children}
        </div>
    )
}
