'use client'
import React, { useEffect, useState } from 'react'
import styles from './sessionCard.module.css'
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { PiUserListBold } from "react-icons/pi";
import { useRouter } from 'next/navigation';

const SessionCard = ({ title, description, start_duration, end_duration, students }) => {


    const router = useRouter();
    const [status, setStatus] = useState('');
    useEffect(() => {

        const start_date = new Date(start_duration);
        const end_date = new Date(end_duration);
        const now = new Date();

        if (now < start_date) {
            setStatus('PENDING');
        } else if (now < end_date) {
            setStatus('ONGOING');
        } else {
            setStatus('COMPLETED');
        }
    })


    return (
        <div className={styles['session-card']}>
            <div className={styles['top']}>
                <div className={styles['status']} id={status === 'PENDING' ? styles['pending'] : status === 'ONGOING' ? styles['ongoing'] : status === 'COMPLETED' ? styles['completed'] : styles['cancelled']}>
                    <GoDotFill />
                    {status}
                </div>
                <PiDotsThreeVerticalBold />
            </div>
            <h3 onClick={() => router.push('/dashboard/session/1')}>{title}</h3>
            <p>{description}</p>
            <div className={styles['bottom-section']}>
                <div className={styles['members-container']}>
                    <div>D</div>
                    <div>Q</div>
                    <div>A</div>
                    {(students.length - 3) > 0 && <div>+{students.length - 3}</div>}
                </div>

                <div className={styles['user-list']}>
                    <PiUserListBold size={18} /> {students.length}
                </div>
            </div>
        </div>
    )
}

export default SessionCard