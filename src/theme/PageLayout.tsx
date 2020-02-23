import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import * as React from "react";

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
});

interface Props {
    readonly children: any;
};

// TODO: figure out a better grid system
export function PageLayout({children}: Props): JSX.Element {
    const classes = useStyles();

    return (
        <Grid className={classes.root} container spacing={3}>
            <Grid item xs={2} />
            <Grid item xs>
                {children}
            </Grid>
            <Grid item xs={2} />
        </Grid>
    );
}