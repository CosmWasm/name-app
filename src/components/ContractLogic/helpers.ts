import { types } from "@cosmwasm/sdk";

export function coinStr(coin?: types.Coin): string {
  return coin ? `${coin.amount} ${coin.denom}` : "0";
}
