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
    let button7 = number == 7 ? style.selectedTrendingTab : ""
    let button30 = number == 30 ? style.selectedTrendingTab : ""

    return (
        <>
            <div className="trendingButtons">
                <div className="buttonDiv">
                    <button className={button1} onClick={(e) => setNumber(1)}>24 hours</button>
                </div>
                <div className="buttonDiv">
                    <button className={button7} onClick={(e) => setNumber(7)}>7 days</button>
                </div>
                <div className="buttonDiv">
                    <button className={button30} onClick={(e) => setNumber(30)}>30 days</button>
                </div>
            </div>
            <div className="trendingSection">
                {/* @ts-ignore */}
                { number == 1 ? children[0] : number == 7 ? children[1] :  number == 30 ? children[2] : children[0] }
            </div>
        </>
    )
}
