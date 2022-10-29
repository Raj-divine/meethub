import styles from "./AllBookmarkMeetups.module.scss";
import { useEffect, useRef, useState } from "react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { getUser } from "../../../utils";
import { db } from "../../../firebase/firebaseConfig";
import MeetupCard from "../../MeetupCard/MeetupCard";
import { SimpleGrid, Space } from "@mantine/core";
import { MeetupsLoader, NoMeetups } from "../../AllMeetupsPage";

const AllBookmarkMeetups = () => {
  const [meetups, setMeetups] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dataLoaded = useRef(false);

  const getData = async (meetup: string) => {
    const meetupSnapshot = await getDoc(doc(db, "meetups", meetup));
    setMeetups((prevMeetup) => {
      return [...prevMeetup, { ...meetupSnapshot.data(), uid: meetup }];
    });
  };

  const getMeetups = async () => {
    const userData = await getUser();
    setMeetups([]);
    setIsLoading(true);

    for (let i = 0; i < userData?.bookmarkedEvents.length; i++) {
      await getData(userData?.bookmarkedEvents[i]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!dataLoaded.current) {
      getMeetups();
      dataLoaded.current = true;
    }
  }, []);

  return (
    <>
      <div className={styles["all-bookmarks"]}>
        {!isLoading && meetups.length > 0 && (
          <div className={styles["heading-container"]}>
            <h2 className={styles.heading}>Bookmarks</h2>
            <p className={styles.text}>All meetups that you liked</p>
          </div>
        )}
        {isLoading && <MeetupsLoader />}
        {!isLoading && meetups.length > 0 && (
          <div className={styles["meetups-container"]}>
            <SimpleGrid
              breakpoints={[
                { maxWidth: 1100, cols: 2 },
                { maxWidth: 768, cols: 1 },
              ]}
              cols={3}
              spacing="lg"
            >
              {meetups.map((meetup) => {
                return <MeetupCard key={meetup.uid} meetup={meetup} />;
              })}
            </SimpleGrid>
          </div>
        )}
        {!isLoading && meetups.length < 1 && (
          <NoMeetups text="No bookmarked Meetups found" />
        )}
      </div>
      <Space h="xl" />
    </>
  );
};

export default AllBookmarkMeetups;
