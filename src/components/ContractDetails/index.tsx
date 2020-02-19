import MuiTypography from "@material-ui/core/Typography";
import * as React from "react";

export interface ContractDetailsProps {
    readonly address: string;
}

function ContractDetails(props: ContractDetailsProps): JSX.Element {
    return (
        <div>
             <MuiTypography color="secondary">{props.address}</MuiTypography>
             <MuiTypography variant="h5">Most popular name is TODO</MuiTypography>
        </div>
    );
}
  
export default ContractDetails;
  