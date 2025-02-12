'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, arbitrum } from '@reown/appkit/networks';
import type { AppKitNetwork } from '@reown/appkit-common';
import type { Metadata } from '@reown/appkit-core';
import { useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] });

// Настраиваем QueryClient с оптимизированными параметрами для Web3 приложения
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const projectId = '2bb3b16994fef5232896dac751558dc2';


// Определяем сети в соответствии с требуемым типом [AppKitNetwork, ...AppKitNetwork[]]
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, arbitrum];

// Создаем адаптер с правильно типизированными сетями
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
});

// Создаем конфигурацию AppKit с полным набором опций
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  features: {
    analytics: true
  },
  // Добавляем дополнительные опции из AppKitOptions
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#4F46E5',
    '--w3m-accent': '#4F46E5',
    '--w3m-border-radius-master': '4px'
  },
  allowUnsupportedChain: false,
  defaultNetwork: mainnet,
  showWallets: true
});

// Определяем интерфейс для частиц в анимированном фоне
interface ParticleType {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  connections: ParticleType[];
  update: () => void;
  draw: () => void;
}

// Компонент анимированного фона
function QuantumBackground(): JSX.Element {
  // Используем refs для хранения ссылок на canvas и частицы
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<ParticleType[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Реализация частицы с типизацией
    class ParticleImpl implements ParticleType {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      connections: ParticleType[] = [];

      constructor() {
        // Perform null checks *inside* the constructor.
        if (canvas) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        } else {
          // Provide fallback values if canvas is null (very unlikely, but satisfies TypeScript)
          this.x = 0;
          this.y = 0;
        }
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(220, ${Math.random() * 50 + 50}%, ${Math.random() * 30 + 50}%)`;
      }

      update(): void {
        this.x += this.speedX;
        this.y += this.speedY;

        // Check canvas here!  Use canvasRef.current since we are inside a method.
        if (canvasRef.current) {
            if (this.x < 0 || this.x > canvasRef.current.width) {
                this.speedX *= -1;
            }
            if (this.y < 0 || this.y > canvasRef.current.height) {
                this.speedY *= -1;
            }
        }

        this.connections = particlesRef.current?.filter(
          (p: ParticleType) => Math.hypot(this.x - p.x, this.y - p.y) < 100 && p !== this
        ) ?? [];
      }

      draw(): void {
        if (!ctx) return;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        this.connections.forEach((p: ParticleType) => {
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 0.1;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        });
      }
    }

    // Инициализация системы частиц
    function init(): void {
      particlesRef.current = Array.from(
        { length: 150 },
        () => new ParticleImpl()
      );
    }

    // Функция анимации
    function animate(): void {
      if (!canvas || !ctx) return;

      ctx.fillStyle = 'rgba(10, 11, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current?.forEach((particle: ParticleType) => {
        particle.update();
        particle.draw();
      });
    }

    // Обработчик изменения размера окна
    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    // Обработчик движения мыши
    const handleMouseMove = (event: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      for (let i = 0; i < 3; i++) {
          const particle = new ParticleImpl();
          particle.x = x;
          particle.y = y;
          particle.size = Math.random() * 5 + 2;
          particle.speedX = Math.random() * 5 - 2.5;
          particle.speedY = Math.random() * 5 - 2.5;
          particlesRef.current?.push(particle);
      }
    };

    // Запускаем анимацию
    init();
    animate();

    // Добавляем обработчики событий
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    // Очистка при размонтировании компонента
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

// Корневой компонент приложения
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
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