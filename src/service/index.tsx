import * as React from "react";
import { useEffect, useState } from "react";

import { CosmWasmClient } from "@cosmwasm/sdk";

import { connect, loadOrCreateMnemonic } from "./sdk";

export interface ICosmWasmContext {
    readonly loading: boolean;
    readonly httpUrl: string;
    readonly address: string;
    readonly getClient: () => CosmWasmClient;
}

const defaultContext = {
    loading: true,
    httpUrl: "http://localhost:1317",
    address: "",
    getClient: (): CosmWasmClient => { throw new Error("not yet initialized") },
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
        connect(value.httpUrl, mnemonic).then(({address, client}) =>
            setValue({
                loading: false,
                httpUrl: value.httpUrl,
                address: address,
                getClient: () => client,
            })).catch(err => console.log(`Error: ${err}`));

        // TODO: return a clean-up function???
    }, [value.httpUrl]);

    return (
        <CosmWasmContext.Provider value={value}>
          {props.children}
        </CosmWasmContext.Provider>
      );    
}