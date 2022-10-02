import type { NextPage } from "next";
import Head from "next/head";
import { useUser } from "../hooks";
import AppLoader from "../components/AppLoader/AppLoader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  limit,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import {
  Divider,
  Header,
  SectionCategory,
  SectionFilter,
  SectionMeetup,
  SectionRecommendation,
} from "../components/HomePage";
import { meetups } from "../fakeData";
import { db } from "../firebase/firebaseConfig";

const Home: NextPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const [techMeetups, setTechMeetups] = useState<DocumentData[]>([]);
  useEffect(() => {
    if (!user && !loading) {
      router.replace("/");
    }
  }, [user]);

  useEffect(() => {
    const getTechMeetups = async () => {
      setTechMeetups([]);
      const techMeetupQuery = query(
        collection(db, "meetups"),
        where("category", "==", "technology"),
        limit(4)
      );
      const meetups = await getDocs(techMeetupQuery);
      meetups.forEach((meetup) => {
        setTechMeetups((prevMeetups) => {
          return [...prevMeetups, meetup.data()];
        });
      });
    };

    getTechMeetups();
  }, []);

  return (
    <>
      <Head>
        <title>Meethub | Home</title>
      </Head>
      {loading && <AppLoader />}
      {user && !loading && (
        <>
          <Header />
          <SectionRecommendation />
          <SectionCategory />
          <SectionFilter />
          <SectionMeetup
            heading="Meetups starting tomorrow"
            meetups={techMeetups}
          />
          <Divider />
          <SectionMeetup
            heading='Meetups for "techy" people'
            meetups={meetups}
          />
          <SectionMeetup last heading="Meetups for free!" meetups={meetups} />
        </>
      )}
    </>
  );
};

export default Home;
