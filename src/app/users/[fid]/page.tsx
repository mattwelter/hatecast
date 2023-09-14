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
                <a href={`https://warpcast.com/${user.username}`}>{user ? `@${user.username}` : params.fid}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 inline text-blue-500" // Adjust size and color here
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <g id="Interface / External_Link">
                        <path
                          id="Vector"
                          d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                          stroke="#FFFFFF" // Set to white
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </a>
            </h1>
            </div>
            <div>
                <h2 className="recentlyUnfollowed">Recent unfollow activitiy</h2>
                <Suspense fallback={<LoadingFeed />}>
                    <UserFeed fid={params.fid} />
                </Suspense>
                <a className="noMoreCaption">No more unfollows</a>
                <a className="mostRecentCaption">Only showing 10 most recent</a>
            </div>
        </main>
    )
}