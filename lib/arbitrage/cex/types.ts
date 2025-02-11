export interface BaseOrder {
    symbol: string;
    side: 'BUY' | 'SELL';
    type: 'LIMIT' | 'MARKET';
    quantity: number;
    price?: number;
  }
  
  export interface OrderBook {
    bids: [number, number][]; // [price, quantity][]
    asks: [number, number][]; // [price, quantity][]
  }
  
  export interface AccountBalance {
    asset: string;
    free: number;
    locked: number;
  }