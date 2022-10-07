import { Loader } from "@mantine/core";
import styles from "./MeetupsLoader.module.scss";

const MeetupsLoader = () => {
  return (
    <div className={styles["meetups-loader"]}>
      <Loader color="#9333ea" />
    </div>
  );
};

export default MeetupsLoader;
