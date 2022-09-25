import type { NextPage } from "next";
import Head from "next/head";
import { useUser } from "../hooks";
import AppLoader from "../components/AppLoader/AppLoader";
import { useEffect } from "react";
import Router from "next/router";
import {
  Divider,
  Header,
  SectionCategory,
  SectionFilter,
  SectionMeetup,
  SectionRecommendation,
} from "../components/HomePage";
import { meetups } from "../fakeData";

const Home: NextPage = () => {
  const { user, loading } = useUser();
  useEffect(() => {
    if (!user && !loading) Router.replace("/");
  }, [user]);

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
            meetups={meetups}
          />
          <SectionMeetup heading="Meetups for free!" meetups={meetups} />
        </>
      )}
    </>
  );
};

export default Home;
