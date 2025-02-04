"use client"

import { useState, useEffect } from "react"

interface ArbitrageOpportunity {
  id: number
  fromExchange: string
  toExchange: string
  pair: string
  profit: number
  volume: number
}

export function ArbitrageSection() {
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([])

  useEffect(() => {
    // Имитация получения данных об арбитражных возможностях
    const generateOpportunities = () => {
      const newOpportunities: ArbitrageOpportunity[] = []
      const exchanges = ["Binance", "Coinbase", "Kraken", "Huobi"]
      const pairs = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "ADA/USDT"]

      for (let i = 0; i < 5; i++) {
        newOpportunities.push({
          id: i,
          fromExchange: exchanges[Math.floor(Math.random() * exchanges.length)],
          toExchange: exchanges[Math.floor(Math.random() * exchanges.length)],
          pair: pairs[Math.floor(Math.random() * pairs.length)],
          profit: +(Math.random() * 2).toFixed(2),
          volume: +(Math.random() * 100000).toFixed(2),
        })
      }

      return newOpportunities
    }

    setOpportunities(generateOpportunities())

    const interval = setInterval(() => {
      setOpportunities(generateOpportunities())
    }, 5000) // Обновление каждые 5 секунд

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#0A0B1E]/70 backdrop-blur-xl rounded-xl p-6 border border-[#4A90E2]/30 shadow-lg hover:shadow-[#7A88FF]/30 transition-all duration-500">
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#7A88FF] to-[#4A90E2] animate-pulse">
        Arbitrage Opportunities
      </h2>
      <div className="space-y-4">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="bg-[#1A1B3E]/50 p-4 rounded-lg hover:bg-[#1A1B3E]/70 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="text-[#4A90E2]">{opp.pair}</span>
              <span className="text-green-400">+{opp.profit}%</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {opp.fromExchange} → {opp.toExchange}
            </div>
            <div className="text-sm text-gray-400">Volume: ${opp.volume.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

