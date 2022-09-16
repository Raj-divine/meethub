import styles from "./FeaturedMeetups.module.scss";
import Image from "next/image";
import { Text } from "@mantine/core";
import dayjs from "dayjs";
const FeaturedMeetup = () => {
  return (
    <div className={styles["featured-meetup"]}>
      <div className={styles.image}>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/meethub-995d3.appspot.com/o/meetup-images%2Fcharlesdeluvio-wn7dOzUh3Rs-unsplash.jpg?alt=media&token=ef894c49-0b10-4326-9772-da328a9076cd"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles["meetup-data"]}>
        <Text lineClamp={1} className={styles.title}>
          Networking for Young professionals
        </Text>

        <div className={styles["info-container"]}>
          <div className={styles.date}>
            {dayjs("2022-09-28T01:09:14Z").format("DD-MMM-YY")}
          </div>
          <div className={styles.price}>$60</div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMeetup;
