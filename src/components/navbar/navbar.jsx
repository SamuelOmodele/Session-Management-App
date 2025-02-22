import React from 'react'
import { FiBell } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import styles from './navbar.module.css'
import { useDispatch } from 'react-redux';
import { setIsModalOpen } from '@/redux/modalSlice';


const Navbar = ({ headText, descriptionText }) => {

  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(setIsModalOpen(true));
  }

  return (
    <div className={styles['navbar']}>
      <div className={styles['left-content']}>
        <h3>{headText}</h3>
        <p>{descriptionText}</p>
      </div>
      <div className={styles['right-content']}>
        <div className={styles['icon-container']}><FiBell className={styles['icon']} /></div>
        <button onClick={openModal} >
          <FiPlus size={22} /> Create session
        </button>
      </div>
    </div>
  )
}

export default Navbar