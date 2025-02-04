import { useEffect, useRef } from "react";
  import {
    createChart,
    type IChartApi,
    type ChartOptions,
  } from "lightweight-charts";
  
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
  export function useChart(options: ChartOptions): UseChartResult {
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
  