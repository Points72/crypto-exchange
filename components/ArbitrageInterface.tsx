"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Activity,
  Search,
  ArrowRight,
  Bot
} from 'lucide-react';
import { findArbitrageOpportunities, type ArbitrageOpportunity } from '@/lib/arbitrage';
import { type Exchange, createExchangeAPI } from '@/lib/exchange-api';
import { useDebounce } from '@/hooks/useDebounce';
import { useMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export function ArbitrageInterface() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'bots'>('scanner');
  const [searchTerm, setSearchTerm] = useState('');
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const debouncedSearch = useDebounce(searchTerm, 300);

  const exchanges = useMemo<Exchange[]>(() => [
    createExchangeAPI('bingx', {
      apiKey: process.env.NEXT_PUBLIC_BINGX_API_KEY || '',
      apiSecret: process.env.NEXT_PUBLIC_BINGX_API_SECRET || ''
    }),
    createExchangeAPI('bybit', {
      apiKey: process.env.NEXT_PUBLIC_BYBIT_API_KEY || '',
      apiSecret: process.env.NEXT_PUBLIC_BYBIT_API_SECRET || ''
    }),
    createExchangeAPI('mexc', {
      apiKey: process.env.NEXT_PUBLIC_MEXC_API_KEY || '',
      apiSecret: process.env.NEXT_PUBLIC_MEXC_API_SECRET || ''
    }),
    createExchangeAPI('kucoin', {
      apiKey: process.env.NEXT_PUBLIC_KUCOIN_API_KEY || '',
      apiSecret: process.env.NEXT_PUBLIC_KUCOIN_API_SECRET || '',
      passphrase: process.env.NEXT_PUBLIC_KUCOIN_PASSPHRASE
    }),
    createExchangeAPI('okx', {
      apiKey: process.env.NEXT_PUBLIC_OKX_API_KEY || '',
      apiSecret: process.env.NEXT_PUBLIC_OKX_API_SECRET || '',
      passphrase: process.env.NEXT_PUBLIC_OKX_PASSPHRASE
    })
  ], []);

  const symbols = useMemo(() => ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'], []);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await findArbitrageOpportunities(exchanges, symbols);
        setOpportunities(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpportunities();
    const interval = setInterval(fetchOpportunities, 10000);

    return () => clearInterval(interval);
  }, [exchanges, symbols]);

  const filteredOpportunities = opportunities.filter(opp => 
    opp.pair.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    opp.fromExchange.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    opp.toExchange.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <ResizablePanelGroup direction={isMobile ? 'vertical' : 'horizontal'}>
      <ResizablePanel defaultSize={60}>
        <div className="bg-[#0A0B1E] p-6 rounded-xl h-full">
          <h2 className="text-xl font-bold mb-4 text-[#7A88FF]">Arbitrage</h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 justify-center ${
                activeTab === 'scanner'
                  ? 'bg-blue-500/20 text-blue-500'
                  : 'bg-[#1A1B3E] text-gray-400'
              }`}
            >
              <Activity size={18} />
              Scanner
            </button>
            <button
              onClick={() => setActiveTab('bots')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 justify-center ${
                activeTab === 'bots'
                  ? 'bg-blue-500/20 text-blue-500'
                  : 'bg-[#1A1B3E] text-gray-400'
              }`}
            >
              <Bot size={18} />
              Bots
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder={activeTab === 'scanner' ? "Search pairs..." : "Search bots..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1A1B3E] p-2 pl-9 rounded-lg text-sm"
            />
            <Search className="absolute left-2 top-2 text-gray-400" size={16} />
          </div>

          {/* Content */}
          <ScrollArea className="h-[calc(100vh-250px)]">
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
              </div>
            ) : error ? (
              <div className="text-red-500 p-4">{error}</div>
            ) : (
              <div className="space-y-2">
                {filteredOpportunities.map((opp, idx) => (
                  <div key={idx} className="bg-[#1A1B3E] p-3 rounded-lg text-sm">
                    <div className="flex flex-wrap items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">{opp.fromExchange}</span>
                        <ArrowRight size={16} className="text-blue-500" />
                        <span className="text-gray-400">{opp.toExchange}</span>
                      </div>
                      <div className="text-green-500">+{opp.priceDiff.toFixed(8)}%</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Pair: </span>
                        <span className="text-white">{opp.pair}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Volume 24h: </span>
                        <span className="text-white">${opp.volume24h.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </ResizablePanel>

      <ResizablePanel defaultSize={40}>
        <div ref={chartContainerRef} className="w-full h-full" />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}