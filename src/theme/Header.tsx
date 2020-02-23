import { types } from "@cosmwasm/sdk";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import MuiTypography from "@material-ui/core/Typography";
import { ArrowBack } from "@material-ui/icons";
import * as React from "react";
import { Link } from "react-router-dom";


export interface HeaderProps {
    readonly account?: types.CosmosSdkAccount;
}

function renderBalance({coins}: types.CosmosSdkAccount): string {
    return coins.map(({amount, denom}) => `${amount} ${denom}`).join(", ") || '(Empty Account)';
}

// Show the current account or any error message in the header
export function Header({account}: HeaderProps): JSX.Element {
    const balance = account ? renderBalance(account) : "(Loading Balance)";
    const address = account ? account.address : "(No Address)";

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

