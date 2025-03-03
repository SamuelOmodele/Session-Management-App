'use client'
import Sidebar from '@/components/sidebar/sidebar'
import React from 'react'
import styles from './layout.module.css'
import Modal from '@/components/modal/modal'
import { useSelector } from 'react-redux'
import CreateSessionModal from '@/components/createSessionModal/createSessionModal'

const Layout = ({ children }) => {

  const modalState = useSelector((state) => state.modal.isModalOpen);

  return (
      <div className={styles['layout']}>
        {modalState && <div className={styles['modal-overlay']}>
          <CreateSessionModal />
        </div>}
        <div className={styles['sidebar-container']}>
          <Sidebar />
        </div>
        <div className={styles['children-container']} style={{height: modalState ? '100vh' : '100%'}}>{children}</div>
      </div>
  )
}

export default Layout