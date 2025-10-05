/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Необходимо для Docker
  images: {
    unoptimized: true, // Отключаем оптимизацию для деплоя на Render
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config) => {
    config.externals.push({
      'three': 'three'
    });
    return config;
  },
};

module.exports = nextConfig;
