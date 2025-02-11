'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { mainnet, arbitrum } from 'wagmi/chains';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] });

// 1. Setup project ID and chains
const projectId = '2bb3b16994fef5232896dac751558dc2'; // Replace with your Project ID
const chains = [mainnet, arbitrum] as const;

// 2. Create wagmiConfig
const metadata = {
  name: 'Quantum Exchange',
  description: 'Quantum Exchange Platform',
  url: 'crypto-exchange-git-main-melania.vercel.app',
  icons: ['https://github.com/Points72/crypto-exchange/blob/main/public/final-quantum-logo%20(1).svg'],
};

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata
});

// 3. Create Web3Modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeVariables: {
    '--w3m-color-mix': '#4F46E5',
    '--w3m-accent': '#4F46E5',
    '--w3m-border-radius-master': '4px'
  }
});

const queryClient = new QueryClient();

function QuantumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      particlesRef.current = Array.from({ length: 150 }, () => new Particle());
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (event: MouseEvent) => {
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
      animationFrameRef.current && cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <div className="min-h-screen relative overflow-hidden bg-[#0A0B1E] text-white font-mono">
              <QuantumBackground />
              <div className="relative z-10">
                <Navbar />
                <main>{children}</main>
              </div>
            </div>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}