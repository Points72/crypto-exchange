"use client"

import { TradeSection } from "@/components/trade-section"
import dynamic from "next/dynamic"

const TradingViewWidget = dynamic(() => import("@/components/TradingViewWidget"), {
  ssr: false,
})

export default function TradePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#7A88FF] to-[#4A90E2]">
        Trade
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0A0B1E]/70 backdrop-blur-xl rounded-xl p-6 border border-[#4A90E2]/30 shadow-lg hover:shadow-[#7A88FF]/30 transition-all duration-500">
          <div className="h-[600px]">
            <TradingViewWidget />
          </div>
        </div>
        <div className="lg:col-span-1">
          <TradeSection />
        </div>
      </div>
    </div>
  )
}

