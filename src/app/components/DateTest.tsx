'use client'
 
import moment from 'moment'

export default async function UserFeed(unfollows: any) {

  for(let i=0; i<unfollows.length; i++){

  }

  for(let i=0; i<unfollows.length; i++){
    let d = new Date(unfollows[i].deleted_at).toISOString()
    let date = new Date(d).toLocaleTimeString()
    unfollows[i].local_date = date
  }

  return (
    <>
       {unfollows.length != 0 ? unfollows.map((event: any) => (
        <div className="unfollowCard">
            <a>{ moment(event.local_date).startOf('minute').fromNow() }</a>
            <h3>@<a href={"/users/" + event.fid}>{ event.user1_username }</a> unfollowed @{ event.user2_username }</h3>
        </div>
        )) : <div className="unfollowCard">
            <a>Oops!</a>
            <h3>Looks like no one unfollowed you.</h3>
        </div>}
    </>
    )
}