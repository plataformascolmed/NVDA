/** @type {import('next').NextConfig} */
const nextConfig = {
  // En Next.js 16+, fijamos la raíz para evitar conflictos con archivos externos
  experimental: {
    turbopack: {
      root: '.',
    },
  },
};

module.exports = nextConfig;
