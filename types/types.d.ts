import { Transaction } from "@solana/web3.js";
  import { providers } from "ethers";
  
  export interface SolanaWallet {
    connect(): Promise<{ publicKey: string }>;
    disconnect(): Promise<void>;
    signTransaction(transaction: Transaction): Promise<{
      serialize(): Uint8Array;
      publicKey: { toString(): string };
    }>;
    publicKey?: { toString(): string };
    isPhantom?: boolean;
  }
  
  export interface EthereumProvider extends providers.ExternalProvider {
    request<T>(args: { method: string; params?: unknown[] }): Promise<T>;
    on(event: string, handler: (params: unknown) => void): void;
    removeListener(event: string, handler: (params: unknown) => void): void;
    isMetaMask?: boolean;
    chainId?: string;
    selectedAddress?: string;
  }
  
  declare global {
    interface Window {
      solana?: SolanaWallet;
      ethereum?: EthereumProvider;
    }
  }
  
  export interface Token {
    symbol: string;
    name: string;
    logoUrl: string;
    address: string;
    decimals: number;
    chain: 'ethereum' | 'bsc' | 'polygon' | 'solana';
  }
  
  export interface QuoteResponse {
    outAmount?: number;
    toTokenAmount?: string;
    fromTokenAmount?: string;
    priceImpact?: string;
    networkFee?: string;
  }
  
  export interface SwapResponse {
    tx?: {
      to: string;
      data: string;
      value: string;
      gasLimit: string;
    };
    transaction?: string;
  }
  
  export type SupportedChains = {
    ethereum: { id: 1; name: 'Ethereum' };
    bsc: { id: 56; name: 'BSC' };
    polygon: { id: 137; name: 'Polygon' };
    solana: { id: 'mainnet-beta'; name: 'Solana' };
  };
  