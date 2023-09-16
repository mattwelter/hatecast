import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import './globals.css'

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
        <meta name="description" content="Reveal your unfollowers."/>
        <meta property="og:title" content="Hatecast - Reveal your unfollowers" />
        <meta property="og:description" content="Reveal your unfollowers."/>
        <meta property="og:url" content="https://hatecast.xyz/" />
        <meta property="og:image" content="https://i.imgur.com/BRSiSUD.png" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
      </head>
      <html lang="en" className={inter.className}>
        <body>{children}</body>
        <Analytics />
      </html>
    </>
  )
}
