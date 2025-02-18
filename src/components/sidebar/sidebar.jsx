"use client"
import React, { useEffect, useState } from 'react'
import styles from './sidebar.module.css'
import { LuLayoutDashboard } from "react-icons/lu";
import { SlScreenDesktop } from "react-icons/sl";
import { HiOutlineUserGroup } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { LuSettings } from "react-icons/lu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const router = useRouter();
  const activeSidebarMenu = useSelector((state) => state.sidebar.activeMenu);

  const handleClick = (route) => {
    router.push(route);
  }

  return (
    <div className={styles['sidebar']}>
      <div className={styles['logo-container']}>
        <div className={styles['logo']}>LOGO</div>
      </div>


      <div className={styles['sidebar-menu']}>
        <div className={styles['menu-item']} id={ activeSidebarMenu === 'dashboard' ? styles['active'] : styles['']} onClick={() => handleClick("/dashboard")}><LuLayoutDashboard className={styles['icon']} /> Dashboard</div>
        <div className={styles['menu-item']} id={ activeSidebarMenu === 'all-sessions' ? styles['active'] : styles['']} onClick={() => handleClick("/dashboard/all-sessions")}><SlScreenDesktop className={styles['icon']} /> All Sessions</div>
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