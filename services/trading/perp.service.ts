import { Connection, PublicKey } from '@solana/web3.js';
import type { Wallet } from '@solana/wallet-adapter-react';

export interface PerpPosition {
  market: string;
  size: number;
  entryPrice: number;
  leverage: number;
  pnl: number;
  liquidationPrice: number;
}

export class PerpService {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async openPosition(
    market: string,
    side: 'long' | 'short',
    size: number,
    leverage: number,
    wallet: Wallet
  ) {
    // Реализация открытия позиции
  }

  async closePosition(
    market: string,
    positionId: string,
    wallet: Wallet
  ) {
    // Реализация закрытия позиции
  }

  async getPositions(wallet: PublicKey): Promise<PerpPosition[]> {
    // Получение открытых позиций
    return [];
  }

  async getMarketPrice(market: string): Promise<number> {
    // Получение текущей цены рынка
    return 0;
  }

  async getLiquidationPrice(
    market: string,
    size: number,
    leverage: number
  ): Promise<number> {
    // Расчет цены ликвидации
    return 0;
  }
}