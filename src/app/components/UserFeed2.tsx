import { DateTime } from "luxon";
import db from '../api/db'

export default async function UserFeed(fid: any) {

  async function getUnfollows() {
    const data = await db(`
        SELECT *
        FROM links
        WHERE fid = ${fid.fid}
        AND deleted_at IS NOT null
        ORDER BY deleted_at DESC
        LIMIT 20;
      `)
    return data
  }
  const unfollows = await getUnfollows()

  // Sort unfollows by "Most recent" first
  unfollows.sort(function(a: any, b: any){
    return new Date(b.deleted_at).valueOf() - new Date(a.deleted_at).valueOf();
  });

  for(let i=0; i<unfollows.length; i++){
    let d = new Date(unfollows[i].deleted_at).toISOString()
    let event_utc = DateTime.fromISO(d);
    unfollows[i].local_date = `${event_utc.toRelative()}`
  }

  // Get username for each fid
  if (unfollows.length > 0){
    for (let i=0; i<unfollows.length; i++){
      const getUser1 = await fetch(`https://api.neynar.com/v1/farcaster/user/?api_key=${process.env.NEYNAR_API_KEY}&fid=${unfollows[i].fid}`, { method: "GET" });
      const getUser2 = await fetch(`https://api.neynar.com/v1/farcaster/user/?api_key=${process.env.NEYNAR_API_KEY}&fid=${unfollows[i].target_fid}`, { method: "GET" });
      
      const user1Response = await getUser1.json();
      const user2Response = await getUser2.json();

      unfollows[i].user1_username = user1Response.result.user.username;
      unfollows[i].user2_username = user2Response.result.user.username;
    }
  }

  return (
    <>
       {unfollows.length != 0 ? unfollows.map((event: any) => (
        <div className="unfollowCard">
            <a>{ event.local_date }</a>
            <h3>@{ event.user1_username } unfollowed @<a href={"/users/" + event.target_fid}>{ event.user2_username }</a></h3>
        </div>
        )) : <div className="unfollowCard">
            <a>Oops!</a>
            <h3>This user hasn't unfollowed anybody</h3>
        </div>}
    </>
    )
}