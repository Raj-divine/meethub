import styles from "./NoMeetups.module.scss";
import Image from "next/image";
import noData from "../../../assets/images/no-data.png";
import { Text } from "@mantine/core";

type NoMeetupsProps = {
  text: string;
};

const NoMeetups = ({ text }: NoMeetupsProps) => {
  return (
    <div className={styles["no-meetups"]}>
      <div className={styles["image-container"]}>
        <Image src={noData} layout="intrinsic" objectFit="cover" />
        <Text className={styles.text}>{text}</Text>
      </div>
    </div>
  );
};

export default NoMeetups;
