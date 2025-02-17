import React from 'react'
import styles from './page.module.css'
import Navbar from '@/components/navbar/navbar'
import StatCard from '@/components/statistic-card/statCard'
import SessionCard from '@/components/session-card/sessionCard'

const Dashboard = () => {
  return (
    <div>
      <Navbar headText={'Dashboard'} descriptionText={"Welcome, let’s manage your sessions."} />
      <div className={styles['content']}>

        <div className={styles['card-container']}>
          <StatCard text={'Total Sessions'} value={'108'} percent={'3.4'} />
          <StatCard text={'Total Sessions'} value={'108'} percent={'3.4'} />
          <StatCard text={'Total Sessions'} value={'108'} percent={'3.4'} />
          <StatCard text={'Total Sessions'} value={'108'} percent={'3.4'} />
        </div>

        <div className={styles['filter-box']}>
          <h3>Recent Sessions</h3>
          <div className={styles['right']}>
            <div className={styles['select-box']}>
              Status:
              <select name="" id="">
                <option value="">All</option>
                <option value="">Pending</option>
              </select>
            </div>
            <div className={styles['select-box']}>
              <select name="" id="" style={{width: '100%'}}>
                <option value="">Filter</option>
              </select>
            </div>

          </div>
        </div>

        <div className={styles['session-card-container']}>
          <SessionCard status={'ONGOING'} />
          <SessionCard status={'ONGOING'}/>
          <SessionCard status={'COMPLETED'}/>
          <SessionCard status={'COMPLETED'}/>
          <SessionCard status={'CANCELLED'}/>
          <SessionCard status={'COMPLETED'}/>
          <SessionCard status={'COMPLETED'}/>
        </div>

      </div>
    </div>
  )
}

export default Dashboard