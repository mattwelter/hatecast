import UserFeed from '../../components/UserFeed'
import LoadingFeed from '../../components/LoadingFeed'
import { Suspense } from 'react'

export default async function Page({ params }: {
    params: { fid: string }
}) {

    const getUser = await fetch(`https://api.neynar.com/v1/farcaster/user/?api_key=${process.env.NEYNAR_API_KEY}&fid=${params.fid}`, { method: "GET" });
    const userResponse = await getUser.json();
    let user = userResponse.result.user;

    return (
        <main>
            <a className="backButton" href="/">Back Home</a>
            <div className="header userFeedHeader">
            <h1>
                <a href={`https://warpcast.com/${user.username}`}>{user ? `@${user.username}` : params.fid}</a>
            </h1>
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