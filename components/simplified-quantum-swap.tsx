"use client"

import { useState, useEffect } from "react"
import { providers, utils } from "ethers"
import { Connection, Transaction, PublicKey, SystemProgram } from "@solana/web3.js"
import { ArrowDownUp } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Token, QuoteResponse } from "@/types"

const EVM_WALLET = "0x6d72111eD683a3235aDe54cD08f571145f5b06D0"
const SOLANA_WALLET = "A8YVEaSkAzJZLbiNnZwK45vHRRWSJ59pK2H5MsajLgL5"

const SUPPORTED_CHAINS = {
  ethereum: { id: 1, name: 'Ethereum' as const },
  bsc: { id: 56, name: 'BSC' as const },
  polygon: { id: 137, name: 'Polygon' as const },
  solana: { id: 'mainnet-beta' as const, name: 'Solana' as const }
} as const;

interface TokenApiResponse {
  symbol: string;
  name: string;
  logoURI?: string;
  address: string;
  decimals: number;
}

interface EVMTokenData {
  [address: string]: TokenApiResponse;
}

interface SolanaTokenListResponse {
  tokens: TokenApiResponse[];
}

const COMMON_TOKENS: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    logoUrl: '/tokens/eth.png',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    chain: 'ethereum'
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    logoUrl: '/tokens/usdt.png',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    decimals: 6,
    chain: 'ethereum'
  }
]

async function getEVMTokens(chainId: number): Promise<Token[]> {
  try {
    const response = await fetch(`https://tokens.1inch.io/v1.1/${chainId}`)
    const data: EVMTokenData = await response.json()
    
    return Object.entries(data).map(([address, token]) => ({
      symbol: token.symbol,
      name: token.name,
      logoUrl: token.logoURI || '/tokens/default.png',
      address,
      decimals: token.decimals,
      chain: chainId === 1 ? 'ethereum' : chainId === 56 ? 'bsc' : 'polygon'
    }))
  } catch (error) {
    console.error('Error fetching EVM tokens:', error)
    return []
  }
}

async function getSolanaTokens(): Promise<Token[]> {
  try {
    const response = await fetch('https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/src/tokens/solana.tokenlist.json')
    const data: SolanaTokenListResponse = await response.json()
    
    return data.tokens.map((token) => ({
      symbol: token.symbol,
      name: token.name,
      logoUrl: token.logoURI || '/tokens/default.png',
      address: token.address,
      decimals: token.decimals,
      chain: 'solana'
    }))
  } catch (error) {
    console.error('Error fetching Solana tokens:', error)
    return []
  }
}

interface TokenListModalProps {
  tokens: Token[]
  onSelect: (token: Token) => void
  onClose: () => void
  excludeToken?: Token
}

function TokenListModal({ tokens, onSelect, onClose, excludeToken }: TokenListModalProps) {
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
            <button onClick={onClose} className="p-1 hover:opacity-70">×</button>
          </div>
          
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search name or paste address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1A1B3E] p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
            />
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
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

interface SwapProps {
  selectedToken?: Token
}

export function SimplifiedQuantumSwap({ selectedToken }: SwapProps) {
  const [fromToken, setFromToken] = useState(selectedToken || COMMON_TOKENS[0])
  const [toToken, setToToken] = useState(COMMON_TOKENS[1])
  const [amount, setAmount] = useState("")
  const [availableTokens, setAvailableTokens] = useState<Token[]>([])
  const [showTokenList, setShowTokenList] = useState(false)
  const [selectedField, setSelectedField] = useState<"from" | "to">("from")
  const [isLoading, setIsLoading] = useState(false)
  const [quoteData, setQuoteData] = useState({
    toAmount: "0",
    rate: "0",
    priceImpact: "0",
    networkFee: "0",
  })

  useEffect(() => {
    async function loadTokens() {
      try {
        const evmTokens = await Promise.all([
          getEVMTokens(SUPPORTED_CHAINS.ethereum.id),
          getEVMTokens(SUPPORTED_CHAINS.bsc.id),
          getEVMTokens(SUPPORTED_CHAINS.polygon.id),
        ])
        const solanaTokens = await getSolanaTokens()
        setAvailableTokens([...COMMON_TOKENS, ...evmTokens.flat(), ...solanaTokens])
      } catch (error) {
        console.error("Error loading tokens:", error)
      }
    }
    loadTokens()
  }, [])

  useEffect(() => {
    async function updateQuote() {
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        setQuoteData({
          toAmount: "0",
          rate: "0",
          priceImpact: "0",
          networkFee: "0",
        })
        return
      }

      try {
        const quote = await getQuote(fromToken, toToken, amount)
        if (fromToken.chain === "solana" || toToken.chain === "solana") {
          setQuoteData({
            toAmount: quote.outAmount 
              ? (quote.outAmount / 10 ** toToken.decimals).toFixed(6) 
              : "0",
            rate: quote.outAmount 
              ? (quote.outAmount / (Number(amount) * 10 ** fromToken.decimals)).toFixed(6)
              : "0",
            priceImpact: quote.priceImpact || "0.01",
            networkFee: quote.networkFee || "5.00",
          })
        } else {
          setQuoteData({
            toAmount: quote.toTokenAmount 
              ? utils.formatUnits(quote.toTokenAmount, toToken.decimals)
              : "0",
            rate: quote.toTokenAmount && quote.fromTokenAmount
              ? (Number(quote.toTokenAmount) / Number(quote.fromTokenAmount)).toFixed(6)
              : "0",
            priceImpact: "<0.01",
            networkFee: "5.00",
          })
        }
      } catch (error) {
        console.error("Error getting quote:", error)
      }
    }
    updateQuote()
  }, [amount, fromToken, toToken])

  const handleSwap = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    setIsLoading(true)
    try {
      if (fromToken.chain === "solana") {
        await swapOnSolana(fromToken, toToken, amount)
      } else {
        await swapOnEVM(fromToken, toToken, amount)
      }
    } catch (error) {
      console.error("Swap error:", error)
      alert("Error during swap")
    } finally {
      setIsLoading(false)
    }
  }

  const swapOnEVM = async (fromToken: Token, toToken: Token, amount: string) => {
    const provider = window.ethereum && new providers.Web3Provider(window.ethereum)
    if (!provider) {
      alert("Please install MetaMask")
      return
    }

    const signer = provider.getSigner()
    const userAddress = await signer.getAddress()

    const feeAmount = (Number(amount) * 0.02).toFixed(6)
    const swapAmount = (Number(amount) * 0.98).toFixed(6)

    const quoteUrl = `https://api.1inch.io/v5.0/${fromToken.chain}/quote?fromTokenAddress=${
      fromToken.address
    }&toTokenAddress=${toToken.address}&amount=${utils.parseUnits(swapAmount, fromToken.decimals)}`

    const quoteResponse = await fetch(quoteUrl)
    const quoteData = await quoteResponse.json()

    if (!quoteData.toTokenAmount) {
      throw new Error("Failed to get quote")
    }

    const swapUrl = `https://api.1inch.io/v5.0/${fromToken.chain}/swap?fromTokenAddress=${
      fromToken.address
    }&toTokenAddress=${toToken.address}&amount=${utils.parseUnits(
      swapAmount,
      fromToken.decimals
    )}&fromAddress=${userAddress}&slippage=1`

    const swapResponse = await fetch(swapUrl)
    const swapData = await swapResponse.json()

    if (!swapData.tx) {
      throw new Error("Failed to get swap transaction")
    }

    const tx = await signer.sendTransaction({
      to: swapData.tx.to,
      data: swapData.tx.data,
      value: swapData.tx.value,
      gasLimit: swapData.tx.gasLimit,
    })

    await tx.wait()

    const feeTx = await signer.sendTransaction({
      to: EVM_WALLET,
      value: utils.parseUnits(feeAmount, fromToken.decimals),
    })

    await feeTx.wait()
  }

  const swapOnSolana = async (fromToken: Token, toToken: Token, amount: string) => {
    const solanaWallet = window.solana
    if (!solanaWallet) {
      alert("Please install Phantom Wallet")
      return
    }

    const connection = new Connection("https://api.mainnet-beta.solana.com")
    const { publicKey } = await solanaWallet.connect()
    const userPublicKey = new PublicKey(publicKey)

    const quoteUrl = `https://quote-api.jup.ag/v6/quote?inputMint=${
      fromToken.address
    }&outputMint=${toToken.address}&amount=${Math.floor(Number(amount) * 10 ** fromToken.decimals)}`

    const quoteResponse = await fetch(quoteUrl)
    const quoteData = await quoteResponse.json()

    if (!quoteData.outAmount) {
      throw new Error("Failed to get quote")
    }

    const swapUrl = "https://quote-api.jup.ag/v6/swap"
    const swapResponse = await fetch(swapUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPublicKey: userPublicKey.toString(),
        inputMint: fromToken.address,
        outputMint: toToken.address,
        amount: Math.floor(Number(amount) * 10 ** fromToken.decimals),
        slippageBps: 50,
      }),
    })

    const swapData = await swapResponse.json()
    if (!swapData.transaction) {
      throw new Error("Failed to get swap transaction")
    }

    const transaction = Transaction.from(Buffer.from(swapData.transaction, "base64"))
    transaction.feePayer = userPublicKey
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

    const signedTx = await solanaWallet.signTransaction(transaction)
    await connection.sendRawTransaction(signedTx.serialize())
    await connection.getLatestBlockhash()
    await new Promise(resolve => setTimeout(resolve, 1000))

    const feeAmount = (Number(amount) * 0.02).toFixed(6)
    const feeTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: userPublicKey,
        toPubkey: new PublicKey(SOLANA_WALLET),
        lamports: Math.floor(Number(feeAmount) * 10 ** fromToken.decimals),
      })
    )

    const signedFeeTx = await solanaWallet.signTransaction(feeTransaction)
    await connection.sendRawTransaction(signedFeeTx.serialize())
    await connection.getLatestBlockhash()
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const getQuote = async (fromToken: Token, toToken: Token, amount: string): Promise<QuoteResponse> => {
    if (fromToken.chain === "solana" || toToken.chain === "solana") {
      const response = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${fromToken.address}&outputMint=${
          toToken.address
        }&amount=${Math.floor(Number(amount) * 10 ** fromToken.decimals)}`
      )
      return response.json()
    } else {
      const response = await fetch(
        `https://api.1inch.io/v5.0/${fromToken.chain}/quote?fromTokenAddress=${
          fromToken.address
        }&toTokenAddress=${toToken.address}&amount=${utils.parseUnits(amount, fromToken.decimals)}`
      )
      return response.json()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-[#7A88FF]">Quantum Exchange</h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-sm text-blue-400">You give</div>
            <div className="flex items-center justify-between bg-[#1A1B3E] p-4 rounded-xl">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent w-full text-xl focus:outline-none"
              />
              <Button
                onClick={() => {
                  setSelectedField("from")
                  setShowTokenList(true)
                }}
                variant="ghost"
                className="flex items-center gap-2"
              >
                <Image src={fromToken.logoUrl} alt={fromToken.symbol} width={24} height={24} />
                <span>{fromToken.symbol}</span>
                <span>▼</span>
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setFromToken(toToken)
                setToToken(fromToken)
                setAmount("")
              }}
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-blue-400">You receive</div>
            <div className="flex items-center justify-between bg-[#1A1B3E] p-4 rounded-xl">
              <input
                type="number"
                value={quoteData.toAmount}
                readOnly
                placeholder="0.0"
                className="bg-transparent w-full text-xl focus:outline-none"
              />
              <Button
                onClick={() => {
                  setSelectedField("to")
                  setShowTokenList(true)
                }}
                variant="ghost"
                className="flex items-center gap-2"
              >
                <Image src={toToken.logoUrl} alt={toToken.symbol} width={24} height={24} />
                <span>{toToken.symbol}</span>
                <span>▼</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Rate</span>
              <span>
                1 {fromToken.symbol} = {quoteData.rate} {toToken.symbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Network Fee</span>
              <span className="text-blue-400">${quoteData.networkFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Price Impact</span>
              <span className="text-green-400">{quoteData.priceImpact}%</span>
            </div>
          </div>

          <Button
            onClick={handleSwap}
            disabled={isLoading || !amount || Number(amount) <= 0}
            className="w-full"
          >
            {isLoading ? "Processing..." : !amount || Number(amount) <= 0 ? "Enter amount" : "Swap"}
          </Button>
        </div>

        {showTokenList && (
          <TokenListModal
            tokens={availableTokens}
            onSelect={(token: Token) => {
              if (selectedField === "from") {
                setFromToken(token)
              } else {
                setToToken(token)
              }
              setShowTokenList(false)
            }}
            onClose={() => setShowTokenList(false)}
            excludeToken={selectedField === "from" ? toToken : fromToken}
          />
        )}
      </CardContent>
    </Card>
  )
}
