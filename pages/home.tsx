import type { NextPage } from "next";
import Head from "next/head";
import { useUser } from "../hooks";
import AppLoader from "../components/AppLoader/AppLoader";
import { useEffect, useState, useRef } from "react";
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
import { getMeetups } from "../utils";
import dayjs from "dayjs";

const Home: NextPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  //this is a work around for the useEffect hook to not fetch data twice
  const isDataFetched = useRef(false);
  const [techMeetups, setTechMeetups] = useState<DocumentData[]>([]);
  const [freeMeetups, setFreeMeetups] = useState<DocumentData[]>([]);
  const [tomorrowMeetups, setTomorrowMeetups] = useState<DocumentData[]>([]);
  useEffect(() => {
    if (!user && !loading) {
      router.replace("/");
    }
  }, [user]);

  useEffect(() => {
    const tomorrow = dayjs(new Date()).add(1, "day").format("DD-MM-YY");

    const fetchAllMeetups = async () => {
      if (user && !loading) {
        await getMeetups("category", "==", "technology", 4, setTechMeetups);
        await getMeetups("price", "==", 0, 4, setFreeMeetups);
        await getMeetups("dateInString", "==", tomorrow, 4, setTomorrowMeetups);
        isDataFetched.current = true;
      }
    };
    if (!isDataFetched.current) {
      fetchAllMeetups();
    }
  }, [user, loading]);

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
          {tomorrowMeetups.length !== 0 && (
            <SectionMeetup
              heading="Meetups starting tomorrow"
              meetups={tomorrowMeetups}
            />
          )}
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
