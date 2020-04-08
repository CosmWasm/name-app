export interface AppConfig {
  readonly httpUrl: string;
  readonly faucetUrl?: string;
  // codeId is the wasm codeId for the name service contract on the given chain
  readonly codeId: number;
}

const local: AppConfig = {
  httpUrl: "http://localhost:1317",
  faucetUrl: "http://localhost:8000/credit",
  codeId: 2,
};

const demo: AppConfig = {
  httpUrl: "https://lcd.demo-071.cosmwasm.com",
  faucetUrl: "https://faucet.demo-071.cosmwasm.com/credit",
  codeId: 2,
};

// REACT_APP_LOCAL is set via `yarn start:local`
const isLocal = process.env.NODE_ENV !== "production" && !!process.env.REACT_APP_LOCAL;

export const config = isLocal ? local : demo;
