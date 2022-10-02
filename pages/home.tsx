import type { NextPage } from "next";
import Head from "next/head";
import { useUser } from "../hooks";
import AppLoader from "../components/AppLoader/AppLoader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DocumentData } from "firebase/firestore";
import {
  Divider,
  Header,
  SectionCategory,
  SectionFilter,
  SectionMeetup,
  SectionRecommendation,
} from "../components/HomePage";
import { meetups } from "../fakeData";
import { getMeetups } from "../utils";

const Home: NextPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const [techMeetups, setTechMeetups] = useState<DocumentData[]>([]);
  const [freeMeetups, setFreeMeetups] = useState<DocumentData[]>([]);
  useEffect(() => {
    if (!user && !loading) {
      router.replace("/");
    }
  }, [user]);

  useEffect(() => {
    setFreeMeetups([]);
    setTechMeetups([]);
    const fetchAllMeetups = async () => {
      await getMeetups("category", "==", "technology", 4, setTechMeetups);
      await getMeetups("price", "<", 1, 4, setFreeMeetups);
    };
    fetchAllMeetups();
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
            meetups={meetups}
          />
          <Divider />
          <SectionMeetup
            heading='Meetups for "techy" people'
            meetups={techMeetups}
          />
          <SectionMeetup
            last
            heading="Meetups for free!"
            meetups={freeMeetups}
          />
        </>
      )}
    </>
  );
};

export default Home;
