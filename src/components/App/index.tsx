import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

import { useSdk } from "../../service";

function Loading(): JSX.Element {
    return (
        <MuiTypography variant="h2">Connection to blockchain...</MuiTypography>
    )
}

export interface HeaderProps {
    readonly address: string;
    readonly children: any;
}

function Header(props: HeaderProps): JSX.Element {
    return (
        <div>
            <MuiTypography color="secondary" variant="h6">Address: {props.address}</MuiTypography>
            {props.children}
        </div>
    )
}

function App(props: {readonly children: any}): JSX.Element {
    const {address, loading} = useSdk();

    if (loading) {
        return <Loading />
    }

    return (
        <Header address={address}>
            {props.children}
        </Header>
    );
}
  
export default App;
  