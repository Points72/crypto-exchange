import { BaseOrder, OrderBook, AccountBalance } from './types';

interface BybitConfig {
  apiKey: string;
  secretKey: string;
  testnet?: boolean;
}

export class BybitService {
  private config: BybitConfig;

  constructor(config: BybitConfig) {
    this.config = config;
  }

  async getPrice(symbol: string): Promise<number> {
    // Имплементация
    return 0;
  }

  async executeTrade(order: BaseOrder): Promise<string> {
    // Имплементация
    return 'order_id';
  }

  async getOrderBook(symbol: string): Promise<OrderBook> {
    return { bids: [], asks: [] };
  }
}