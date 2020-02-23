import { types } from "@cosmwasm/sdk";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import MuiTypography from "@material-ui/core/Typography";
import { ArrowBack } from "@material-ui/icons";
import * as React from "react";
import { Link } from "react-router-dom";


export interface HeaderProps {
    readonly account?: types.CosmosSdkAccount;
    readonly error?: string;
}

function renderBalance({coins}: types.CosmosSdkAccount): string {
    return coins.map(({amount, denom}) => `${amount} ${denom}`).join(", ") || '(Empty Account)';
}

// Show the current account or any error message in the header
export function Header({account, error}: HeaderProps): JSX.Element {
    const renderAccount = () => {
        const balance = account ? renderBalance(account) : "(Loading Balance)";
        const address = account ? account.address : "(No Address)";
        return (
            <Toolbar>
                <Link to="/">
                    <IconButton edge="start" color="inherit">
                        <ArrowBack />
                    </IconButton>
                </Link>
                <MuiTypography variant="h6">{address} - {balance}</MuiTypography>
            </Toolbar>
        );
    }

    const renderError = () => {
        return (
            <Toolbar>
                <MuiTypography color="secondary" variant="h6">{error}</MuiTypography>
            </Toolbar>
        );
    }

    const toolbar = error ? renderError() : renderAccount();

    return (
        <React.Fragment>
        <AppBar>
            {toolbar}
        </AppBar>
        <Toolbar />
        </React.Fragment>
    );
}

