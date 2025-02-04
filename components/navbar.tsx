"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  BarChart2,
  Droplet,
  RefreshCw,
  BracketsIcon as Bridge,
  Send,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { WalletConnect } from "./wallet-connect";
import { motion } from "framer-motion";
import styles from "@/styles/navbar.module.css"; // ✅ Импорт стилей

const navItems = [
  { id: "swap", icon: ArrowLeftRight, label: "Swap", href: "/" },
  { id: "trade", icon: BarChart2, label: "Trade", href: "/trade" },
  { id: "pool", icon: Droplet, label: "Pool", href: "/pool" },
  { id: "arbitrage", icon: RefreshCw, label: "Arbitrage", href: "/arbitrage" },
  { id: "bridge", icon: Bridge, label: "Bridge", href: "/bridge" },
  { id: "transfer", icon: Send, label: "Transfer", href: "/transfer" },
  { id: "cards", icon: CreditCard, label: "Cards", href: "/cards" },
  { id: "buy", icon: DollarSign, label: "Buy", href: "/buy" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.navbar}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center group">
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full transform transition-transform duration-300 hover:scale-105"
              >
                <defs>
                  <radialGradient id="backgroundGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0A0B2E" stopOpacity="1" />
                    <stop offset="100%" stopColor="#020214" stopOpacity="1" />
                  </radialGradient>
                  <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4A90E2" stopOpacity="0" />
                  </radialGradient>
                  <filter id="orbitsGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="particleGlow">
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                </defs>
                <circle cx="150" cy="150" r="145" fill="url(#backgroundGlow)" />
                <circle cx="150" cy="150" r="142" stroke="#4A90E2" strokeWidth="0.5" fill="none" opacity="0.2" />
                <g transform="translate(150,150)">
                  <circle r="30" fill="url(#centerGlow)" opacity="0.5" />
                  <g fill="none" stroke="#FFFFFF" strokeWidth="1.5">
                    <circle r="22" />
                    <path d="M0,-22 L19,11 L-19,11 Z" />
                    <path d="M-15,-15 L15,15 M-15,15 L15,-15" />
                  </g>
                </g>
              </svg>
            </div>
            <span className="text-xl font-bold text-white drop-shadow-lg hidden sm:inline-block">
              QuantumDEX
            </span>
          </div>

          <nav className="flex space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group px-2 py-2 sm:px-3 sm:py-2 rounded-md transition-all duration-300 relative ${
                    isActive ? "bg-[#4A90E2]/30 text-white" : "text-gray-300 hover:bg-[#4A90E2]/20 hover:text-white"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <Icon
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isActive ? "text-white scale-110" : "text-gray-300 group-hover:scale-110"
                      }`}
                    />
                    <span className="text-xs mt-1 hidden sm:inline-block">{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-[#7A88FF]/20 rounded-md z-0"
                      layoutId="activeNavItem"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <WalletConnect />
        </div>
      </div>
    </div>
  );
};
