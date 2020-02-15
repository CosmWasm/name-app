import { CosmWasmClient, Secp256k1Pen, encodeAddress, encodeSecp256k1Pubkey, types } from "@cosmwasm/sdk";
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
    readonly address: string,
    readonly client: CosmWasmClient,
}

// this creates a new connection to a server at URL,
// using a signing keyring generated from the given mnemonic
export async function connect(httpUrl: string, mnemonic: string): Promise<ConnectResult> {    
    const pen = await Secp256k1Pen.fromMnemonic(mnemonic);
    const pubkey = encodeSecp256k1Pubkey(pen.pubkey);
    const address = encodeAddress(pubkey, "cosmos");
    const client = CosmWasmClient.makeWritable(httpUrl, address, signBytes => pen.sign(signBytes));    
    return { address, client} ;
}
