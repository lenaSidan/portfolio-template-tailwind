const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  async rewrites() {
    return [
      {
        source: '/studio/:path*',
        destination: '/studio/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
