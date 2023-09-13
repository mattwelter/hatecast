/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = {
    ...withPWA({
        dest: 'public',
        rgister: true,
        skipWaiting: true,
    }),
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
