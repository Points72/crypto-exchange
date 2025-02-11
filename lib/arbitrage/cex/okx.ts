import { BaseOrder, OrderBook, AccountBalance } from './types';

interface OkxConfig {
  apiKey: string;
  secretKey: string;
  passphrase: string;
}

export class OkxService {
  private config: KucoinConfig;

  constructor(config: KucoinConfig) {
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