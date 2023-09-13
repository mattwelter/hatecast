import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Hatecast - Reveal your unfollowers',
  description: 'Reveal your unfollowers',
  manifest: '/manifest.json',
  icons: { apple: '/hatecast_logo.png' },
  themeColor: '#1B1A1F'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <head>
        <title>Hatecast</title>
        <meta name="description" content="Reveal your unfollowers."/>
        <meta property="og:title" content="Hatecast - Reveal your unfollowers" />
        <meta property="og:description" content="Reveal your unfollowers."/>
        <meta property="og:url" content="https://hatecast.xyz/" />
        <meta property="og:image" content="https://i.imgur.com/RHjBXuv.png" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
      </head>
      <html lang="en" className={inter.className}>
        <body>{children}</body>
      </html>
    </>
  )
}
