import { getSSLHubRpcClient } from '@farcaster/hub-nodejs'; 

export default async function Page({ params }: {
    params: { fid: string }
}) {

    // GET unfollows from user/:fid
    const getUnfollows = await fetch('https://data.hubs.neynar.com/api/queries/25/results?api_key=AVrlfYkQzoguw6lsL4yrr3eHz7Xqbk2BSlXqADF4', {
        method: 'POST',
        body: JSON.stringify({
            "max_age": 0,
            "parameters": {
                "fid": params.fid
            }
        }),
    })
    const unfollowsResponse = await getUnfollows.json(); // Response for getting unfollow data
    console.log("unfollowsResponse", unfollowsResponse)


    // GET job
    async function fetchJob(jobId: string) {
        let response;
        
        while (true) {
          const getJob = await fetch(`https://data.hubs.neynar.com/api/jobs/${jobId}`, {
            method: 'GET',
            headers: { "Authorization": "Key FCvG9nqu9WJ2AY7SCywujJz96x3hyDqq4XUn1wiH" },
            cache: 'no-store'
          });
          response = await getJob.json();
          console.log("Job response ->", response)
          if (response.job.status === 3) {
            break; // Exit the loop when status is 3
          }
          await new Promise(resolve => setTimeout(resolve, 1000)); // Add some delay before making the next request (e.g., to avoid rate limiting)
        }
        return response;
    }
    const finalResponse = await fetchJob(unfollowsResponse.job.id);


    // GET job's query results
    const getQueryResults = await fetch(`https://data.hubs.neynar.com/api/query_results/${finalResponse.job.query_result_id}`, {
        method: 'GET', headers: { "Authorization": "Key FCvG9nqu9WJ2AY7SCywujJz96x3hyDqq4XUn1wiH" }
    })
    const queryResultsResponse = await getQueryResults.json();
    console.log("queryResultsResponse", queryResultsResponse.query_result.data.rows[queryResultsResponse.query_result.data.rows.length-1])

    
    
    var unfollows = []; // Init array of unfollows

    // If response is available, add unfollows to array
    if (queryResultsResponse.query_result){
        unfollows = queryResultsResponse.query_result.data.rows;
    };

    // Sort unfollows by "Most recent" first
    unfollows.sort(function(a: any, b: any){
        return new Date(b.deleted_at).valueOf() - new Date(a.deleted_at).valueOf();
    });

    // Get username for each fid
    if (unfollows.length > 0){
        for (let i=0; i<unfollows.length; i++){
            const getObject = await fetch(`https://api.neynar.com/v1/farcaster/user/?api_key=91A1C66F-B750-4790-B81F-D11822764EAE&fid=${unfollows[i].fid}`, { method: "GET" });
            const objectResponse = await getObject.json();
            unfollows[i].username = objectResponse.result.user.username;
        }
    }

    // Get username for target_fid
    const getUser = await fetch(`https://api.neynar.com/v1/farcaster/user/?api_key=91A1C66F-B750-4790-B81F-D11822764EAE&fid=${params.fid}`, { method: "GET" });
    const userResponse = await getUser.json();
    var user = userResponse.result.user;

    return (
        <div>
            <h1>You are looking at: { user ? "@" + user.username : params.fid }</h1>
            {unfollows.length != 0 ? unfollows.map((event: any) => (
                <div>
                    <h3>{ event.username } unfollowed { user.username } on { new Date(event.deleted_at).toLocaleDateString() }</h3>
                </div>
            )) : finalResponse.job.status != 3 ? <div>
                    <h3>Loading...</h3>
                </div> : <div>
                    <h3>Oops!</h3>
                    <p>Looks like no one unfollowed you.</p>
                </div>}
        </div>
    )
}