import MuiButton, {ButtonProps} from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import * as React from "react";

// TODO: pick some better styles
const useStyles = makeStyles({
    root: {
        background: "#2196f3",
        color: "white",
    },
});

// This is a page body to display when there is an error
export function Button(props: ButtonProps): JSX.Element {
    const classes = useStyles();
    return (
        <MuiButton className={classes.root} {...props} />
    );
}


