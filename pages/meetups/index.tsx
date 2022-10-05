import { NextPage } from "next";
import Head from "next/head";
import AppLoader from "../../components/AppLoader/AppLoader";
import { useUser } from "../../hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FilterBar, MeetupsContainer } from "../../components/AllMeetupsPage";

const AllMeetups: NextPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) router.replace("/");
  }, [user]);

  return (
    <>
      <Head>
        <title>All Meetups</title>
      </Head>
      {loading && <AppLoader />}
      {user && !loading && (
        <>
          <FilterBar />
          <MeetupsContainer />
        </>
      )}
    </>
  );
};

export default AllMeetups;
