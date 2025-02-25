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
          <SessionCard status={'ONGOING'} title={'Data Structures Lab Assignment - CSC301'} description={'Implement linked lists and perform basic operations such as insertion, deletion, and traversal.'} />
          <SessionCard status={'ONGOING'} title={'Mobile App Development Workshop - CSC412'} description={' Develop a To-Do List web application using React for the frontend, PHP for the backend, and MySQL for the database. The application should allow users to add, complete, and delete tasks.'} />
          <SessionCard status={'COMPLETED'} title={'Python Programming Assignment - CSC 101'} description={'Write a python program to calculate the first 50 terms in a fibonacci series. '} />
          <SessionCard status={'CANCELLED'} title={'Web Programming Assignment - CSC 293'} description={'Develop a personal e commerce website. In the website, you must implement register and login operations using mysql '} />
        </div>

      </div>
    </div>
  )
}

export default AllSessions