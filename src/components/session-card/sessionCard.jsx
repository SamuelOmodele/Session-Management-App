import React from 'react'
import styles from './sessionCard.module.css'
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { PiUserListBold } from "react-icons/pi";
import { useRouter } from 'next/navigation';

const SessionCard = ({ status, }) => {

const router = useRouter();

    return (
        <div className={styles['session-card']}>
            <div className={styles['top']}>
                <div className={styles['status']} id={status === 'ONGOING' ? styles['ongoing'] : status === 'COMPLETED' ? styles['completed'] : styles['cancelled']}>
                    <GoDotFill />
                    {status}
                </div>
                <PiDotsThreeVerticalBold />
            </div>
            <h3 onClick={() => router.push('/dashboard/session/1')}>Data Structures Lab Assignment - CSC301</h3>
            <p>Implement linked lists and perform basic operations such as insertion, deletion, and traversal.</p>
            <div className={styles['bottom-section']}>
                <div className={styles['members-container']}>
                    <div>D</div>
                    <div>Q</div>
                    <div>A</div>
                    <div>+79</div>
                </div>

                <div className={styles['user-list']}>
                    <PiUserListBold size={18}/> 54/128
                </div>
            </div>
        </div>
    )
}

export default SessionCard