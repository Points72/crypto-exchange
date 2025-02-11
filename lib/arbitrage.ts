import { providers } from 'ethers';
import { createExchangeAPI } from './exchange-api';
import { Exchange } from './exchange-api';

interface PriceData {
  exchange: string;
  price: number;
  volume24h: number;
}

export async function getArbitragePrices(pair: string): Promise<PriceData[]> {
  // Получаем данные со всех бирж параллельно
  const [bingx, bybit, mexc, kucoin, okx] = await Promise.all([
    // BingX
    fetch(`https://open-api.bingx.com/openApi/spot/v1/market/ticker?symbol=${pair}`)
      .then(r => r.json())
      .then(data => ({
        exchange: 'BingX',
        price: parseFloat(data.price),
        volume24h: parseFloat(data.volume)
      })),

    // Bybit
    fetch(`https://api.bybit.com/v2/public/tickers?symbol=${pair}`)
      .then(r => r.json())
      .then(data => ({
        exchange: 'Bybit',
        price: parseFloat(data.result[0].last_price),
        volume24h: parseFloat(data.result[0].volume_24h)
      })),

    // MEXC
    fetch(`https://api.mexc.com/api/v3/ticker/24hr?symbol=${pair}`)
      .then(r => r.json())
      .then(data => ({
        exchange: 'MEXC',
        price: parseFloat(data.lastPrice),
        volume24h: parseFloat(data.volume)
      })),

    // KuCoin
    fetch(`https://api.kucoin.com/api/v1/market/stats?symbol=${pair}`)
      .then(r => r.json())
      .then(data => ({
        exchange: 'KuCoin',
        price: parseFloat(data.data.last),
        volume24h: parseFloat(data.data.vol)
      })),

    // OKX
    fetch(`https://www.okx.com/api/v5/market/ticker?instId=${pair.replace('USDT', '-USDT')}`)
      .then(r => r.json())
      .then(data => ({
        exchange: 'OKX',
        price: parseFloat(data.data[0].last),
        volume24h: parseFloat(data.data[0].vol24h)
      }))
  ]);

  return [bingx, bybit, mexc, kucoin, okx].filter(price => price.price > 0);
}

export interface ArbitrageOpportunity {
  fromExchange: string;
  toExchange: string;
  pair: string;
  priceDiff: number;
  volume24h: number;
  buyExchange: Exchange;
  sellExchange: Exchange;
  symbol: string;
  profit: number;
  volume: number;
}

export async function findArbitrageOpportunities(
  exchanges: Exchange[],
  symbols: string[]
): Promise<ArbitrageOpportunity[]> {
  const opportunities: ArbitrageOpportunity[] = [];

  for (const symbol of symbols) {
    try {
      const orderBooks = await Promise.all(
        exchanges.map(exchange => exchange.getOrderBook(symbol))
      );

      for (let i = 0; i < exchanges.length; i++) {
        for (let j = 0; j < exchanges.length; j++) {
          if (i === j) continue;

          const buyPrice = orderBooks[i].asks[0].price;
          const sellPrice = orderBooks[j].bids[0].price;
          const profit = sellPrice - buyPrice;

          if (profit > 0) {
            opportunities.push({
              fromExchange: exchanges[i].name,
              toExchange: exchanges[j].name,
              pair: symbol,
              priceDiff: profit,
              volume24h: Math.min(orderBooks[i].asks[0].amount, orderBooks[j].bids[0].amount),
              buyExchange: exchanges[i],
              sellExchange: exchanges[j],
              symbol,
              profit,
              volume: Math.min(orderBooks[i].asks[0].amount, orderBooks[j].bids[0].amount)
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching orderbook for ${symbol}:`, error);
    }
  }

  return opportunities.sort((a, b) => b.profit - a.profit);
}

// Для ботов
export async function startArbitrageBot(config: {
  pairs: string[];
  exchanges: string[];
  minProfit: number;
  maxSlippage: number;
}) {
  let isActive = true;
  
  while (isActive) {
    try {
      const opportunities = await findArbitrageOpportunities(config.exchanges.map(e => createExchangeAPI(e.toLowerCase(), {
        apiKey: process.env[`${e.toUpperCase()}_API_KEY`] || '',
        apiSecret: process.env[`${e.toUpperCase()}_API_SECRET`] || '',
        passphrase: process.env[`${e.toUpperCase()}_PASSPHRASE`]
      })), config.pairs);
      
      for (const opp of opportunities) {
        if (
          config.pairs.includes(opp.pair) &&
          config.exchanges.includes(opp.buyExchange.exchange) &&
          config.exchanges.includes(opp.sellExchange.exchange) &&
          opp.profit >= config.minProfit
        ) {
          // Выполняем арбитраж
          await executeArbitrage(opp);
        }
      }
    } catch (error) {
      console.error('Bot error:', error);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Пауза 1 секунда
  }
}

export async function executeArbitrage(opportunity: ArbitrageOpportunity) {
  const { buyExchange, sellExchange, symbol, volume } = opportunity;

  try {
    const [buyOrder, sellOrder] = await Promise.all([
      buyExchange.createOrder({
        symbol,
        side: 'buy',
        type: 'market',
        quantity: volume
      }),
      sellExchange.createOrder({
        symbol,
        side: 'sell',
        type: 'market',
        quantity: volume
      })
    ]);

    return { buyOrder, sellOrder };
  } catch (error) {
    console.error('Error executing arbitrage:', error);
    throw error;
  }
} 