'use client'

import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config, wagmiAdapter, projectId, networks } from '../config'

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'ClaudeDex',
    description: 'DEX Exchange',
    uri: 'https://cryptopoint.am', 
    icons: ['https://assets.reown.com/reown-profile-pic.png']
  }
})

export function ContextProvider({ children }) {
  const queryClient = new QueryClient()
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}