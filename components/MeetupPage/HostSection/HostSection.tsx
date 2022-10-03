import { Space, Text } from "@mantine/core";
import { DocumentData } from "firebase/firestore";
import styles from "./HostSection.module.scss";
import Image from "next/image";
import { Button } from "../../Utilities";
import Link from "next/link";

const HostSection = ({ meetup }: DocumentData) => {
  return (
    <>
      <section className={styles["host-section"]}>
        <h5 className={styles.heading}>Event Host</h5>
        <div className={styles["host-info"]}>
          <div className={styles["image-name"]}>
            <div className={styles["image-container"]}>
              <Image
                src={meetup.host.profilePicture}
                layout="fill"
                objectFit="cover"
                alt={meetup.host.fullName}
              />
            </div>
            <div>
              <div className={styles.fullname}>{meetup.host.fullName}</div>
              <Text color="dimmed" className={styles.email}>
                {meetup.host.email}
              </Text>
            </div>
          </div>

          <div>
            <Link href={`/users/profile/${meetup.host.uid}`} passHref>
              <Button>View Profile</Button>
            </Link>
          </div>
        </div>
      </section>
      <Space h="xl" />
    </>
  );
};

export default HostSection;
