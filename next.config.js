/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = {
    ...withPWA({
        dest: 'public',
        rgister: true,
        skipWaiting: true,
    }),
    async headers() {
        return [
          {
            source: '/',
            headers: [
              {
                key: 'Cache-Control',
                value: 's-maxage=1, stale-while-revalidate=59',
              },
            ],
          },
        ];
      },
}

module.exports = nextConfig
