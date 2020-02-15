import * as React from "react";
import { useEffect, useState } from "react";

import { CosmWasmClient } from "@cosmwasm/sdk";

import { connect, loadOrCreateMnemonic } from "./sdk";

export interface AppConfig {
    readonly httpUrl: string;
    readonly codeId: number;
}

export interface ICosmWasmContext {
    readonly loading: boolean;
    readonly config: AppConfig;
    readonly address: string;
    readonly getClient: () => CosmWasmClient;
}

const defaultConfig = {
    httpUrl: "http://localhost:1317",
    codeId: 1,
};

const defaultContext = {
    loading: true,
    address: "",
    getClient: (): CosmWasmClient => { throw new Error("not yet initialized") },
    config: defaultConfig,
};

export const CosmWasmContext = React.createContext<ICosmWasmContext>(defaultContext);

export const useSdk = () => React.useContext(CosmWasmContext);

export interface SdkProviderProps {
    children: any,
}

export function SdkProvider(props: SdkProviderProps): JSX.Element {
    const [value, setValue] = useState(defaultContext);

    // just call this once on startup
    useEffect(() => {
        const mnemonic = loadOrCreateMnemonic();
        // On first load, we set the data
        connect(value.config.httpUrl, mnemonic).then(({address, client}) =>
            setValue({
                loading: false,
                address: address,
                getClient: () => client,
                config: value.config,
            })).catch(err => console.log(`Error: ${err}`));

        // TODO: return a clean-up function???
    }, [value.config]);

    return (
        <CosmWasmContext.Provider value={value}>
          {props.children}
        </CosmWasmContext.Provider>
      );    
}