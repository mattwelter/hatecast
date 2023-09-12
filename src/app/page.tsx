import Image from 'next/image'
import styles from './page.module.css'
import { Suspense } from 'react'
import HomeFeed from './components/HomeFeed'
import LoadingFeed from './components/LoadingFeed'
import Search from './components/Search'
import Head from 'next/head'

export const dynamic = 'force-dynamic';

export default function Home() {

  return (
    <main className={styles.main}>
      <Head>
        <title>Hatecast</title>
        <meta name="description" content="Reveal your unfollowers on Farcaster" key="desc" />
        <meta property="og:title" content="Hatecast - Reveal your unfollowers on Farcaster" />
        <meta property="og:description" content="Reveal your unfollowers on Farcaster" />
        <meta property="og:image" content="/og_image.png" />
      </Head>
      <div className="header">
        <div>
          <section className="header_h1">
            <Image id="h1_logo" src="/hatecast_logo.png" alt="Hatecast logo" width="42" height="42" />
            <h1>Hatecast</h1>
          </section>
          <p>Stay informed. Reveal your unfollowers.</p>
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