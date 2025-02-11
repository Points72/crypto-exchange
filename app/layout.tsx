'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import type { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { configureChains, createConfig, mainnet, arbitrum } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { WagmiConfig } from 'wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { walletConnectProvider } from '@web3modal/wagmi';
import { EthereumClient } from '@web3modal/ethereum';
import { useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] });

// 1. Configure chains and providers
const projectId = '2bb3b16994fef5232896dac751558dc2'; // Replace with your Project ID

const { chains, publicClient } = configureChains(
  [mainnet, arbitrum],
  [walletConnectProvider({ projectId }), publicProvider()]
);

// 2. Create wagmiConfig
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [],
  publicClient
});

// 3. Create ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

// 4. Create Web3Modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeVariables: {
    '--w3m-accent': '#4F46E5'
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function QuantumBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      connections: Particle[] = [];

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(220, ${Math.random() * 50 + 50}%, ${
          Math.random() * 30 + 50
        }%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas!.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.speedY *= -1;
        this.connections = particlesRef.current.filter(
          (p: Particle) => Math.hypot(this.x - p.x, this.y - p.y) < 100 && p !== this
        );
      }

      draw() {
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();

        this.connections.forEach((p: Particle) => {
          ctx!.strokeStyle = this.color;
          ctx!.lineWidth = 0.1;
          ctx!.beginPath();
          ctx!.moveTo(this.x, this.y);
          ctx!.lineTo(p.x, p.y);
          ctx!.stroke();
        });
      }
    }

    const init = () => {
      particlesRef.current = [];
      for (let i = 0; i < 150; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.fillStyle = 'rgba(10, 11, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle: Particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = [];
      init();
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      for (let i = 0; i < 3; i++) {
        const particle = new Particle();
        particle.x = x;
        particle.y = y;
        particle.size = Math.random() * 5 + 2;
        particle.speedX = Math.random() * 5 - 2.5;
        particle.speedY = Math.random() * 5 - 2.5;
        particlesRef.current.push(particle);
      }
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <div className="min-h-screen relative overflow-hidden bg-[#0A0B1E] text-white font-mono">
              <QuantumBackground />
              <div className="relative z-10">
                <Navbar />
                <main>{children}</main>
              </div>
            </div>
          </QueryClientProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}