// wallet-connect.tsx
'use client';

import { useWeb3Modal } from '@web3modal/react';
import { Button } from './ui/button'; // Assuming this is a custom UI component
import { useAccount, useDisconnect } from 'wagmi';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export function WalletConnect() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch errors in Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-300">
          {/* Shorten the address for display */}
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </span>
        <Button
          onClick={() => disconnect()}
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full bg-[#4A90E2]/20 hover:bg-[#4A90E2]/30"
        >
          <LogOut className="h-4 w-4 text-[#7A88FF]" />
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => open()} className="bg-[#4A90E2] hover:bg-[#4A90E2]/90">
      Connect Wallet
    </Button>
  );
}