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

export interface SdkManagerProps {
    readonly children: number;
}

export function SdkManager(props: SdkManagerProps): JSX.Element {
    const [value, setValue] = useState(defaultContext);

    // just call this once on startup
    useEffect(() => {
        const mnemonic = loadOrCreateMnemonic();
        // TODO: remove this for real
        console.log(mnemonic);

        // On first load, we set the data
        connect(value.httpUrl, mnemonic).then(({address, client}) =>
            setValue({
                loading: false,
                httpUrl: value.httpUrl,
                address: address,
                getClient: () => client,
            }));
            
        // TODO: return a clean-up function???
    }, []);

    return (
        <CosmWasmContext.Provider value={value}>
          {props.children}
        </CosmWasmContext.Provider>
      );    
}