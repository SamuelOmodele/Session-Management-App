'use client'
import React, { useEffect } from 'react'
import styles from './page.module.css'
import Navbar from '@/components/navbar/navbar'
import SessionCard from '@/components/session-card/sessionCard'
import { CgSearch } from "react-icons/cg";
import { useDispatch } from 'react-redux'
import { setActiveMenu } from '@/redux/sidebarSlice'

const AllSessions = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveMenu('all-sessions'))
  }, []);


  return (
    <div>
      <Navbar headText={'All sessions'} descriptionText={"Manage all your created sessions here."} />
      <div className={styles['content']}>

        <div className={styles['filter-box']}>
          <form className={styles['form']} action="">
            <CgSearch className={styles['search-icon']} />
            <input type="search" name="" id="" placeholder='Search . . .' />
          </form>
          <div className={styles['right']}>
            <div className={styles['select-box']}>
              Status:
              <select name="" id="">
                <option value="">All</option>
                <option value="">Pending</option>
              </select>
            </div>
            <div className={styles['select-box']}>
              <select name="" id="" style={{ width: '100%' }}>
                <option value="">Filter</option>
              </select>
            </div>

          </div>
        </div>

        <div className={styles['session-card-container']}>
          <SessionCard status={'ONGOING'} />
          <SessionCard status={'ONGOING'} />
          <SessionCard status={'COMPLETED'} />
          <SessionCard status={'COMPLETED'} />
          <SessionCard status={'CANCELLED'} />
          <SessionCard status={'COMPLETED'} />
          <SessionCard status={'COMPLETED'} />
        </div>

      </div>
    </div>
  )
}

export default AllSessions