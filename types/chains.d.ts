export interface Chain {
  id: number;
  name: string;
  network: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: string;
    public: string;
  };
  blockExplorers: {
    default: { name: string; url: string };
  };
  testnet: boolean;
}

export interface ChainConfig {
  [key: string]: Chain;
} 