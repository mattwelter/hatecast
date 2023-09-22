import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Hatecast`,
  description: 'Hatecast - Reveal your unfollowers on Farcaster',
  manifest: '/manifest.json',
  icons: { apple: '/hatecast_logo.png' },
  themeColor: '#1B1A1F'
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <head>
        <script defer data-domain="hatecast.xyz" src="https://plausible.io/js/script.js"></script>
      </head>
      <html lang="en" className={inter.className}>
        <body>{children}</body>
        <Analytics />
      </html>
    </>
  )
}
