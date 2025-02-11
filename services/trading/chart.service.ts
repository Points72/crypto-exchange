import { IChartApi, createChart } from 'lightweight-charts';

export class ChartService {
  private chart: IChartApi;
  
  constructor(container: HTMLElement) {
    this.chart = createChart(container, {
      layout: {
        background: { color: '#0A0B1E' },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
        horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });
  }

  async loadHistoricalData(
    symbol: string,
    timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d'
  ) {
    // Загрузка исторических данных
  }

  updatePrice(price: number, time: number) {
    // Обновление графика новыми ценами
  }

  resize() {
    this.chart.applyOptions({
      width: window.innerWidth,
      height: 500
    });
  }

  destroy() {
    this.chart.remove();
  }
}