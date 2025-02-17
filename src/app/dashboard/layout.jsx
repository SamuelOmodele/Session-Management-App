import Sidebar from '@/components/sidebar/sidebar'
import React from 'react'
import styles from './layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles['layout']}>
      <div className={styles['sidebar-container']}>
        <Sidebar />
      </div>
      <div className={styles['children-container']}>{children}</div>
    </div>
  )
}

export default Layout