
export interface AppConfig {
    readonly httpUrl: string;
    readonly faucetUrl?: string;
};

const local: AppConfig = {
    httpUrl: "http://localhost:1317",
    faucetUrl: "http://localhost:8000/credit",
};

const demo: AppConfig = {
    httpUrl: "https://lcd.demo.cosmwasm.com",
    faucetUrl: "https://faucet.demo.cosmwasm.com/credit",
};

// TODO: set this via env variable 
const isLocal = true;

export const config = isLocal ? local : demo;