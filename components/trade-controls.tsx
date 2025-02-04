"use client";

import { useState } from "react";

export default function TradeControls() {
  const [amount, setAmount] = useState("");
  const [leverage, setLeverage] = useState(10);
  const [side, setSide] = useState<"long" | "short">("long");

  const handleTrade = () => {
    alert(`Executing ${side.toUpperCase()} trade with ${amount} USDT and ${leverage}x leverage`);
  };

  return (
    <div className="bg-[#1A1B3E] p-4 rounded-md shadow-lg">
      <h2 className="text-lg font-bold text-white">Trade Controls</h2>
      <div className="flex flex-col space-y-3">
        <div>
          <label className="text-gray-300">Amount (USDT)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-[#0A0B1E] text-white"
          />
        </div>
        <div>
          <label className="text-gray-300">Leverage</label>
          <input
            type="range"
            min="1"
            max="100"
            value={leverage}
            onChange={(e) => setLeverage(parseInt(e.target.value))}
            className="w-full"
          />
          <span className="text-white">{leverage}x</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setSide("long")} className={`px-4 py-2 rounded-md ${side === "long" ? "bg-green-500" : "bg-gray-500"}`}>
            Long
          </button>
          <button onClick={() => setSide("short")} className={`px-4 py-2 rounded-md ${side === "short" ? "bg-red-500" : "bg-gray-500"}`}>
            Short
          </button>
        </div>
        <button onClick={handleTrade} className="bg-blue-500 px-4 py-2 rounded-md text-white">
          Execute Trade
        </button>
      </div>
    </div>
  );
}
