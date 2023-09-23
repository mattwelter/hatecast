'use client'

import { useState } from 'react'
import style from '../css/Navigation.module.css'

export default function Page({
    children
} : {
    children: React.ReactNode
}) {
    const [number, setNumber] = useState(1);

    let button1 = number == 1 ? style.selectedTrendingTab : ""
    let button2 = number == 2 ? style.selectedTrendingTab : ""

    return (
        <>
            <div className="trendingButtons">
                <div className="buttonDiv">
                    <button className={button1} onClick={(e) => setNumber(1)}>To</button>
                </div>
                <div className="buttonDiv">
                    <button className={button2} onClick={(e) => setNumber(2)}>From</button>
                </div>
            </div>
            <div className="trendingSection">
                {/* @ts-ignore */}
                { number == 1 ? children[0] : number == 2 ? children[1] : children[0] }
            </div>
        </>
    )
}
