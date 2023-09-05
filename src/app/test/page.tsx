import { getSSLHubRpcClient } from '@farcaster/hub-nodejs';
import postgres from 'postgres'

export default async function Page({ params }: {
    params: { fid: string }
}) {


    // host: 44.200.139.115
    // port: 5432
    // database: farcaster
    // user: b8d150
    // password: 91A1C66F-B750-4790-B81F-D11822764EAE

    const sql = postgres('postgres://b8d150:91A1C66F-B750-4790-B81F-D11822764EAE@44.200.139.115:5432/farcaster')

    async function getTestData() {
        const data = await sql`
            select *
            from links
            WHERE target_fid = 5620
            and deleted_at is not null
        `
        return data
      }
    const data = await getTestData()

    console.log(data)

    return (
        <main>
            <div>
                <h1>Test</h1>
            </div>
            <div>
                
            </div>
        </main>
    )
}