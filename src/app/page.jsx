"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import styles from "./page.module.css";
const page = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section className={styles["auth-container"]}>
      <div className={styles["logo-container"]}>
        <div className={styles["logo"]}>LOGO</div>
      </div>
      <div className={styles["form-container"]}>
        <div className={styles["form-header"]}>
          <h3>Welcome back!</h3>
          <p>Sign in to your account</p>
        </div>
        <form action="" className={styles["form-body"]}>
          <div className={styles["form-input"]}>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className={styles["form-input"]}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            {showPassword ? (
              <FaRegEye onClick={togglePasswordVisibility} />
            ) : (
              <FaRegEyeSlash onClick={togglePasswordVisibility} />
            )}
          </div>
          <button>Log In</button>
        </form>
      </div>
    </section>
  );
};

export default page;
