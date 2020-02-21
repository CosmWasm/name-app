import Avatar from "@material-ui/core/Avatar";
import WorkIcon from "@material-ui/icons/Work";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import { Link } from "react-router-dom";
import { types } from "@cosmwasm/sdk";

export interface ContractItemProps {
  readonly code_id: number;
  /** Bech32 account address */
  readonly address: string;
  readonly creator: string;
  /** Argument passed on initialization of the contract */
  readonly init_msg: object;
}

interface InitMsg {
  readonly name: string;
  readonly purchase_price?: types.Coin;
  readonly transfer_price?: types.Coin;
}

export function ContractItem({address, init_msg}: ContractItemProps): JSX.Element {
  const { name } = (init_msg as InitMsg);

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
