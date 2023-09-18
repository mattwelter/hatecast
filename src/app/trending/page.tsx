import TrendingTabs from '../components/TrendingTabs'
import LoadingFeed from '../components/LoadingFeed'
import Navigation from '../components/Navigation'
import Trending1Day from '../components/Trending1Day'
import Trending7Day from '../components/Trending7Day'
import Trending30Day from '../components/Trending30Day'
import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Hatecast - Trending`,
  description: 'Hatecast - Reveal your unfollowers on Farcaster',
  manifest: '/manifest.json',
  icons: { apple: '/hatecast_logo.png' },
  themeColor: '#1B1A1F'
}

export const dynamic = 'force-dynamic';

export default async function Page() {

    return (
        <main>
            <Navigation />
            <div>
                <div className="header userFeedHeader">
                    <h1>Trending</h1>
                    <h2>Most unfollowed in given time period.</h2>
                </div>
                <Suspense fallback={<LoadingFeed />}>
                    <TrendingTabs>
                        <Trending1Day />
                        <Trending7Day />
                        <Trending30Day />
                    </TrendingTabs>
                </Suspense>
                <a className="mostRecentCaption">Only showing 10 most recent</a>
            </div>
        </main>
    )
}