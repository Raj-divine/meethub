import dayjs from "dayjs";
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import styles from "./HeadSection.module.scss";
import { BsBookmark, BsCalendarEvent, BsBookmarkFill } from "react-icons/bs";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { Loader } from "@mantine/core";

const HeadSection = ({ meetup }: DocumentData) => {
  const { title, image, dateInISO, category } = meetup;
  const [user, setUser] = useState<DocumentData | null>(null);
  const [meetupBookmarked, setMeetupBookmarked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const bookmarks = [
    <BsBookmark color="#9333ea" size={25} />,
    <BsBookmarkFill color="#9333ea" size={25} />,
  ];

  const { currentUser } = getAuth();

  const getUserData = async () => {
    if (currentUser) {
      setIsLoading(true);
      const userSnapshot = await getDoc(doc(db, "users", currentUser?.uid));
      if (userSnapshot.exists()) {
        setUser(userSnapshot.data());
        const exists = userSnapshot
          .data()
          .bookmarkedEvents.some((item: string) => item === meetup.uid);
        setMeetupBookmarked(exists);
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const bookmarkHandler = async () => {
    setIsLoading(true);
    if (meetupBookmarked && currentUser && user) {
      await updateDoc(doc(db, "users", currentUser.uid), {
        bookmarkedEvents: user?.bookmarkedEvents.filter(
          (item: string) => item !== meetup.uid
        ),
      });
    }
    if (!meetupBookmarked && currentUser && user) {
      const newBookmarkedEvents = [...user.bookmarkedEvents, meetup.uid];

      await updateDoc(doc(db, "users", currentUser.uid), {
        bookmarkedEvents: newBookmarkedEvents,
      });
    }
    getUserData();
    setIsLoading(false);
  };

  return (
    <section className={styles["head-section"]}>
      <div className={styles["image-container"]}>
        <Image src={image} alt={title} layout="fill" />
      </div>
      <div className={styles["meetup-info"]}>
        <div className={styles["title-container"]}>
          <div className={styles.title}>{title}</div>
          <button onClick={bookmarkHandler} className={styles.bookmark}>
            {!isLoading && bookmarks[meetupBookmarked ? 1 : 0]}
            {isLoading && <Loader color="#9333ea" />}
          </button>
        </div>
        <div className={styles["date-category-container"]}>
          <div className={styles["date-container"]}>
            <div className={styles.calendar}>
              <BsCalendarEvent color="#9333ea" size={25} />{" "}
            </div>
            <div className={styles.date}>
              {dayjs(dateInISO).format("DD MMM")}
            </div>
          </div>
          <div className={styles.category}>{category}</div>
        </div>
      </div>
    </section>
  );
};

export default HeadSection;
