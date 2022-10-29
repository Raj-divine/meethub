import styles from "./AllBookmarkMeetups.module.scss";
import { useEffect, useRef, useState } from "react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { getUser } from "../../../utils";
import { db } from "../../../firebase/firebaseConfig";
import MeetupCard from "../../MeetupCard/MeetupCard";
import { SimpleGrid } from "@mantine/core";

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
    <div className={styles["all-bookmarks"]}>
      <div>
        <h2>Bookmarks</h2>
      </div>
      {isLoading && <div>loading...</div>}
      {!isLoading && meetups.length > 0 && (
        <div className={styles["meetups-container"]}>
          <SimpleGrid cols={3}>
            {meetups.map((meetup) => {
              return <MeetupCard key={meetup.uid} meetup={meetup} />;
            })}
          </SimpleGrid>
        </div>
      )}
      {!isLoading && meetups.length < 1 && <div>no meetups found</div>}
    </div>
  );
};

export default AllBookmarkMeetups;
