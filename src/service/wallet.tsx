import { SigningCosmWasmClient } from "@cosmjs/cosmwasm";
import { OfflineSigner } from "@cosmjs/launchpad";
import ky from "ky";
import * as React from "react";
import { useEffect, useState } from "react";

import { AppConfig } from "../config";
import { useError } from "./error";
import { createClient, loadOrCreateWallet } from "./sdk";

export interface CosmWasmContextType {
  readonly loading: boolean;
  readonly address: string;
  readonly getClient: () => SigningCosmWasmClient;
}

const defaultContext: CosmWasmContextType = {
  loading: true,
  address: "",
  getClient: (): SigningCosmWasmClient => {
    throw new Error("not yet initialized");
  },
};

export const CosmWasmContext = React.createContext<CosmWasmContextType>(defaultContext);

export const useSdk = (): CosmWasmContextType => React.useContext(CosmWasmContext);

export interface WalletProviderProps {
  config: AppConfig;
  children: any;
}

export interface SdkProviderProps {
  config: AppConfig;
  loadWallet: (addressPrefix: string) => Promise<OfflineSigner>;
  children: any;
}

export function BurnerWalletProvider(props: WalletProviderProps): JSX.Element {
  return (
    <SdkProvider config={props.config} loadWallet={loadOrCreateWallet}>
      {props.children}
    </SdkProvider>
  );
}

export function SdkProvider(props: SdkProviderProps): JSX.Element {
  const [value, setValue] = useState(defaultContext);
  const { setError } = useError();

  const { config, loadWallet } = props;

  // just call this once on startup
  useEffect(() => {
    loadWallet(config.addressPrefix)
      .then((signer) => createClient(config.httpUrl, signer))
      .then(async (client) => {
        const address = client.senderAddress;
        // load from faucet if needed
        if (config.faucetUrl) {
          const acct = await client.getAccount();
          if (!acct?.balance?.length) {
            await ky.post(config.faucetUrl, { json: { ticker: "COSM", address } });
          }
        }

        setValue({
          loading: false,
          address: address,
          getClient: () => client,
        });
      })
      .catch(setError);

    // TODO: return a clean-up function???
  }, [config.httpUrl, config.faucetUrl, config.addressPrefix, loadWallet, setError]);

  return <CosmWasmContext.Provider value={value}>{props.children}</CosmWasmContext.Provider>;
}
