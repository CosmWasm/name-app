import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

import { useSdk } from "../../service";

export interface HeaderProps {
    readonly children: any;
}

function Header(props: HeaderProps): JSX.Element {
    const { address, getClient } = useSdk();

    return (
        <div>
            <MuiTypography color="secondary" variant="h6">Address: {address}</MuiTypography>
            <span>Balance: unknown</span>

            {props.children}
        </div>
    )
}

export default Header;
