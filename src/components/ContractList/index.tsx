import List from "@material-ui/core/List";
import * as React from "react";

import {ContractItem, ContractItemProps} from "./ContractItem";

export interface ContractListProps {
    readonly items: readonly ContractItemProps[];
}

function ContractList({items}: ContractListProps): JSX.Element {
    return (
        <List>
            {items.map(props => 
                <ContractItem {...props} key={props.address} />
            )}
        </List>
    );
}
  
export default ContractList;
  