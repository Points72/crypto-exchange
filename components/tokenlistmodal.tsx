import { Token } from '@/lib/tokens'
import { Search, X } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface TokenListModalProps {
  tokens: Token[]
  onSelect: (token: Token) => void
  onClose: () => void
  excludeToken?: Token
}

export function TokenListModal({ tokens, onSelect, onClose, excludeToken }: TokenListModalProps) {
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const filteredTokens = tokens.filter(token => 
    token.address !== excludeToken?.address && (
      token.symbol.toLowerCase().includes(search.toLowerCase()) ||
      token.name.toLowerCase().includes(search.toLowerCase())
    )
  )

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-x-4 top-[50%] translate-y-[-50%] max-w-sm mx-auto z-50">
        <div className="rounded-xl bg-[#0A0B1E] p-6 border border-[#4A90E2]/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Select Token</h2>
            <button onClick={onClose} className="p-1 hover:opacity-70">
              <X size={20} />
            </button>
          </div>
          
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search name or paste address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1A1B3E] p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto space-y-2">
            {filteredTokens.map((token) => (
              <button
                key={`${token.chain}-${token.address}`}
                onClick={() => onSelect(token)}
                className="w-full flex items-center gap-3 p-3 hover:bg-[#1A1B3E] rounded-lg"
              >
                <Image
                  src={token.logoUrl}
                  alt={token.symbol}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="text-left">
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-sm text-gray-400">{token.name}</div>
                </div>
                <div className="ml-auto text-sm text-gray-400">
                  {token.chain}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
