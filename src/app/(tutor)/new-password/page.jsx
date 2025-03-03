"use client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { resetPassword } from "@/services/login";
import { storeTokens } from "@/helpers/token";
import styles from "./page.module.css";

const NewPasswordPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const router = useRouter();

  const handlePasswordReset = handleSubmit(async (data) => {
    console.log(data);

    try {
      const response = await resetPassword({
        username: data.username,
        current_password: data.current_password,
        password: data.password,
        confirm_password: data.confirm_password,
      });

      if (response) {
        // storeTokens(response.access_token, response.refresh_token);
        console.log("User authentication updated successfully:", response);
        console.log(response);

        router.push("/dashboard");
      }
    } catch (error) {
      console.log("error during reset password", error);
    }
  });

  console.log("errors", errors);

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["logo-container"]}>
        <div className={styles["logo"]}>LOGO</div>
      </div>
      <div className="form-container">
        <div className={styles["form-content"]}>
          <header className={styles["form-header"]}>
            <h3>Create new password</h3>
            <p>Enter your new password to complete reset.</p>
          </header>
          <form className={styles["form-body"]} onSubmit={handlePasswordReset}>
            <div className={styles["form-input"]}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && <span>{errors.username.message}</span>}
            </div>
            <div className={styles["form-input"]}>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="currentPassword"
                id="currentPassword"
                autoComplete="current-password"
                {...register("current_password", {
                  required: "Password is required",
                })}
              />
              {errors.currentPassword && (
                <span>{errors.currentPassword.message}</span>
              )}
              {showPassword ? (
                <FaRegEye onClick={togglePasswordVisibility} />
              ) : (
                <FaRegEyeSlash onClick={togglePasswordVisibility} />
              )}
            </div>
            <div className={styles["form-input"]}>
              <label htmlFor="newPassword">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.newPassword && <span>{errors.newPassword.message}</span>}
              {showPassword ? (
                <FaRegEye onClick={togglePasswordVisibility} />
              ) : (
                <FaRegEyeSlash onClick={togglePasswordVisibility} />
              )}
            </div>
            <div className={styles["form-input"]}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span>{errors.confirmPassword.message}</span>
              )}
              {showPassword ? (
                <FaRegEye onClick={togglePasswordVisibility} />
              ) : (
                <FaRegEyeSlash onClick={togglePasswordVisibility} />
              )}
            </div>
            <button>Change</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
