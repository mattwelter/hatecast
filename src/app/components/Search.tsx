'use client'
 
import { useState } from 'react';
import { postSearch } from './postSearch'
 
export default function Page() {

  const [username, updateUsername] = useState<string>('');

  const setUsername = (event: any) => {
    updateUsername(event.target.value);
  };

  const buttonClick = async () => {
    console.log(username)
    var string = username.replaceAll(" ", "").replaceAll("@", "")
    return await postSearch(string)
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