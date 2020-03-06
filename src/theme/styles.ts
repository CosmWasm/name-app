import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useBaseStyles = makeStyles((theme: Theme) =>
  createStyles({
    contractLogicContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    card: {
      width: "80vw",
      margin: "10px",
      padding: "20px",
      background: "#ebf5fc",
      boxShadow: "-5px -5px 15px rgba(255, 255, 255, 0.8), 5px 5px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "25px",
      maxWidth: "600px",
      "& ul": {
        listStyleType: "none",
        padding: "0",
        margin: "0",
        [theme.breakpoints.up("sm")]: {
          marginBlockStart: "1em",
          marginBlockEnd: "1em",
        },
      },
      "& li": {
        display: "grid",
        gridTemplateColumns: "1fr",
        fontSize: ".75em",
        "& p:first-child": {
          marginBottom: ".2em",
        },
        "& p:last-child": {
          marginTop: ".2em",
        },
        [theme.breakpoints.up("sm")]: {
          gridTemplateColumns: "25% 75%",
          fontSize: ".9em",
          "& p:first-child": {
            margin: ".5em 0.05em",
          },
          "& p:last-child": {
            margin: ".5em 0.05em",
          },
        },
        [theme.breakpoints.up("md")]: {
          gridTemplateColumns: "20% 80%",
          fontSize: "1em",
          "& p:first-child": {
            margin: ".5em 0.1",
          },
          "& p:last-child": {
            margin: ".5em .1em",
          },
        },
      },
      "& li p:first-child": {
        color: "#3d5af1",
      },
      [theme.breakpoints.up("sm")]: {
        width: "75vw",
        margin: "20px",
        padding: "30px 20px",
      },
      [theme.breakpoints.up("md")]: {
        width: "60vw",
        padding: "30px 40px",
      },
    },
    listCardContainer: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    listCard: {
      flexDirection: "column-reverse",
      textAlign: "center",
      width: "95vw",
      margin: "5px",
      padding: "10px 5px",
      borderRadius: "116px",
      background: "#ebf5fc",
      boxShadow: "-5px -5px 15px rgba(255, 255, 255, 0.8), 5px 5px 10px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        boxShadow: "inset -5px -5px 10px rgba(255,255,255,0.5), inset 5px 5px 10px rgba(0,0,0,0.05)",
      },
      "& .MuiListItemText-secondary": {
        fontSize: "13px",
      },
      [theme.breakpoints.up("sm")]: {
        width: "70vw",
        margin: "20px",
        padding: "30px 40px",
        "& .MuiListItemText-secondary": {
          fontSize: "14px",
        },
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        textAlign: "left",
        width: "60vw",
        "& .MuiListItemText-secondary": {
          fontSize: "15px",
        },
      },
    },
    link: {
      textDecoration: "none",
      color: "#3d5af1",
    },
    form: {
      height: "150px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      maxWidth: "600px",
      padding: "10px",
      "& p": {
        fontSize: "0.75rem",
      },
      "& .MuiFormHelperText-root.Mui-error": {
        marginTop: "0",
      },
      [theme.breakpoints.up("sm")]: {
        height: "150px",
        justifyContent: "space-around",
        margin: "20px",
        padding: "20px",
        "& p": {
          fontSize: "1rem",
        },
        "& .MuiFormHelperText-root.Mui-error": {
          marginTop: "3px",
        },
      },
    },
    input: {
      display: "flex",
      "& input": {
        height: "30px",
        width: "100%",
        background: "#ebf5fc",
        border: "none",
        outline: "none",
        borderRadius: "20px",
        padding: "5px 15px",
        fontSize: "18px",
        color: "#3d5af1",
        boxShadow: "inset -2px -2px 6px rgba(255, 255, 255, 1), inset 2px 2px 6px rgba(0, 0, 0, 0.1);",
      },
    },
    isFree: {
      color: "#00BB6D",
      marginBottom: "20px",
      paddingLeft: "8px",
    },
    isOwned: {
      color: "#ff304f",
      marginBottom: "20px",
      paddingLeft: "8px",
    },
    bottomSpacer: {
      marginBottom: "8px",
    },
  }),
);
