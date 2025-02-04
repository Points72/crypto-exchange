"use client";

import { useEffect, useRef } from "react";
import { createChart, IChartApi, CandlestickSeriesOptions } from "lightweight-charts";

interface TradeChartProps {
  symbol: string;
  interval?: string;
}

export default function TradeChart({ symbol, interval = "1D" }: TradeChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: { background: { color: "#0A0B1E" }, textColor: "#d1d5db" },
      grid: { vertLines: { color: "#333" }, horzLines: { color: "#333" } },
      crosshair: { mode: 1 },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    } as CandlestickSeriesOptions);

    chartRef.current = chart;

    window.addEventListener("resize", () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    });

    return () => {
      chartRef.current?.remove();
      window.removeEventListener("resize", () => {});
    };
  }, [symbol]);

  return <div ref={chartContainerRef} className="w-full h-[400px] bg-[#0A0B1E] rounded-md"></div>;
}
