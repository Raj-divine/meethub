import { doc, DocumentData, getDoc } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppLoader from "../../../components/AppLoader/AppLoader";
import {
  BookingSection,
  DescriptionSection,
  HeadSection,
  HostSection,
} from "../../../components/MeetupPage";
import { db } from "../../../firebase/firebaseConfig";
import { useUser } from "../../../hooks";
import styles from "../../../styles/meetupPage.module.scss";

const AllMeetups: NextPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) router.replace("/");
  }, [user]);

  const [meetup, setMeetup] = useState<DocumentData | null>(null);
  const [isMeetupLoading, setIsMeetupLoading] = useState(true);
  const [meetupExists, setMeetupExists] = useState(false);

  useEffect(() => {
    const fetchMeetup = async () => {
      setIsMeetupLoading(true);
      const meetupSnapshot = await getDoc(
        doc(db, "meetups", `${router.query.meetupId}`)
      );
      if (meetupSnapshot.exists()) {
        setMeetup({ ...meetupSnapshot.data(), uid: meetupSnapshot.id });
        setMeetupExists(true);
        setIsMeetupLoading(false);
      } else {
        setIsMeetupLoading(false);
        setMeetupExists(false);
      }
    };

    fetchMeetup();
  }, [router.query.meetupId]);

  useEffect(() => {
    if (!isMeetupLoading && !meetupExists) {
      router.replace("/not-found");
    }
  }, [isMeetupLoading, meetupExists]);

  return (
    <>
      <Head>
        <title>All Meetups</title>
      </Head>
      {loading || (isMeetupLoading && <AppLoader />)}
      {user && !loading && !isMeetupLoading && meetupExists && (
        <>
          <div className={styles["page-container"]}>
            <div className={styles.center}>
              <HeadSection meetup={meetup} />
              <DescriptionSection meetup={meetup} />
              <HostSection meetup={meetup} />
            </div>
            <div className={styles.right}>
              <BookingSection meetup={meetup} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllMeetups;
