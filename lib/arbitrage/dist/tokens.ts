export interface BaseConfig {
    rpcUrl: string;
    wsUrl?: string;
    commitment?: 'processed' | 'confirmed' | 'finalized';
  }
  
  export interface PriceLevel {
    price: number;
    size: number;
  }
  
  export interface OrderBook {
    asks: PriceLevel[];
    bids: PriceLevel[];
    timestamp: number;
  }
  
  export interface Trade {
    price: number;
    size: number;
    side: 'buy' | 'sell';
    timestamp: number;
  }
  
  export interface MarketInfo {
    baseSymbol: string;
    quoteSymbol: string;
    minOrderSize: number;
    tickSize: number;
    fees: {
      taker: number;
      maker: number;
    };
  }