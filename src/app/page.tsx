import Image from 'next/image'
import styles from './page.module.css'
import { Suspense } from 'react'
import HomeFeed from './components/HomeFeed'
import LoadingFeed from './components/LoadingFeed'
import Search from './components/Search'
import Navigation from './components/Navigation'
import Head from 'next/head'
import type { Metadata } from 'next'


   
export const metadata: Metadata = {
  title: `Hatecast`,
  description: 'Hatecast - Reveal your unfollowers on Farcaster',
  manifest: '/manifest.json',
  icons: { apple: '/hatecast_logo.png' },
  themeColor: '#1B1A1F'
}


export const dynamic = 'force-dynamic';

export default function Home() {

  return (
    <main className={styles.main}>
      <Head>
        <title>Hatecast</title>
        <meta name="description" content="Reveal your unfollowers on Farcaster" key="desc" />
        <meta property="og:title" content="Hatecast - Reveal your unfollowers on Farcaster" />
        <meta property="og:description" content="Reveal your unfollowers on Farcaster" />
      </Head>
      <Navigation />
      <div className="header homepageHeader">
        <div>
          <section className="header_h1">
            <Image id="h1_logo" src="/hatecast_logo.png" alt="Hatecast logo" width="42" height="42" />
            <h1>Hatecast</h1>
          </section>
          <p>Reveal your unfollowers on Farcaster.</p>
        </div>
        <Suspense fallback={<p>Loading search...</p>}>
          <Search />
        </Suspense>
      </div>
      <div>
        <h2 className="recentlyUnfollowed">Recently unfollowed</h2>
        <Suspense fallback={<LoadingFeed />}>
          <HomeFeed />
        </Suspense>
        <a className="mostRecentCaption">Only showing 10 most recent</a>
      </div>
    </main>
  )
}