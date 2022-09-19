import type { NextPage } from "next";
import Head from "next/head";
import { useUser } from "../hooks";
import AppLoader from "../components/AppLoader/AppLoader";
import { useEffect } from "react";
import Router from "next/router";
import {
  Header,
  SectionCategory,
  SectionFilter,
  SectionRecommendation,
} from "../components/HomePage";

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
        </>
      )}
    </>
  );
};

export default Home;
