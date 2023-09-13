'use client'
 
import { useState } from 'react';
import { useRouter } from 'next/navigation'
 
export default function Page() {

  const [username, updateUsername] = useState<string>('');

  const setUsername = (event: any) => {
    updateUsername(event.target.value);
  };

  const buttonClick = async () => {
    const router = useRouter()
    console.log(username)
    var string = username.replaceAll(" ", "").replaceAll("@", "")
    const getUser = await fetch(`https://api.neynar.com/v1/farcaster/user-by-username/?api_key=${process.env.NEYNAR_API_KEY}&username=${username}`, { method: "GET" });
    const userResponse = await getUser.json();
    router.push(`/users/${userResponse.result.user.fid}`)
  };
 
  return (
    <div className="search">
      <form>
        <input id="searchUsernameFid" name="searchUsernameFid" placeholder="Search by username" onChange={setUsername} value={username}/>
        <button type="button" disabled={!username} onClick={buttonClick}>Check User</button>
      </form>
      <a>Search by fid, or ENS, is not supported.</a>
    </div>
  )
}