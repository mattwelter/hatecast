// import { getSSLHubRpcClient } from '@farcaster/hub-nodejs';
import postgres from 'postgres'

export default async function Page({ params }: {
    params: { fid: string }
}) {

    // GET unfollows from user/:fid
    const sql = postgres('postgres://b8d150:91A1C66F-B750-4790-B81F-D11822764EAE@44.200.139.115:5432/farcaster')

    async function getUnfollows() {
        const data = await sql`
            SELECT *
            FROM links
            WHERE target_fid = ${params.fid}
            AND deleted_at IS NOT null
            ORDER BY deleted_at DESC
            LIMIT 10;
        `
        return data
      }
    const unfollows = await getUnfollows()
    console.log(unfollows)

    // Sort unfollows by "Most recent" first
    unfollows.sort(function(a: any, b: any){
        return new Date(b.deleted_at).valueOf() - new Date(a.deleted_at).valueOf();
    });

    // Get username for each fid
    if (unfollows.length > 0){
        for (let i=0; i<unfollows.length; i++){
            const getObject = await fetch(`https://api.neynar.com/v1/farcaster/user/?api_key=91A1C66F-B750-4790-B81F-D11822764EAE&fid=${unfollows[i].fid}`, { method: "GET" });
            const objectResponse = await getObject.json();
            unfollows[i].username = objectResponse.result.user.username;
        }
    }

    // Get username for target_fid
    const getUser = await fetch(`https://api.neynar.com/v1/farcaster/user/?api_key=91A1C66F-B750-4790-B81F-D11822764EAE&fid=${params.fid}`, { method: "GET" });
    const userResponse = await getUser.json();
    var user = userResponse.result.user;


    return (
        <main>
            <a className="backButton" href="/">Go Back Home</a>
            <div className="header">
                <h1>{ user ? "@" + user.username : params.fid }</h1>
            </div>
            <div>
            <h2 className="recentlyUnfollowed">Recently unfollowed</h2>
                {unfollows.length != 0 ? unfollows.map((event: any) => (
                    <div className="unfollowCard">
                        <a>{ new Date(event.deleted_at).toLocaleString() }</a>
                        <h3>@<a href={"/users/" + event.fid}>{ event.username }</a> unfollowed @<a href={"/users/" + event.target_fid}>{ user.username }</a></h3>
                    </div>
                )) : <div>
                        <h3>Oops!</h3>
                        <p>Looks like no one unfollowed you.</p>
                    </div>}
                    <a className="noMoreCaption">No more unfollows!</a>
                    <a className="mostRecentCaption">Only showing 10 most recent</a>
            </div>
        </main>
    )
}