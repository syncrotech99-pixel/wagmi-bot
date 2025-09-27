import { Connection, Keypair, PublicKey } from "@solana/web3.js";

export const connection = new Connection("https://api.testnet.solana.com");

export function getWallet(secret) {
  return Keypair.fromSecretKey(Uint8Array.from(secret));
}

export async function getBalance(address) {
  const pubkey = new PublicKey(address);
  const lamports = await connection.getBalance(pubkey);
  return lamports / 1e9; // convert to SOL
}
