"use client"

import { useState, useEffect } from "react"

interface PoolInfo {
  id: number
  pair: string
  liquidity: number
  apy: number
  volume24h: number
}

export function PoolSection() {
  const [pools, setPools] = useState<PoolInfo[]>([])

  useEffect(() => {
    // Simulating fetching data about liquidity pools
    const generatePools = () => {
      const newPools: PoolInfo[] = []
      const pairs = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "ADA/USDT", "DOT/USDT"]

      for (let i = 0; i < 5; i++) {
        newPools.push({
          id: i,
          pair: pairs[i],
          liquidity: +(Math.random() * 10000000).toFixed(2),
          apy: +(Math.random() * 100).toFixed(2),
          volume24h: +(Math.random() * 5000000).toFixed(2),
        })
      }

      return newPools
    }

    setPools(generatePools())

    const interval = setInterval(() => {
      setPools((prevPools) =>
        prevPools.map((pool) => ({
          ...pool,
          liquidity: +(pool.liquidity * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2),
          apy: +(pool.apy * (1 + (Math.random() - 0.5) * 0.05)).toFixed(2),
          volume24h: +(pool.volume24h * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2),
        })),
      )
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#0A0B1E]/70 backdrop-blur-xl rounded-xl p-6 border border-[#4A90E2]/30 shadow-lg hover:shadow-[#7A88FF]/30 transition-all duration-500">
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#7A88FF] to-[#4A90E2] animate-pulse">
        Liquidity Pools
      </h2>
      <div className="space-y-4">
        {pools.map((pool) => (
          <div
            key={pool.id}
            className="bg-[#1A1B3E]/50 p-4 rounded-lg hover:bg-[#1A1B3E]/70 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="text-[#4A90E2]">{pool.pair}</span>
              <span className="text-green-400">{pool.apy}% APY</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">Liquidity: ${pool.liquidity.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Volume (24h): ${pool.volume24h.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

