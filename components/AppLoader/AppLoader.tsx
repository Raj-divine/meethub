import styles from "./AppLoader.module.scss";
import { Loader } from "@mantine/core";

const AppLoader = () => {
  return (
    <div className={styles["app-loader"]}>
      <Loader color="#9333ea" variant="bars" className={styles.loader} />
    </div>
  );
};

export default AppLoader;
