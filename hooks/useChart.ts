import { useEffect, useRef } from "react";
import {
  createChart,
  type IChartApi,
  type ChartOptions,
} from "lightweight-charts";

interface UseChartProps {
  container: HTMLElement | null;
  options?: ChartOptions;
}

interface UseChartResult {
  containerRef: React.RefObject<HTMLDivElement>;
  chart: IChartApi | null;
}

/**
 * Кастомный хук для создания графика с автоматической установкой ширины и обработкой изменения размера окна.
 *
 * @param options Опции для функции createChart.
 * @returns Объект с ссылкой на контейнер графика и экземпляром графика.
 */
export function useChart(container: HTMLElement | null, options: ChartOptions = {}) {
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!container) return;

    const chart = createChart(container, {
      layout: {
        background: { color: 'transparent' },
        textColor: '#D9D9D9',
      },
      grid: {
        vertLines: { color: '#404040' },
        horzLines: { color: '#404040' },
      },
      ...options
    });

    chartRef.current = chart;

    const handleResize = () => {
      chart.applyOptions({
        width: container.clientWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Вызываем сразу для установки начальной ширины

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [container, options]);

  return chartRef.current;
}

export function useChartResult(options: ChartOptions): UseChartResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Создаём график с заданными опциями и шириной контейнера
    chartRef.current = createChart(containerRef.current, {
      ...options,
      width: containerRef.current.clientWidth,
    });

    const handleResize = () => {
      if (chartRef.current && containerRef.current) {
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    // Очистка: удаляем обработчик события и график при размонтировании
    return () => {
      window.removeEventListener("resize", handleResize);
      chartRef.current?.remove();
    };
  }, [options]);

  return { containerRef, chart: chartRef.current };
}
  