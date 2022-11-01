import { Text } from "@mantine/core";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import styles from "./MainProfile.module.scss";

const MainProfile = ({ user }: DocumentData) => {
  return (
    <div className={styles["main-profile"]}>
      <div className={styles["profile-picture"]}>
        <Image
          src={user.profilePicture}
          layout="fill"
          objectFit="cover"
          alt={user.fullName}
        />
      </div>
      <div className={styles.info}>
        <Text className={styles["full-name"]}>{user.fullName}</Text>
        <Text color="dimmed" className={styles.email}>
          {user.email}
        </Text>
      </div>
    </div>
  );
};

export default MainProfile;
