"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Token {
  symbol: string
  name: string
  logo: string
  address?: string
  decimals?: number
  chainId?: number
}

interface TokenSelectorProps {
  onSelect: (token: Token) => void
  selectedToken?: Token
  excludeToken?: Token
  className?: string
}

const mockTokens: Token[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    chainId: 1
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    decimals: 8,
    chainId: 1
  },
  {
    symbol: "USDT",
    name: "Tether",
    logo: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    decimals: 6,
    chainId: 1
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    logo: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
    chainId: 1
  },
  {
    symbol: "DAI",
    name: "Dai",
    logo: "https://assets.coingecko.com/coins/images/9956/large/4943.png",
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    decimals: 18,
    chainId: 1
  },
]

export function TokenSelector({ 
  onSelect, 
  selectedToken, 
  excludeToken,
  className 
}: TokenSelectorProps) {
  const [search, setSearch] = useState("")
  
  const filteredTokens = useMemo(() => {
    return mockTokens
      .filter((token) => token.symbol !== excludeToken?.symbol)
      .filter(
        (token) =>
          token.symbol.toLowerCase().includes(search.toLowerCase()) ||
          token.name.toLowerCase().includes(search.toLowerCase())
      )
  }, [search, excludeToken])

  const handleSelect = (token: Token) => {
    setSearch("")
    onSelect(token)
  }

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="relative">
        <Search 
          className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" 
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search tokens..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-background px-8",
            "py-2 text-sm ring-offset-background",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
      </div>
      <ScrollArea className="h-[300px] rounded-md border p-2">
        <div className="space-y-1">
          {filteredTokens.map((token) => (
            <button
              key={token.symbol}
              onClick={() => handleSelect(token)}
              className={cn(
                "flex w-full items-center space-x-2 rounded-md p-2",
                "text-sm transition-colors hover:bg-accent",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-ring focus-visible:ring-offset-2",
                selectedToken?.symbol === token.symbol && "bg-accent",
              )}
            >
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src={token.logo}
                  alt={token.name}
                  width={24}
                  height={24}
                  className="object-cover"
                  unoptimized // Добавляем это для внешних изображений
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-medium">{token.symbol}</span>
                <span className="text-xs text-muted-foreground">
                  {token.name}
                </span>
              </div>
              {selectedToken?.symbol === token.symbol && (
                <div className="ml-auto">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
