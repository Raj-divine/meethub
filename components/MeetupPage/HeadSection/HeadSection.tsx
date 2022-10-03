import dayjs from "dayjs";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import styles from "./HeadSection.module.scss";
import { BsBookmark, BsCalendarEvent, BsBookmarkFill } from "react-icons/bs";
import { Divider } from "@mantine/core";

const HeadSection = ({ meetup }: DocumentData) => {
  const { title, image, date, category } = meetup;

  const bookmarks = [
    <BsBookmark color="#9333ea" size={25} />,
    <BsBookmarkFill color="#9333ea" size={25} />,
  ];

  return (
    <section className={styles["head-section"]}>
      <div className={styles["image-container"]}>
        <Image src={image} alt={title} layout="fill" />
      </div>
      <div className={styles["meetup-info"]}>
        <div className={styles["title-container"]}>
          <div className={styles.title}>{title}</div>
          <div className={styles.bookmark}>
            <BsBookmark color="#9333ea" size={25} />
          </div>
        </div>
        <div className={styles["date-category-container"]}>
          <div className={styles["date-container"]}>
            <div className={styles.calendar}>
              <BsCalendarEvent color="#9333ea" size={25} />{" "}
            </div>
            <div className={styles.date}>{dayjs(date).format("DD MMM")}</div>
          </div>
          <div className={styles.category}>{category}</div>
        </div>
      </div>
      {/* <Divider /> */}
    </section>
  );
};

export default HeadSection;
