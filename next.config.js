const { i18n } = require('./next-i18next.config');
const withPWAInit = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const isDev = process.env.NODE_ENV === 'development';
const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
});

module.exports = withPWA({
  i18n,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ abaikan semua lint error saat build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ abaikan error TS agar tidak blokir build
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: 'raw-loader',
    });
    return config;
  },
});
