import Image from "next/image";
import styles from "./MeetupCard.module.scss";
import dayjs from "dayjs";
import { Text, Tooltip } from "@mantine/core";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";

const MeetupCard = ({ meetup }: DocumentData) => {
  const { title, description, dateInISO, price, image, category } = meetup;
  return (
    <Link href={`/meetups/${meetup.uid}`} passHref>
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
            <div className={styles.date}>
              {dayjs(dateInISO).format("DD MMM")}
            </div>
            <div className={styles.price}>
              {price < 1 ? "Free" : `₹${price}`}
            </div>
            <Tooltip label={category[0].toUpperCase() + category.substring(1)}>
              <div className={styles.category}>
                <Text lineClamp={1}>{category}</Text>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MeetupCard;
