import styles from "./FeaturedMeetup.module.scss";
import Image from "next/image";
import { Text } from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";
type FeaturedMeetupProps = {
  image: string;
  title: string;
  date: string;
  price: number;
  uid: number | string;
};
const FeaturedMeetup = ({
  image,
  title,
  date,
  price,
  uid,
}: FeaturedMeetupProps) => {
  return (
    <Link href={`meetups/${uid}`} passHref>
      <div className={styles["featured-meetup"]}>
        <div className={styles.image}>
          <Image src={image} layout="fill" objectFit="cover" alt={title} />
        </div>

        <div className={styles["meetup-data"]}>
          <Text lineClamp={1} className={styles.title}>
            {title}
          </Text>

          <div className={styles["info-container"]}>
            <div className={styles.date}>{dayjs(date).format("DD MMM")}</div>
            <div className={styles.price}>₹{price}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedMeetup;
