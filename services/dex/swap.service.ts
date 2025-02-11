import type { Wallet } from '@solana/wallet-adapter-react';
import { JupiterService } from '@/lib/arbitrage/dex/jupiter';
import { RaydiumService } from '@/lib/arbitrage/dex/raydium';
import { OrcaService } from '@/lib/arbitrage/dex/orca';

export class SwapService {
  private jupiterService: JupiterService;
  private raydiumService: RaydiumService;
  private orcaService: OrcaService;

  constructor(connection: Connection) {
    this.jupiterService = new JupiterService(connection);
    this.raydiumService = new RaydiumService(connection);
    this.orcaService = new OrcaService(connection);
  }

  async getBestPrice(inputToken: string, outputToken: string, amount: number) {
    const [jupiterPrice, raydiumPrice, orcaPrice] = await Promise.all([
      this.jupiterService.getQuote(inputToken, outputToken, amount),
      this.raydiumService.getQuote(inputToken, outputToken, amount),
      this.orcaService.getQuote(inputToken, outputToken, amount)
    ]);

    // Compare prices and return best route
    const prices = [
      { dex: 'Jupiter', price: jupiterPrice },
      { dex: 'Raydium', price: raydiumPrice },
      { dex: 'Orca', price: orcaPrice }
    ];

    return prices.reduce((best, current) => 
      current.price > best.price ? current : best
    );
  }

  async executeSwap(
    inputToken: string,
    outputToken: string, 
    amount: number,
    wallet: Wallet
  ) {
    const bestRoute = await this.getBestPrice(inputToken, outputToken, amount);
    
    switch(bestRoute.dex) {
      case 'Jupiter':
        return this.jupiterService.executeSwap(bestRoute.price, wallet);
      case 'Raydium':
        return this.raydiumService.executeSwap(bestRoute.price, wallet);
      case 'Orca':
        return this.orcaService.executeSwap(bestRoute.price, wallet);
    }
  }
}