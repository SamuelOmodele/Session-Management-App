'use client'
import React from 'react'
import { TbLoader } from "react-icons/tb";
import styles from './loader.module.css'

const Loader = ({size, color}) => {
  return (
    <div>
        <TbLoader size={size} style={{color: color}} className={styles['loader']}/>
    </div>
  )
}

export default Loader