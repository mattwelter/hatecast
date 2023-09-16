import UserFeed from '../../components/UserFeed'
import LoadingFeed from '../../components/LoadingFeed'
import { Suspense } from 'react'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: { fid: string }
}
   
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {

    const getUser = await fetch(`https://api.neynar.com/v1/farcaster/user/?api_key=${process.env.NEYNAR_API_KEY}&fid=${params.fid}`, { method: "GET" });
    const userResponse = await getUser.json();
    let user = userResponse.result.user;
   
    return {
        title: `Hatecast - ${ user ? "@" + user.username : params.fid}`,
        description: 'Hatecast - Reveal your unfollowers on Farcaster',
        manifest: '/manifest.json',
        icons: { apple: '/hatecast_logo.png' },
        themeColor: '#1B1A1F'
    }
}

export default async function Page({ params }: {
    params: { fid: string }
}) {

    const getUser = await fetch(`https://api.neynar.com/v1/farcaster/user/?api_key=${process.env.NEYNAR_API_KEY}&fid=${params.fid}`, { method: "GET" });
    const userResponse = await getUser.json();
    let user = userResponse.result.user;

    return (
        <main>
            <a className="backButton" href="/">Back Home</a>
            <a className="viewOnWarpcast" href={"https://warpcast.com/"+user.username} target="_blank">View on Warpcast<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 16 16">
<path d="M 9 2 L 9 3 L 12.292969 3 L 6.023438 9.273438 L 6.726563 9.976563 L 13 3.707031 L 13 7 L 14 7 L 14 2 Z M 4 4 C 2.894531 4 2 4.894531 2 6 L 2 12 C 2 13.105469 2.894531 14 4 14 L 10 14 C 11.105469 14 12 13.105469 12 12 L 12 7 L 11 8 L 11 12 C 11 12.550781 10.550781 13 10 13 L 4 13 C 3.449219 13 3 12.550781 3 12 L 3 6 C 3 5.449219 3.449219 5 4 5 L 8 5 L 9 4 Z"></path>
</svg></a>
            <div className="header userFeedHeader">
                <h1>{ user ? "@" + user.username : params.fid }</h1>
            </div>
            <div>
                <h2 className="recentlyUnfollowed">Recently unfollowed</h2>
                <Suspense fallback={<LoadingFeed />}>
                    <UserFeed fid={params.fid} />
                </Suspense>
                <a className="noMoreCaption">No more unfollows</a>
                <a className="mostRecentCaption">Only showing 10 most recent</a>
            </div>
        </main>
    )
}