import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

export interface ContractDetailsProps {
    readonly name: string;
    readonly address: string;
    readonly topName: string;
}

function ContractDetails(props: ContractDetailsProps): JSX.Element {
    return (
        <div>
             <MuiTypography variant="h3">{props.name}</MuiTypography>
             <MuiTypography color="secondary">{props.address}</MuiTypography>
             <MuiTypography variant="h5">Most popular name is {props.topName}</MuiTypography>
        </div>
    );
}
  
export default ContractDetails;
  