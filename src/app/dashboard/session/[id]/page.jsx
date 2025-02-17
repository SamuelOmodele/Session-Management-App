'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { FaCode } from "react-icons/fa6";
import { IoListOutline } from "react-icons/io5";
import { LuLoader } from "react-icons/lu";
import { CgSearch } from 'react-icons/cg';
import { PiDotsThree } from "react-icons/pi";
import { PiCopySimpleFill } from "react-icons/pi";
import { PiUserCircleGear } from "react-icons/pi";
import { PiTimer } from "react-icons/pi";
import { PiClock } from "react-icons/pi";
import { PiClockCountdown } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { setActiveMenu } from '@/redux/sidebarSlice';

const Page = () => {

    const invitations = [
        { name: 'Peculiar Badejo', email: 'peculiarbadejoemailaddress@gmail.com', date: 'Feb 6, 11:43 AM' },
        { name: 'Peculiar Badejo', email: 'peculiarbadejoemailaddress@gmail.com', date: 'Feb 6, 11:43 AM' },
        { name: 'Peculiar Badejo', email: 'peculiarbadejoemailaddress@gmail.com', date: 'Feb 6, 11:43 AM' },
        { name: 'Peculiar Badejo', email: 'peculiarbadejoemailaddress@gmail.com', date: 'Feb 6, 11:43 AM' },
        { name: 'Peculiar Badejo', email: 'peculiarbadejoemailaddress@gmail.com', date: 'Feb 6, 11:43 AM' },
        { name: 'Peculiar Badejo', email: 'peculiarbadejoemailaddress@gmail.com', date: 'Feb 6, 11:43 AM' },
    ]

    const submissions = [
        { name: 'Peculiar Badejo', score: '83', time: '2 hrs 22 mins', dateTime: 'Feb6, 11:43 AM' },
        { name: 'Peculiar Badejo', score: '83', time: '2 hrs 22 mins', dateTime: 'Feb6, 11:43 AM' },
        { name: 'Peculiar Badejo', score: '83', time: '2 hrs 22 mins', dateTime: 'Feb6, 11:43 AM' },
        { name: 'Peculiar Badejo', score: '83', time: '2 hrs 22 mins', dateTime: 'Feb6, 11:43 AM' },
        { name: 'Peculiar Badejo', score: '83', time: '2 hrs 22 mins', dateTime: 'Feb6, 11:43 AM' },
        { name: 'Peculiar Badejo', score: '83', time: '2 hrs 22 mins', dateTime: 'Feb6, 11:43 AM' },
    ]

    const [show, setShow] = useState(false);

    const getRandomHexColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    const dispatch = useDispatch();
    useEffect(() => {
        setShow(true);
        dispatch(setActiveMenu('all-sessions'))
    }, []);

    const [invitation, setInvitation] = useState(true)
    const [access, setAccess] = useState(false)
    const [session, setSession] = useState(true)

    const toggleInvitation = () => {
        setInvitation(invitation => !invitation);
    }
    const toggleAccess = () => {
        setAccess(access => !access);
    }
    const toggleSession = () => {
        setSession(session => !session);
    }

    const [copied, setCopied] = useState(false);
    const link = "https://sessionmgtsite.com/session/s3201";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            // --- reset it after 2 seconds ---
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className={styles['session-page']}>
            <div className={styles['middle-section']}>
                <div className={styles['container']}>
                    <div className={styles['head-container']}>
                        <div className={styles['code']}><FaCode /></div>
                        <h3>Mobile App Development Workshop - CSC412</h3>
                        <p>Created on January 28, 2025</p>
                    </div>
                    <div className={styles['body-container']}>
                        <p>1. Develop a To-Do List web application using React for the frontend, PHP for the backend, and MySQL for the database. The application should allow users to add, complete, and delete tasks. Implement state management in React to handle the list of tasks dynamically, create a PHP API to manage CRUD operations, and store tasks in a MySQL database to ensure persistence across sessions.</p>
                        <p>2. Implement a filtering feature in the To-Do List application that allows users to view All, Completed, or Pending tasks. Modify the frontend to include filter options and update the backend to support retrieving tasks based on their status.</p>
                        <div className={styles['invitation-status']}>
                            <div>
                                <IoListOutline />
                                200 total invitations
                            </div>
                            <div>
                                <LuLoader />
                                80 pending invitations
                            </div>
                        </div>
                    </div>
                    {show && !access && <div className={styles["table-container"]}>
                        <div className={styles["head"]}>
                            <h3>Pending invitations</h3>
                            <form className={styles['form']} action="">
                                <CgSearch className={styles['search-icon']} />
                                <input type="search" name="" id="" placeholder='Search . . .' />
                            </form>
                        </div>
                        <div className={styles["table-head"]}>
                            <div className={styles["head-name"]}> Student name</div>
                            <div className={styles["head-email"]}> Email address</div>
                            <div className={styles["head-date"]}> Request date</div>
                        </div>
                        {invitations.map((student, index) => (
                            <div key={index} className={styles["table-row"]}>

                                <div className={styles["row-name"]}>
                                    <div className={styles['circle']} style={{ backgroundColor: getRandomHexColor() }}>PB</div>
                                    {student.name}</div>
                                <div className={styles["row-email"]}> {student.email}</div>
                                <div className={styles["row-date"]}> {student.date}</div>
                                <div className={styles['icon']}><PiDotsThree /></div>
                            </div>
                        ))}

                    </div>}

                    {show && access && <div className={styles["table-container"]}>
                        <div className={styles["head"]}>
                            <h3>All submissions</h3>
                            <form className={styles['form']} action="">
                                <CgSearch className={styles['search-icon']} />
                                <input type="search" name="" id="" placeholder='Search . . .' />
                            </form>
                        </div>
                        <div className={styles["table-head"]}>
                            <div className={styles["head-name"]}> Student name</div>
                            <div className={styles["head-score"]}> Score (%)</div>
                            <div className={styles["head-time"]}> Time taken</div>
                            <div className={styles["head-date-time"]}> Date and time submitted</div>
                        </div>
                        {submissions.map((student, index) => (
                            <div key={index} className={styles["table-row"]}>

                                <div className={styles["row-name"]}>
                                    <div className={styles['circle']} style={{ backgroundColor: getRandomHexColor() }}>PB</div>
                                    {student.name}</div>
                                <div className={styles["row-score"]}> {student.score}</div>
                                <div className={styles["row-time"]}> {student.time}</div>
                                <div className={styles['row-date-time']}>{student.dateTime}</div>
                            </div>
                        ))}


                    </div>}
                </div>

            </div>

            <div className={styles['right-section']}>
                <div className={styles['box']}>
                    <div className={styles['validity']}>
                        <p>Invitation link validity</p>
                        <div className={styles['toggle-container']} style={{ backgroundColor: invitation ? '' : '#969696' }} onClick={toggleInvitation}>
                            <div className={styles['toggle-circle']} style={{ marginLeft: invitation ? 'auto' : '0' }}></div>
                        </div>
                    </div>

                    <div className={styles['link']}>
                        <p>sessionmgtsite.com/session/s3201</p>
                        <span onClick={handleCopy}>{copied ? "Copied!" : "Copy"} <PiCopySimpleFill /></span>
                    </div>
                    <p>Expires on Feb 20, 2025</p>
                </div>
                <div className={styles['box']}>
                    <div className={styles['open-access']}>
                        <h3>Open access</h3>
                        <div className={styles['toggle-container']} style={{ backgroundColor: access ? '' : '#969696' }} onClick={toggleAccess}>
                            <div className={styles['toggle-circle']} style={{ marginLeft: access ? 'auto' : '0' }}></div>
                        </div>
                    </div>
                    <div className={styles['setting']}>
                        <div className={styles['left']}>
                            <PiUserCircleGear size={22} /> Setting
                        </div>
                        <p>Single work group</p>
                    </div>
                </div>
                <div className={styles['box']}>
                    <div className={styles['session-outgoing']}>
                        <h3>Session ongoing</h3>
                        <div className={styles['toggle-container']} style={{ backgroundColor: session ? '' : '#969696' }} onClick={toggleSession}>
                            <div className={styles['toggle-circle']} style={{ marginLeft: session ? 'auto' : '0' }}></div>
                        </div>
                    </div>
                    <div className={styles['session-details']}>
                        <div>
                            <PiTimer size={22} /> <span>Duration</span>
                        </div>
                        <p>4 hours</p>
                    </div>
                    <div className={styles['session-details']}>
                        <div>
                            <PiClockCountdown size={22} /> <span>Session starts</span>
                        </div>
                        <p>Feb 5, 2025 12:00 AM</p>
                    </div>
                    <div className={styles['session-details']}>
                        <div>
                            <PiClock size={22} /> <span>Session ends</span>
                        </div>
                        <p>Feb 20, 2025 11:59 PM</p>
                    </div>
                </div>
                <div className={styles['box']}>
                    <h3>Supported languages</h3>
                    <p>Python, C#, C++, Matlab</p>
                </div>
                <div className={styles['box']}>
                    <div className={styles['logo']}>Edit session details</div>
                </div>
            </div>
        </div>
    )
}

export default Page