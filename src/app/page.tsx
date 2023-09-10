import styles from './page.module.css'
import { Suspense } from 'react'
import HomeFeed from './components/HomeFeed'
import LoadingFeed from './components/LoadingFeed'
import Search from './components/Search'

export default function Home() {

  return (
    <main className={styles.main}>
      <div className="header">
        <h1>😡 Hatecast</h1>
        <p>Check to see who unfollowed you on Farcaster.</p>
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