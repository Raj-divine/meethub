import styles from "./PastEvents.module.scss";
import { Loader, SimpleGrid, Space, Text } from "@mantine/core";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import MeetupCard from "../../MeetupCard/MeetupCard";
const PastEvents = ({ user }: DocumentData) => {
  const [meetups, setMeetups] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFetched = useRef(false);
  useEffect(() => {
    const getMeetups = async () => {
      setIsLoading(true);
      const today = new Date();
      const meetupRef = collection(db, "meetups");
      const meetupQuery = query(
        meetupRef,
        where("date", "<", today),
        where("hostId", "==", user.uid)
      );
      const meetupSnapshot = await getDocs(meetupQuery);
      meetupSnapshot.forEach((meetup) => {
        setMeetups((prevMeetups) => {
          return [...prevMeetups, { ...meetup.data(), uid: meetup.id }];
        });
      });
      setIsLoading(false);
    };
    if (!isFetched.current) {
      getMeetups();
      isFetched.current = true;
    }
  }, []);

  return (
    <>
      <div className={styles["past-events"]}>
        <Text className={styles.heading}>Past Meetups</Text>

        {!isLoading && meetups.length > 0 && (
          <div className={styles["meetup-container"]}>
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

        {isLoading && (
          <div className={styles.loader}>
            <Loader color="#9333ea" />
          </div>
        )}
        {!isLoading && meetups.length < 1 && (
          <div className={styles["no-meetups"]}>No Past meetups</div>
        )}
      </div>
      <Space h="xl" />
    </>
  );
};

export default PastEvents;
