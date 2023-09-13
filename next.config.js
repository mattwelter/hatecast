/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = {
    ...withPWA({
        dest: 'public',
        rgister: true,
        skipWaiting: true,
    }),
    publicRuntimeConfig: {
        NEXT_PUBLIC_NEYNAR_API_KEY: "91A1C66F-B750-4790-B81F-D11822764EAE",
    }
}

module.exports = nextConfig
