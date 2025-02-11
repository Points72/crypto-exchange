"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

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

export default function QuantumBackground() {
  const canvasRef = useRef(null as HTMLCanvasElement | null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Создаем функцию инициализации с гарантированно не-null canvas и ctx
    const initCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles: ParticleType[] = [];
      const particleCount = 150;

      class Particle implements ParticleType {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        color: string;
        connections: ParticleType[];

        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.speedX = Math.random() * 3 - 1.5;
          this.speedY = Math.random() * 3 - 1.5;
          this.color = `hsl(220, ${Math.random() * 50 + 50}%, ${Math.random() * 30 + 50}%)`;
          this.connections = [];
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

          this.connections = particles.filter(
            (p) => Math.hypot(this.x - p.x, this.y - p.y) < 100 && p !== this
          );
        }

        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();

          this.connections.forEach((p) => {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 0.1;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          });
        }
      }

      function init() {
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      }

      function animate() {
        ctx.fillStyle = "rgba(10, 11, 30, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });

        requestAnimationFrame(animate);
      }

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
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
          particle.color = `hsl(220, ${Math.random() * 50 + 50}%, ${Math.random() * 30 + 70}%)`;
          particles.push(particle);

          // Ограничиваем количество частиц
          if (particles.length > particleCount * 1.5) {
            particles.splice(0, 3);
          }
        }
      };

      window.addEventListener("resize", handleResize);
      canvas.addEventListener("mousemove", handleMouseMove);

      init();
      animate();

      return () => {
        window.removeEventListener("resize", handleResize);
        canvas.removeEventListener("mousemove", handleMouseMove);
      };
    };

    // Запускаем инициализацию с гарантированно не-null значениями
    return initCanvas(canvas, ctx);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}