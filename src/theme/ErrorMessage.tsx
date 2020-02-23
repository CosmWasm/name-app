import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

export interface ErrorMessageProps {
    readonly error: string;
    readonly clearError: () => void;
}

// This is a page body to display when there is an error
export function ErrorMessage({error, clearError}: ErrorMessageProps): JSX.Element {
    console.log("Render ErrorMessage");
    return (
        <MuiTypography color="secondary" variant="h6" onClick={clearError}>Error: {error}</MuiTypography>
    );
}


