import styles from "./SectionRecommendation.module.scss";
import { Center, Loader, SimpleGrid } from "@mantine/core";
import FeaturedMeetup from "./FeaturedMeetup/FeaturedMeetup";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
const SectionRecommendation = () => {
  const [meetups, setMeetups] = useState<DocumentData[]>([]);
  const { currentUser } = getAuth();
  const isDataFetched = useRef(false);

  useEffect(() => {
    const fetchMeetups = async () => {
      if (currentUser) {
        const meetupQuery = query(collection(db, "meetups"), limit(6));
        const meetupSnapshot = await getDocs(meetupQuery);
        meetupSnapshot.forEach((meetup) => {
          setMeetups((prevMeetups) => {
            return [...prevMeetups, { ...meetup.data(), uid: meetup.id }];
          });
        });
      }
    };
    if (!isDataFetched.current) {
      fetchMeetups();
      isDataFetched.current = true;
    }
  }, [currentUser]);

  return (
    <section className={styles["section-recommendation"]}>
      <h2 className={styles.heading}>Recommended by Meethub for you</h2>
      {isDataFetched.current && (
        <div className={styles["meetup-container"]}>
          <SimpleGrid
            breakpoints={[
              { maxWidth: 1280, cols: 2 },
              { maxWidth: 640, cols: 1 },
            ]}
            spacing="sm"
            cols={3}
          >
            {meetups.map((meetup) => {
              return <FeaturedMeetup meetup={meetup} key={meetup.uid} />;
            })}
          </SimpleGrid>
        </div>
      )}
      {!isDataFetched.current && (
        <Center>
          <Loader color="#9333ea" />
        </Center>
      )}
    </section>
  );
};

export default SectionRecommendation;
