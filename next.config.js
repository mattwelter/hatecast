/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = {
    ...withPWA({
        dest: 'public',
        rgister: true,
        skipWaiting: true,
<<<<<<< HEAD
    })
=======
    }),
    experimental: {
        serverActions: true,
    },
>>>>>>> 0000e5ccc62c8b8ece0286f84c3cd6322bb38c35
}

module.exports = nextConfig
