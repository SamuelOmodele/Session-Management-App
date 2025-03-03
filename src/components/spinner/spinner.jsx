'use client'
import React from 'react'
import { TbLoader } from "react-icons/tb";
import styles from './spinner.module.css'

const Spinner = ({size, color}) => {
  return (
    <div>
        <TbLoader size={size} style={{color: color}} className={styles['loader']}/>
    </div>
  )
}

export default Spinner