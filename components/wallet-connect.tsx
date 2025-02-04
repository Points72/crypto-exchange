"use client"

import { useState, useEffect } from "react"
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react"
import { WagmiConfig } from "wagmi"
import { arbitrum, mainnet, polygon } from "viem/chains"
import { LogOut } from "lucide-react"
import { useAccount, useDisconnect } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""
if (!projectId) {
  console.error("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set")
}

const metadata = {
  name: "QuantumDEX",
  description: "Next-gen decentralized exchange",
  url: "https://quantumdex.com", // TODO: обновите URL вашего сайта
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

// Приводим массив chains к типу tuple с помощью "as const"
const chains = [arbitrum, mainnet, polygon] as const
const queryClient = new QueryClient()

export function WalletConnectProvider({ children }: { children: ReactNode }) {
  const [wagmiConfig, setWagmiConfig] = useState<any>(null)

  useEffect(() => {
    if (!projectId) {
      console.error("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set")
      return
    }

    const config = defaultWagmiConfig({ chains, projectId, metadata })
    setWagmiConfig(config)
    createWeb3Modal({ wagmiConfig: config, projectId })
  }, [])

  if (!wagmiConfig) return null

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiConfig>
  )
}

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-300">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <button
          onClick={() => disconnect()}
          className="p-2 rounded-full bg-[#4A90E2]/20 hover:bg-[#4A90E2]/30 transition-colors duration-300"
          title="Disconnect wallet" // Можно оставить для браузерной подсказки, если требуется
        >
          <LogOut className="w-4 h-4 text-[#7A88FF]" />
        </button>
      </div>
    )
  }

  return <w3m-button label="Connect Wallet" />
}
