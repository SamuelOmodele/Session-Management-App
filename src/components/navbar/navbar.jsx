import React from 'react'
import { FiBell } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import styles from './navbar.module.css'


const Navbar = ({ headText, descriptionText }) => {

  return (
    <div className={styles['navbar']}>
      <div className={styles['left-content']}>
        <h3>{headText}</h3>
        <p>{descriptionText}</p>
      </div>
      <div className={styles['right-content']}>
        <div className={styles['icon-container']}><FiBell className={styles['icon']} /></div>
        <button >
          <FiPlus size={22} /> Create session
        </button>
      </div>
    </div>
  )
}

export default Navbar