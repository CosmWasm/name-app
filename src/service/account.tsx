import { Account } from "@cosmwasm/sdk";
import * as React from "react";

import { useSdk } from "./wallet";

interface State {
  readonly account?: Account;
}

export interface AccountContextType extends State {
  readonly refreshAccount: () => void;
}

function dummyRefresh(): void {
  console.log("Calling uninitialized account callback");
}

const defaultContext = (): AccountContextType => {
  return {
    refreshAccount: dummyRefresh,
  };
};

export const AccountContext = React.createContext<AccountContextType>(defaultContext());

export const useAccount = (): AccountContextType => React.useContext(AccountContext);

export function AccountProvider(props: { readonly children: any }): JSX.Element {
  const [value, setValue] = React.useState<State>({});
  const { getClient } = useSdk();

  const refreshAccount = (): void => {
    getClient()
      .getAccount()
      .then(account => setValue({ account }));
  };

  // this should just be called once on startup
  React.useEffect(refreshAccount, [getClient]);

  const context: AccountContextType = {
    refreshAccount,
    account: value.account,
  };

  return <AccountContext.Provider value={context}>{props.children}</AccountContext.Provider>;
}
