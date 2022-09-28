import Image from "next/image";
import styles from "./MeetupCard.module.scss";
import dayjs from "dayjs";
import { Text } from "@mantine/core";
type MeetupCardProps = {
  meetup: {
    title: string;
    description: string;
    date: string;
    price: number;
    location: string;
    category: string;
    image: string;
    host: {
      uid: string;
      fullName: string;
      profilePicture: string;
    };
  };
};

const MeetupCard = ({ meetup }: MeetupCardProps) => {
  const { title, description, date, price, image } = meetup;
  return (
    <div className={styles["meetup-card"]}>
      <div className={styles["card-image"]}>
        <Image src={image} layout="fill" objectFit="cover" alt={title} />
      </div>
      <div className={styles["card-body"]}>
        <Text lineClamp={1} className={styles.title}>
          {title}
        </Text>
        <Text color="dimmed" lineClamp={3} className={styles.description}>
          {description}
        </Text>
        <div className={styles["card-info"]}>
          <div className={styles.date}>{dayjs(date).format("DD MMM")}</div>
          <div className={styles.price}>₹{price < 1 ? "Free" : price}</div>
        </div>
      </div>
    </div>
  );
};

export default MeetupCard;
