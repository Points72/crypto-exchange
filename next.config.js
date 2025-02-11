/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Включаем поддержку App Router
  },
  env: {
    // Infrastructure
    NEXT_PUBLIC_INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID,
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    NEXT_PUBLIC_COINMARKETCAP_API_KEY: process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY,

    // RPC URLs
    NEXT_PUBLIC_SOLANA_RPC: process.env.NEXT_PUBLIC_SOLANA_RPC,
    NEXT_PUBLIC_ALCHEMY_SOLANA: process.env.NEXT_PUBLIC_ALCHEMY_SOLANA,
    NEXT_PUBLIC_INFURA_API: process.env.NEXT_PUBLIC_INFURA_API,
    NEXT_PUBLIC_INFURA_BSC: process.env.NEXT_PUBLIC_INFURA_BSC,
    NEXT_PUBLIC_INFURA_AVAX: process.env.NEXT_PUBLIC_INFURA_AVAX,
    NEXT_PUBLIC_INFURA_ARBITRUM: process.env.NEXT_PUBLIC_INFURA_ARBITRUM,
    NEXT_PUBLIC_INFURA_OPTIMISM: process.env.NEXT_PUBLIC_INFURA_OPTIMISM,
    NEXT_PUBLIC_INFURA_ZKSYNC: process.env.NEXT_PUBLIC_INFURA_ZKSYNC,

    // DEX APIs
    NEXT_PUBLIC_RAYDIUM_API_KEY: process.env.NEXT_PUBLIC_RAYDIUM_API_KEY,
    NEXT_PUBLIC_JUPITER_API_KEY: process.env.NEXT_PUBLIC_JUPITER_API_KEY,

    // CEX APIs
    NEXT_PUBLIC_BYBIT_API_KEY: process.env.NEXT_PUBLIC_BYBIT_API_KEY,
    NEXT_PUBLIC_BYBIT_API_SECRET: process.env.NEXT_PUBLIC_BYBIT_API_SECRET,
    NEXT_PUBLIC_MEXC_API_KEY: process.env.NEXT_PUBLIC_MEXC_API_KEY,
    NEXT_PUBLIC_MEXC_API_SECRET: process.env.NEXT_PUBLIC_MEXC_API_SECRET,
    NEXT_PUBLIC_BINGX_API_KEY: process.env.NEXT_PUBLIC_BINGX_API_KEY,
    NEXT_PUBLIC_BINGX_API_SECRET: process.env.NEXT_PUBLIC_BINGX_API_SECRET,
    NEXT_PUBLIC_OKX_API_KEY: process.env.NEXT_PUBLIC_OKX_API_KEY,
    NEXT_PUBLIC_OKX_API_SECRET: process.env.NEXT_PUBLIC_OKX_API_SECRET,
    NEXT_PUBLIC_OKX_API_PHRASE: process.env.NEXT_PUBLIC_OKX_API_PHRASE,
    NEXT_PUBLIC_KUCOIN_API_KEY: process.env.NEXT_PUBLIC_KUCOIN_API_KEY,
    NEXT_PUBLIC_KUCOIN_API_SECRET: process.env.NEXT_PUBLIC_KUCOIN_API_SECRET,
    NEXT_PUBLIC_KUCOIN_API_PASSWORD: process.env.NEXT_PUBLIC_KUCOIN_API_PASSWORD, // Исправлено

    // Payment APIs
    NEXT_PUBLIC_MOONPAY_API: process.env.NEXT_PUBLIC_MOONPAY_API,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_SECRET_KEY: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
  },
  images: {
    domains: ['assets.coingecko.com', 'raw.githubusercontent.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig;
