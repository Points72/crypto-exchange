import { PublicKey } from '@solana/web3.js';
import { JupiterService } from '@/lib/arbitrage/dex/jupiter';
import { RaydiumService } from '@/lib/arbitrage/dex/raydium';
import { OrcaService } from '@/lib/arbitrage/dex/orca';

export interface SwapRoute {
  inputMint: string;
  outputMint: string;
  amount: number;
  priceImpact: number;
  dex: 'jupiter' | 'raydium' | 'orca';
  expectedOutput: number;
}

export interface LiquidityPool {
  address: string;
  dex: string;
  token0: {
    mint: string;
    reserve: number;
  };
  token1: {
    mint: string;
    reserve: number;
  };
  fee: number;
  apy?: number;
}

export class ExchangeAPI {
  private jupiter: JupiterService;
  private raydium: RaydiumService;
  private orca: OrcaService;

  constructor(
    jupiter: JupiterService,
    raydium: RaydiumService,
    orca: OrcaService
  ) {
    this.jupiter = jupiter;
    this.raydium = raydium;
    this.orca = orca;
  }

  async getBestRoute(params: {
    inputMint: string;
    outputMint: string;
    amount: number;
  }): Promise<SwapRoute> {
    const [jupiterQuote, raydiumQuote, orcaQuote] = await Promise.all([
      this.jupiter.getQuote(params.inputMint, params.outputMint, params.amount),
      this.raydium.getQuote(params.inputMint, params.outputMint, params.amount),
      this.orca.getQuote(params.inputMint, params.outputMint, params.amount)
    ]);

    // Находим лучший маршрут
    const routes = [
      { ...jupiterQuote, dex: 'jupiter' },
      { ...raydiumQuote, dex: 'raydium' },
      { ...orcaQuote, dex: 'orca' }
    ];

    return routes.reduce((best, current) => 
      current.expectedOutput > best.expectedOutput ? current : best
    );
  }

  async getAllPools(): Promise<LiquidityPool[]> {
    const [jupiterPools, raydiumPools, orcaPools] = await Promise.all([
      this.jupiter.getPools(),
      this.raydium.getPools(),
      this.orca.getPools()
    ]);

    return [
      ...jupiterPools,
      ...raydiumPools,
      ...orcaPools
    ];
  }

  async getPoolByAddress(address: string): Promise<LiquidityPool | null> {
    const pools = await this.getAllPools();
    return pools.find(pool => pool.address === address) || null;
  }
}