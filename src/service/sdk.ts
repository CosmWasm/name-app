import {
  encodeSecp256k1Pubkey,
  pubkeyToAddress,
  Secp256k1Pen,
  SigningCallback,
  SigningCosmWasmClient,
} from "@cosmwasm/sdk";
import {FeeTable} from "@cosmwasm/sdk/types/signingcosmwasmclient";
import { StdSignature } from "@cosmwasm/sdk/types/types";
import { Bip39, Random } from "@iov/crypto";

// generateMnemonic will give you a fresh mnemonic
// it is up to the app to store this somewhere
export function generateMnemonic(): string {
  return Bip39.encode(Random.getBytes(16)).toString();
}

// some code that will only work in a browser...
export function loadOrCreateMnemonic(): string {
  const key = "burner-wallet";
  const loaded = localStorage.getItem(key);
  if (loaded) {
    return loaded;
  }
  const generated = generateMnemonic();
  localStorage.setItem(key, generated);
  return generated;
}

export interface ConnectResult {
  readonly address: string;
  readonly client: SigningCosmWasmClient;
}

export interface Wallet {
  readonly address: string;
  readonly signer: SigningCallback;
}

export async function burnerWallet(): Promise<Wallet> {
  const mnemonic = loadOrCreateMnemonic();
  const pen = await Secp256k1Pen.fromMnemonic(mnemonic);
  const pubkey = encodeSecp256k1Pubkey(pen.pubkey);
  const address = pubkeyToAddress(pubkey, "enigma");
  const signer = (signBytes: Uint8Array): Promise<StdSignature> => pen.sign(signBytes);
  return { address, signer };
}

const buildFeeTable = (feeToken: string, gasPrice: number): FeeTable => {
  const stdFee = (gas: number, denom: string, price: number) => {
    const amount = Math.floor(gas * price);
    return {
      amount: [{ amount: amount.toString(), denom: denom }],
      gas: gas.toString(),
    }
  };

  return {
    upload: stdFee(1000000, feeToken, gasPrice),
    init: stdFee(500000, feeToken, gasPrice),
    exec: stdFee(200000, feeToken, gasPrice),
    send: stdFee(80000, feeToken, gasPrice),
  }
};

// this creates a new connection to a server at URL,
// using a signing keyring generated from the given mnemonic
export async function connect(httpUrl: string, { address, signer }: Wallet): Promise<ConnectResult> {
  const client = new SigningCosmWasmClient(httpUrl, address, signer, 
    buildFeeTable("uscrt", 1));
  return { address, client };
}
