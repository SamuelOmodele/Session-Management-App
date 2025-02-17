import React from 'react'
import { IoMdArrowUp } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import styles from './statCard.module.css'

const StatCard = ({ text, value, percent }) => {
    return (
        <div className={styles['card']}>
            <div className={styles['main']}>
                <div className={styles['top']}>
                    <h3 className={styles['text']}>{text}</h3>
                    <PiDotsThreeVerticalBold />
                </div>
                <p className={styles['value']}>{value}</p>
            </div>

            <p className={styles['percent-text']}> <span><IoMdArrowUp /> {percent}%</span> vs last year</p>
        </div>
    )
}

export default StatCard