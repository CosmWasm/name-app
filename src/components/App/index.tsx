import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

import { useSdk } from "../../service";
import Header from "./Header";

function Loading(): JSX.Element {
    return (
        <MuiTypography variant="h2">Loading Wallet...</MuiTypography>
    )
}

function App(props: {readonly children: any}): JSX.Element {
    const { loading} = useSdk();

    if (loading) {
        return <Loading />
    }

    return (
        <Header>
            {props.children}
        </Header>
    );
}
  
export default App;
  