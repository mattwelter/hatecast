import sql from '../db.js'

export default async function Trending7Day() {

  const getFeed = async function(){
    const data = await sql`
        SELECT target_fid, COUNT(target_fid) AS occurrence_count
        FROM links
        WHERE deleted_at >= NOW() - INTERVAL '30 days'
        GROUP BY target_fid
        ORDER BY occurrence_count DESC
        LIMIT 10;
      `
    return data
  }

  const unfollows = await getFeed()

  // Get username for each fid
  if (unfollows.length > 0){
    for (let i=0; i<unfollows.length; i++){
      const getUser = await fetch(`https://api.neynar.com/v1/farcaster/user/?api_key=${process.env.NEYNAR_API_KEY}&fid=${unfollows[i].target_fid}`, { method: "GET" });
      const userResponse = await getUser.json();
      unfollows[i].username = userResponse.result.user.username;
    }
  }

  return (
    <>
       {unfollows.length != 0 ? unfollows.map((event: any) => (

          <div className="unfollowCard">
            <h3>@<a href={"/users/" + event.target_fid}>{ event.username }</a> was unfollowed { event.occurrence_count } times</h3>
          </div>
          )) :
          
          <div className="unfollowCard">
            <h3>Looks like no one unfollowed you.</h3>
          </div>
          
        }
    </>
    )
}