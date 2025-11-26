/**
 * Web3 Integration Library
 * 
 * This library provides integration with Web3 technologies including
 * wagmi for Ethereum interactions and thirdweb for Web3 development.
 */

import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

/**
 * Wagmi configuration for Web3 interactions
 */
export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

/**
 * Thirdweb configuration
 */
export const thirdwebConfig = {
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
};

/**
 * Utility function to format wallet addresses
 */
export function formatAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Utility function to format token amounts
 */
export function formatTokenAmount(amount: bigint, decimals: number = 18): string {
  const divisor = BigInt(10 ** decimals);
  const integerPart = amount / divisor;
  const fractionalPart = amount % divisor;
  return `${integerPart}.${fractionalPart.toString().padStart(decimals, "0").slice(0, 4)}`;
}

/**
 * Check if a wallet address is valid
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export * from "wagmi";
export { mainnet, sepolia };
