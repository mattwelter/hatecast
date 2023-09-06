'use client'
 
import { useRouter } from 'next/navigation'
import { useState } from 'react';
 
export default function Page() {
  const router = useRouter()

  const [username, updateUsername] = useState('');

  const setUsername = (event: any) => {
    updateUsername(event.target.value);
  };

  const buttonClick = async () => {
    console.log(username)
    var string = username.replaceAll(" ", "").replaceAll("@", "")
    const getUser1 = await fetch(`https://api.neynar.com/v1/farcaster/user-by-username/?api_key=91A1C66F-B750-4790-B81F-D11822764EAE&username=${string}`, { method: "GET" });
    const user1Response = await getUser1.json();
    console.log(user1Response)
    router.push(`/users/${user1Response.result.user.fid}`)
  };
 
  return (
    <div className="search">
      <form>
        <input id="searchUsernameFid" name="searchUsernameFid" placeholder="Search by username" onChange={setUsername} value={username}/>
        <button type="button" onClick={buttonClick}>Check User</button>
      </form>
      <a>Search by fid, or ENS, is not supported.</a>
    </div>
  )
}