/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Улучшенная отладка React
  swcMinify: true, // Оптимизация кода

  webpack: (config, { isServer }) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    // Фикс для Webpack с SSR в Next.js
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: blob: https://*;
              font-src 'self' data: https://fonts.gstatic.com;
              connect-src 'self' https://api.1inch.io https://quote-api.jup.ag;
              frame-src 'self';
            `.replace(/\n/g, ""),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
    ];
  },

  experimental: {
    appDir: true, // Включаем поддержку новой структуры Next.js (если используешь App Router)
  },

  compiler: {
    styledComponents: true, // Включаем поддержку styled-components (если используется)
  },
};

module.exports = nextConfig;
