import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

export interface ErrorMessageProps {
    readonly error: string;
}

// This is a page body to display when there is an error
export function ErrorMessage({error}: ErrorMessageProps): JSX.Element {
    return (
        <MuiTypography color="secondary" variant="h6">Error: {error}</MuiTypography>
    );
}


