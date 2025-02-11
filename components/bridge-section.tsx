"use client"

import { useState } from "react"

export const BridgeSection = () => {
  const [fromChain, setFromChain] = useState("Ethereum")
  const [toChain, setToChain] = useState("Polygon")

  const chains = [
    {
      name: "Ethereum",
      icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      tokens: ["ETH", "USDT", "USDC"],
      gas: "25 GWEI",
      time: "~15 min",
    },
    {
      name: "Polygon",
      icon: "https://cryptologos.cc/logos/polygon-matic-logo.png",
      tokens: ["MATIC", "USDT", "USDC"],
      gas: "80 GWEI",
      time: "~5 min",
    },
    {
      name: "BSC",
      icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
      tokens: ["BNB", "USDT", "USDC"],
      gas: "5 GWEI",
      time: "~3 min",
    },
    {
      name: "Arbitrum",
      icon: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
      tokens: ["ETH", "USDT", "USDC"],
      gas: "0.1 GWEI",
      time: "~10 min",
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-6">Bridge Assets</h2>

          <div className="space-y-6">
            {/* ✅ Исправленный Select с Label */}
            <div className="bg-slate-700 p-4 rounded-lg">
              <label htmlFor="from-chain" className="text-sm text-gray-400">
                From Network
              </label>
              <select
                id="from-chain"
                value={fromChain}
                onChange={(e) => setFromChain(e.target.value)}
                className="w-full bg-slate-600 rounded-lg px-4 py-2 mt-2"
                aria-label="Select source blockchain"
              >
                {chains.map((chain) => (
                  <option key={chain.name} value={chain.name}>
                    {chain.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap button */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  const temp = fromChain
                  setFromChain(toChain)
                  setToChain(temp)
                }}
                className="bg-slate-700 p-2 rounded-lg hover:bg-slate-600"
              >
                ↑↓
              </button>
            </div>

            {/* ✅ Второй Select исправлен */}
            <div className="bg-slate-700 p-4 rounded-lg">
              <label htmlFor="to-chain" className="text-sm text-gray-400">
                To Network
              </label>
              <select
                id="to-chain"
                value={toChain}
                onChange={(e) => setToChain(e.target.value)}
                className="w-full bg-slate-600 rounded-lg px-4 py-2 mt-2"
                aria-label="Select destination blockchain"
              >
                {chains.map((chain) => (
                  <option key={chain.name} value={chain.name}>
                    {chain.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="w-full bg-violet-600 py-3 rounded-lg hover:bg-violet-500 transition-colors">
              Bridge Assets
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
