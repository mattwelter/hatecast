'use client'

import { useState } from 'react'
export default function Page({
    children
} : {
    children: React.ReactNode
}) {
    const [number, setNumber] = useState(0);
 
    return (
        <>
            {/* Add the  */}
            {  number == 1 ? "24 hours" : number == 7 ? "7 days" :  number == 30 ? "30 days" : "24 hours" }

            <div className="trendingButtons">
                <div className="buttonDiv">
                    <button onClick={(e) => setNumber(1)}>24 hours</button>
                </div>
                <div className="buttonDiv">
                    <button onClick={(e) => setNumber(7)}>7 days</button>
                </div>
                <div className="buttonDiv">
                    <button onClick={(e) => setNumber(30)}>30 days</button>
                </div>
            </div>
            <div className="trendingSection">
                {children}
            </div>
        </>
    )
}
