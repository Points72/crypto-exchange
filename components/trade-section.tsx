"use client"

import { useState, useEffect } from "react"

export const TradeSection = () => {
  const [position, setPosition] = useState<"long" | "short">("long")
  const [amount, setAmount] = useState("")
  const [marketInfo, setMarketInfo] = useState({
    volume: 12500000,
    high: 248.0,
    low: 204.0,
  })

  const handlePositionChange = (newPosition: "long" | "short") => {
    setPosition(newPosition)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketInfo((prevInfo) => ({
        volume: prevInfo.volume + (Math.random() - 0.5) * 1000000,
        high: prevInfo.high + (Math.random() - 0.5) * 2,
        low: prevInfo.low + (Math.random() - 0.5) * 2,
      }))
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-medium mb-6">Trade with Leverage</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Pair</span>
            <select className="bg-slate-700 rounded p-2">
              <option>BTC/USDT</option>
              <option>ETH/USDT</option>
              <option>SOL/USDT</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Position</span>
            <div className="flex">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-l"
                onClick={() => handlePositionChange("long")}
              >
                Long
              </button>
              <button
                className="bg-slate-700 text-white px-4 py-2 rounded-r"
                onClick={() => handlePositionChange("short")}
              >
                Short
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Leverage</span>
            <select className="bg-slate-700 rounded p-2">
              <option>1x</option>
              <option>5x</option>
              <option>10x</option>
              <option>20x</option>
              <option>50x</option>
              <option>100x</option>
            </select>
          </div>
          <div className="bg-slate-700 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Amount (USDT)</span>
              <span className="text-sm text-gray-400">Balance: 1000 USDT</span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="w-full bg-transparent text-lg focus:outline-none"
              placeholder="0"
            />
          </div>
          <button className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-500 transition-colors">
            Open Position
          </button>
        </div>
      </div>
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-medium mb-4">Market Info (Real-time)</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">24h Volume</span>
            <span>${marketInfo.volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">24h High</span>
            <span>${marketInfo.high.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">24h Low</span>
            <span>${marketInfo.low.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

