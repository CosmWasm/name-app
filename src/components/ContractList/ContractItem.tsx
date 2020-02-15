import Avatar from "@material-ui/core/Avatar";
import WorkIcon from "@material-ui/icons/Work";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import { Link } from "react-router-dom";


export interface ContractItemProps {
    readonly name: string;
    readonly address: string;
}

export function ContractItem({name, address}: ContractItemProps): JSX.Element {
    // TODO: Make this a link
    return (
      <Link to={`/contract/${address}`}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={address} />
        </ListItem>
      </Link>
    );
}
