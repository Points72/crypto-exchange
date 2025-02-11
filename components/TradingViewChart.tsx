"use client";

import { useEffect, useRef } from 'react';

interface TradingViewWidgetOptions {
  autosize: boolean;
  symbol: string;
  interval: string;
  timezone: string;
  theme: string;
  style: string;
  locale: string;
  toolbar_bg: string;
  enable_publishing: boolean;
  allow_symbol_change: boolean;
  container_id: string;
  hide_side_toolbar: boolean;
}

declare global {
  interface Window {
    TradingView: {
      widget: {
        new (options: TradingViewWidgetOptions): unknown;
      };
    };
  }
}

let tvScriptLoadingPromise: Promise<void>;

export function TradingViewChart() {
  const onLoadScriptRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = () => resolve();

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (document.getElementById('tradingview_chart') && window.TradingView) {
        const widget = new window.TradingView.widget({
          autosize: true,
          symbol: 'BINANCE:BTCUSDT',
          interval: '15',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_chart',
          hide_side_toolbar: false,
        });
        return widget;
      }
    }
  }, []);

  return (
    <div className="h-full w-full" id="tradingview_chart" />
  );
} 