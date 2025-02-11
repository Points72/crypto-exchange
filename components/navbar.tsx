"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowLeftRight,
  BarChart2,
  Droplet,
  RefreshCw,
  BracketsIcon as Bridge,
  Send,
  CreditCard,
  DollarSign,
} from "lucide-react"
import { WalletConnect } from "./wallet-connect"
import { motion } from "framer-motion"

const navItems = [
  { id: "swap", icon: ArrowLeftRight, label: "Swap", href: "/" },
  { id: "trade", icon: BarChart2, label: "Trade", href: "/trade" },
  { id: "pool", icon: Droplet, label: "Pool", href: "/pool" },
  { id: "arbitrage", icon: RefreshCw, label: "Arbitrage", href: "/arbitrage" },
  { id: "bridge", icon: Bridge, label: "Bridge", href: "/bridge" },
  { id: "transfer", icon: Send, label: "Transfer", href: "/transfer" },
  { id: "cards", icon: CreditCard, label: "Cards", href: "/cards" },
  { id: "buy", icon: DollarSign, label: "Buy", href: "/buy" },
]

export const Navbar = () => {
  const pathname = usePathname()

  return (
    <div className="border-b border-gray-800 bg-[#0A0B2E]/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                <defs>
                  <radialGradient id="backgroundGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" className="text-[#0A0B2E] opacity-100" />
                    <stop offset="100%" className="text-[#020214] opacity-100" />
                  </radialGradient>
                  <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" className="text-[#4A90E2] opacity-30" />
                    <stop offset="100%" className="text-[#4A90E2] opacity-0" />
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
                <g transform="translate(150,150)" filter="url(#orbitsGlow)">
                  <g stroke="#4A90E2" fill="none" opacity="0.8" strokeWidth="1">
                    <ellipse rx="75" ry="75" />
                    <ellipse rx="75" ry="75" transform="rotate(60)" />
                    <ellipse rx="75" ry="75" transform="rotate(120)" />
                  </g>
                  <g filter="url(#particleGlow)">
                    <g fill="#FFFFFF">
                      <circle cx="75" cy="0" r="2.5" />
                      <circle cx="-75" cy="0" r="2.5" />
                      <circle cx="37.5" cy="64.95" r="2.5" />
                      <circle cx="-37.5" cy="-64.95" r="2.5" />
                      <circle cx="-37.5" cy="64.95" r="2.5" />
                      <circle cx="37.5" cy="-64.95" r="2.5" />
                    </g>
                    <g fill="#FFFFFF" opacity="0.6">
                      <circle cx="0" cy="75" r="1" />
                      <circle cx="0" cy="-75" r="1" />
                      <circle cx="65" cy="37.5" r="1" />
                      <circle cx="-65" cy="-37.5" r="1" />
                      <circle cx="-65" cy="37.5" r="1" />
                      <circle cx="65" cy="-37.5" r="1" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-semibold text-white">QuantumDEX</span>
          </div>

          <nav className="flex space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="relative px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-colors"
                >
                  <div className="flex flex-col items-center">
                    <Icon 
                      className={`w-5 h-5 sm:w-6 sm:h-6 mb-1 ${
                        isActive ? 'text-blue-400' : 'text-gray-400'
                      }`} 
                    />
                    <span className={`text-xs sm:text-sm font-medium ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gray-800/50 rounded-lg -z-10"
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
              )
            })}
          </nav>

          <WalletConnect />
        </div>
      </div>
    </div>
  )
}