import { Connection } from '@solana/web3.js';
import { PriceFeed } from './price-feed';
import { SwapService } from '@/services/dex/swap.service';

interface ArbitrageOpportunity {
  buyDex: string;
  sellDex: string;
  inputToken: string;
  outputToken: string;
  profitPercent: number;
  estimatedProfit: number;
}

export class ArbitrageService {
  private connection: Connection;
  private priceFeed: PriceFeed;
  private swapService: SwapService;

  constructor(connection: Connection) {
    this.connection = connection;
    this.priceFeed = new PriceFeed(connection);
    this.swapService = new SwapService(connection);
  }

  async findArbitrageOpportunities(
    minProfitPercent: number = 1.0
  ): Promise<ArbitrageOpportunity[]> {
    const opportunities: ArbitrageOpportunity[] = [];
    
    // Получаем все поддерживаемые токены
    const tokens = await this.getTokenList();
    
    // Проверяем возможности арбитража между DEX'ами
    for (const inputToken of tokens) {
      for (const outputToken of tokens) {
        if (inputToken === outputToken) continue;

        const opportunity = await this.checkArbitrageOpportunity(
          inputToken,
          outputToken
        );

        if (opportunity && opportunity.profitPercent >= minProfitPercent) {
          opportunities.push(opportunity);
        }
      }
    }

    return opportunities.sort((a, b) => b.profitPercent - a.profitPercent);
  }

  private async checkArbitrageOpportunity(
    inputToken: string,
    outputToken: string
  ): Promise<ArbitrageOpportunity | null> {
    const amount = 1000; // USDC например

    const prices = await Promise.all([
      this.swapService.getBestPrice(inputToken, outputToken, amount),
      this.swapService.getBestPrice(outputToken, inputToken, amount)
    ]);

    const [forwardPrice, backwardPrice] = prices;
    const profitPercent = (backwardPrice.price / forwardPrice.price - 1) * 100;

    if (profitPercent <= 0) return null;

    return {
      buyDex: forwardPrice.dex,
      sellDex: backwardPrice.dex,
      inputToken,
      outputToken,
      profitPercent,
      estimatedProfit: (profitPercent / 100) * amount
    };
  }

  private async getTokenList(): Promise<string[]> {
    // Получение списка поддерживаемых токенов
    return [];
  }
}