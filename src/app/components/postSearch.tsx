import { useRouter } from 'next/navigation'

export const postSearch = async (username: string) => {
    const router = useRouter()
    const getUser = await fetch(`https://api.neynar.com/v1/farcaster/user-by-username/?api_key=${process.env.NEYNAR_API_KEY}&username=${username}`, { method: "GET" });
    const userResponse = await getUser.json();
    router.push(`/users/${userResponse.result.user.fid}`)
  }