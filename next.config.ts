// next.config.js
const nextConfig = {
  i18n: {
    locales: ['de', 'ru'], // или какие у тебя есть
    defaultLocale: 'de',
  },
  async rewrites() {
    return [
      {
        source: '/studio/:path*',
        destination: '/studio/:path*',
      },
    ]
  },
}

module.exports = nextConfig
