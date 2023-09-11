import moment from 'moment'
import sql from '../db.js'

export default async function HomeFeed() {
  console.log("1 -", Date.now())

  async function getUnfollows() {
    const data = await sql`
        SELECT *
        FROM links
        WHERE deleted_at IS NOT null
        ORDER BY deleted_at DESC
        LIMIT 10;
      `
      console.log("2 -", Date.now())
    return data
  }
  const unfollows = await getUnfollows()
  console.log("3 -", Date.now())
  // Sort unfollows by "Most recent" first
  unfollows.sort(function(a: any, b: any){
    return new Date(b.deleted_at).valueOf() - new Date(a.deleted_at).valueOf();
  });

  for(let i=0; i<unfollows.length; i++){
    let hours = new Date(unfollows[i].deleted_at).getHours();
    let date = new Date(unfollows[i].deleted_at).setHours(hours-7)
    unfollows[i].local_date = date
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

  console.log("4 -", Date.now())

  return (
    <>
       {unfollows.length != 0 ? unfollows.map((event: any) => (
            <div className="unfollowCard">
              <a>{ moment(event.local_date).startOf('minute').fromNow() }</a>
              <h3>@<a href={"/users/" + event.fid}>{ event.user1_username }</a> unfollowed @<a href={"/users/" + event.target_fid}>{ event.user2_username }</a></h3>
            </div>
          )) : <div className="unfollowCard">
            <a>Oops!</a>
            <h3>Looks like no one unfollowed you.</h3>
          </div>}
    </>
    )
}