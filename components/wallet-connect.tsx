'use client';

import { useWeb3Modal } from '@web3modal/react';
import { Button } from './ui/button';
import { useAccount, useDisconnect } from 'wagmi';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils'; // Assuming you have utility class helper

export function WalletConnect() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <Button disabled className="bg-gray-500 animate-pulse">
      Loading...
    </Button>
  );

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </span>
        <Button
          onClick={() => disconnect()}
          size="icon"
          variant="outline"
          className={cn(
            "h-8 w-8 rounded-full",
            "transition-colors hover:bg-destructive/20",
            "border border-destructive/30 hover:border-destructive/50"
          )}
          aria-label="Disconnect wallet"
        >
          <LogOut className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={() => open()}
      className={cn(
        "bg-primary text-primary-foreground",
        "hover:bg-primary/90",
        "transition-colors duration-200"
      )}
    >
      Connect Wallet
    </Button>
  );
}