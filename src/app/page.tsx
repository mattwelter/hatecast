import Image from 'next/image'
import styles from './page.module.css'
import postgres from 'postgres'
import Search from './search'

export default async function Home() {

  // GET most recent unfollows
  const sql = postgres('postgres://b8d150:91A1C66F-B750-4790-B81F-D11822764EAE@44.200.139.115:5432/farcaster')

  async function getUnfollows() {
    const data = await sql`
        SELECT *
        FROM links
        WHERE deleted_at IS NOT null
        ORDER BY deleted_at DESC
        LIMIT 10;
      `
    return data
  }
  const unfollows = await getUnfollows()

  // Sort unfollows by "Most recent" first
  unfollows.sort(function(a: any, b: any){
    return new Date(b.deleted_at).valueOf() - new Date(a.deleted_at).valueOf();
  });

  for(let i=0; i<unfollows.length; i++){
    var date = new Date(unfollows[i].deleted_at).toLocaleString("en-US", {
      localeMatcher: "best fit",
      timeZoneName: "short"
    });
    unfollows[i].local_date = date
  }

  console.log(unfollows)

  // Get username for each fid
  if (unfollows.length > 0){
    for (let i=0; i<unfollows.length; i++){
      const getUser1 = await fetch(`https://api.neynar.com/v1/farcaster/user/?api_key=91A1C66F-B750-4790-B81F-D11822764EAE&fid=${unfollows[i].fid}`, { method: "GET" });
      const getUser2 = await fetch(`https://api.neynar.com/v1/farcaster/user/?api_key=91A1C66F-B750-4790-B81F-D11822764EAE&fid=${unfollows[i].target_fid}`, { method: "GET" });
      
      const user1Response = await getUser1.json();
      const user2Response = await getUser2.json();

      unfollows[i].user1_username = user1Response.result.user.username;
      unfollows[i].user2_username = user2Response.result.user.username;
    }
  }


  return (
    <main className={styles.main}>
      <div className="header">
        <h1>😡 Hatecast</h1>
        <p>Check to see who unfollowed you on Farcaster.</p>
        <form>
          <input id="searchUsernameFid" name="searchUsernameFid" placeholder="Search by username (or fid)" />
          <button id="submit" onClick={Search}>Check</button>
        </form>
      </div>
      <div>
        <h2 className="recentlyUnfollowed">Recently unfollowed</h2>
        {unfollows.length != 0 ? unfollows.map((event: any) => (
          <div className="unfollowCard">
            <a>{ new Date(event.local_date).toLocaleString() }</a>
            <h3>@<a href={"/users/" + event.fid}>{ event.user1_username }</a> unfollowed @<a href={"/users/" + event.target_fid}>{ event.user2_username }</a></h3>
          </div>
        )) : <div>
            <h3>Oops!</h3>
            <p>Looks like no one unfollowed you.</p>
          </div>}
          <a className="mostRecentCaption">Only showing 10 most recent</a>
      </div>
    </main>
  )
}
