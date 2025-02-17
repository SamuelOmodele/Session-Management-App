import React from 'react'
import styles from './sidebar.module.css'
import { LuLayoutDashboard } from "react-icons/lu";
import { SlScreenDesktop } from "react-icons/sl";
import { HiOutlineUserGroup } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { LuSettings } from "react-icons/lu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className={styles['sidebar']}>
      <div className={styles['logo-container']}>
        <div className={styles['logo']}>LOGO</div>
      </div>


      <div className={styles['sidebar-menu']}>
        <div className={styles['menu-item']} id={styles['active']}><LuLayoutDashboard className={styles['icon']} /> Dashboard</div>
        <div className={styles['menu-item']}><SlScreenDesktop className={styles['icon']} /> All Sessions</div>
        <div className={styles['menu-item']}><HiOutlineUserGroup className={styles['icon']} /> All Students</div>
        <div className={styles['menu-item']}><CgProfile className={styles['icon']} /> Profile</div>
        <div className={styles['menu-item']}><LuSettings className={styles['icon']} /> Settings</div>
      </div>

      <div className={styles['user']}>
        <div className={styles['circle']}>R</div>
        <div className={styles['user-details']}>
          <p>Rhoda Ogunesan</p>
          <p>rhodaogunesan@gmail.com</p>
        </div>
        <div className={styles['arrows']}>
          <IoIosArrowUp />
          <IoIosArrowDown />
        </div>

      </div>
    </div>
  )
}

export default Sidebar