import styles from "./loader.module.css";
const Loader = ({ loading }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["loader"]}></div>
    </div>
  );
};

export default Loader;
