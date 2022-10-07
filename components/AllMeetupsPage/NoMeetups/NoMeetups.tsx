import styles from "./NoMeetups.module.scss";
import Image from "next/image";
import noData from "../../../assets/images/no-data.png";
import { Text } from "@mantine/core";
const NoMeetups = () => {
  return (
    <div className={styles["no-meetups"]}>
      <div className={styles["image-container"]}>
        <Image src={noData} layout="intrinsic" objectFit="cover" />
        <Text className={styles.text}>
          We looked everywhere but couldn't find anything
        </Text>
      </div>
    </div>
  );
};

export default NoMeetups;
