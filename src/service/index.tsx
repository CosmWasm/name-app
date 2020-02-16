import * as React from "react";
import { useEffect, useState } from "react";

import { CosmWasmClient } from "@cosmwasm/sdk";

import { burnerWallet, connect, Wallet } from "./sdk";

export interface AppConfig {
    readonly httpUrl: string;
    readonly faucetUrl?: string;
}

export interface ICosmWasmContext {
    readonly loading: boolean;
    readonly address: string;
    readonly getClient: () => CosmWasmClient;
}

export const defaultConfig: AppConfig = {
    httpUrl: "http://localhost:1317",
};

const defaultContext: ICosmWasmContext = {
    loading: true,
    address: "",
    getClient: (): CosmWasmClient => { throw new Error("not yet initialized") },
};

export const CosmWasmContext = React.createContext<ICosmWasmContext>(defaultContext);

export const useSdk = () => React.useContext(CosmWasmContext);

export interface WalletProviderProps {
    config: AppConfig,
    children: any,
}

export interface SdkProviderProps {
    config: AppConfig,
    loadWallet: () => Promise<Wallet>,
    children: any,
}


export function BurnerWalletProvider(props: WalletProviderProps): JSX.Element {
    return (
        <SdkProvider config={props.config} loadWallet={burnerWallet}>
          {props.children}
        </SdkProvider>
      );    
}

export function SdkProvider(props: SdkProviderProps): JSX.Element {
    const [value, setValue] = useState(defaultContext);

    const { config, loadWallet } = props;

    // just call this once on startup
    useEffect(() => {
        loadWallet()
            .then(wallet => connect(config.httpUrl, wallet))
            .then(({address, client}) =>
                setValue({
                    loading: false,
                    address: address,
                    getClient: () => client,
                })
            ).catch(err => console.log(`Error: ${err}`));

        // TODO: return a clean-up function???
    }, [config.httpUrl, loadWallet]);

    return (
        <CosmWasmContext.Provider value={value}>
          {props.children}
        </CosmWasmContext.Provider>
      );    
}