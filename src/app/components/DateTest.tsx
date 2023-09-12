'use client'
 
export default function Page() {

    let d = new Date().toISOString()
    let date = new Date(d).toLocaleTimeString()

    return (
        <div className="search">
            <a>{date}</a>
        </div>
    )
}