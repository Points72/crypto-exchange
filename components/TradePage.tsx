"use client";

import TradeChart from "@/components/trade-chart";
import TradeControls from "@/components/trade-controls";

export default function TradePage() {
  return (
    <div className="max-w-4xl mx-auto mt-6 p-4 bg-[#0A0B1E] rounded-lg shadow-lg">
      <h1 className="text-xl font-bold text-white mb-4">Trading Page</h1>
      <TradeChart symbol="BTC/USDT" />
      <div className="mt-4">
        <TradeControls />
      </div>
    </div>
  );
}
