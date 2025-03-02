"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import styles from "./page.module.css";

import { login } from "@/services/login";
import { storeTokens } from "@/helpers/token";

const Page = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const handleLogin = handleSubmit(async (data) => {
    try {
      const response = await login({
        username: data.username,
        password: data.password,
      });

      if (response) {
        // Assume storeTokens is defined elsewhere
        storeTokens(response.token, response.refresh_token);
        router.push("/dashboard");
      } else {
        console.log("error during login: ", response);
      }
    } catch (error) {
      console.log(error);
    }
  });

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
        <form action="" className={styles["form-body"]} onSubmit={handleLogin}>
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
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <span>{errors.password.message}</span>}
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

export default Page;
