import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
      background: "#ebf5fc",
      [theme.breakpoints.up("sm")]: {
        height: "105vh",
      },
    },
  }),
);

interface Props {
  readonly children: any;
}

// TODO: figure out a better grid system
export function PageLayout({ children }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={3} justify="center">
      <Grid item xs={12} sm={10} md={8}>
        {children}
      </Grid>
    </Grid>
  );
}
