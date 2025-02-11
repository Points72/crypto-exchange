"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import type { ReactNode } from "react";
import { createAppKit } from '@reown/appkit/react'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { useEffect, useRef } from "react";

// Определяем интерфейс для частиц, чтобы TypeScript понимал их структуру
interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    connections: Particle[];
    update: () => void;
    draw: () => void;
}

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
   defaultOptions: {
       queries: {
           staleTime: 1000 * 60 * 5,
           refetchOnWindowFocus: false,
       },
   },
});

const projectId = '2bb3b16994fef5232896dac751558dc2'

const metadata = {
   name: 'Quantum Exchange',
   description: 'Quantum Exchange Platform',
   url: 'https://quantum-exchange.com',
   uri: 'https://quantum-exchange.com',
   icons: ['https://quantum-exchange.com/icon.png']
} as const

// Правильно типизируем сети для AppKit
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, arbitrum]

const wagmiAdapter = new WagmiAdapter({
   networks,
   projectId,
   ssr: true
});

createAppKit({
   adapters: [wagmiAdapter],
   networks,
   projectId,
   metadata,
   features: {
       analytics: true
   }
})

function QuantumBackground() {
   const canvasRef = useRef<HTMLCanvasElement | null>(null);

   useEffect(() => {
       const canvas = canvasRef.current;
       if (!canvas) {
           console.error("Canvas element is null");
           return;
       }

       const ctx = canvas.getContext("2d");
       if (!ctx) {
           console.error("Canvas context is null");
           return;
       }

       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;

       const particles: Particle[] = [];
       const particleCount = 150

       class ParticleImpl implements Particle {
           x: number = 0;
           y: number = 0;
           size: number = 1;
           speedX: number = 0;
           speedY: number = 0;
           color: string = "";
           connections: Particle[] = [];

           constructor() {
               if (!canvas) return;
               this.x = Math.random() * canvas.width;
               this.y = Math.random() * canvas.height;
               this.size = Math.random() * 3 + 1;
               this.speedX = Math.random() * 3 - 1.5;
               this.speedY = Math.random() * 3 - 1.5;
               this.color = `hsl(220, ${Math.random() * 50 + 50}%, ${Math.random() * 30 + 50}%)`;
           }

           update() {
               if (!canvas) return;
               this.x += this.speedX;
               this.y += this.speedY;
               if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
               if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
               this.connections = particles.filter((p) => (
                   Math.hypot(this.x - p.x, this.y - p.y) < 100 && p !== this
               ));
           }

           draw() {
               if (!ctx) return;
               ctx.fillStyle = this.color;
               ctx.beginPath();
               ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
               ctx.fill();

               this.connections.forEach(p => {
                   ctx.strokeStyle = this.color;
                   ctx.lineWidth = 0.1;
                   ctx.beginPath();
                   ctx.moveTo(this.x, this.y);
                   ctx.lineTo(p.x, p.y);
                   ctx.stroke()
               })
           }
       }

       function init() {
           for (let i = 0; i < particleCount; i++) {
               particles.push(new ParticleImpl());
           }
       }

       function animate() {
           if (!canvas || !ctx) return
           ctx.fillStyle = "rgba(10, 11, 30, 0.1)";
           ctx.fillRect(0, 0, canvas.width, canvas.height);

           for (let i = 0; i < particles.length; i++) {
               particles[i].update();
               particles[i].draw();
           }
           requestAnimationFrame(animate);
       }

       init();
       animate();

       const handleResize = () => {
           if (!canvas) return;
           canvas.width = window.innerWidth;
           canvas.height = window.innerHeight;
       }

       const handleMouseMove = (event: MouseEvent) => {
           if (!canvas) return;
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
               particle.color = `hsl(220, ${Math.random() * 50 + 50}%, ${Math.random() * 30 + 70}%)`;
               particles.push(particle);
           }
       }

       window.addEventListener("resize", handleResize);
       canvas.addEventListener("mousemove", handleMouseMove)

       return () => {
           window.removeEventListener("resize", handleResize);
           canvas.removeEventListener("mousemove", handleMouseMove);
       };
   }, []);

   return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}

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