
export interface AppConfig {
    readonly httpUrl: string;
    readonly faucetUrl?: string;
    // codeId is the wasm codeId for the name service contract on the given chain
    readonly codeId: number;
};

const local: AppConfig = {
    httpUrl: "http://localhost:1317",
    faucetUrl: "http://localhost:8000/credit",
    codeId: 2,
};

const demo: AppConfig = {
    httpUrl: "https://lcd.demo.cosmwasm.com",
    faucetUrl: "https://faucet.demo.cosmwasm.com/credit",
    codeId: 2,
};

// TODO: set this via env variable 
const isLocal = true;

export const config = isLocal ? local : demo;