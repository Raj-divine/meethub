import { NextPage } from "next";
import Head from "next/head";
import AppLoader from "../../components/AppLoader/AppLoader";
import { useUser } from "../../hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FilterBar,
  MeetupsContainer,
  MeetupsLoader,
  NoMeetups,
} from "../../components/AllMeetupsPage";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { fetchMeetupsForAllMeetupsPage, getMeetups } from "../../utils";

const AllMeetups: NextPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const [meetupsLoading, setMeetupsLoading] = useState<boolean>(true);
  const [meetups, setMeetups] = useState<DocumentData[]>([]);
  const [lastVisible, setLastVisible] = useState<
    QueryDocumentSnapshot<DocumentData> | number
  >(0);
  useEffect(() => {
    if (!user && !loading) router.replace("/");
  }, [user]);

  useEffect(() => {
    setLastVisible(0);
    const getData = async () => {
      await fetchMeetupsForAllMeetupsPage({
        setMeetups,
        setMeetupsLoading,
        setLastVisible,
        router,
      });
    };
    getData();
  }, [router.query]);

  const getNextMeetups = async () => {
    await fetchMeetupsForAllMeetupsPage({
      setMeetups,
      setMeetupsLoading,
      setLastVisible,
      router,
      after: lastVisible,
    });
  };

  return (
    <>
      <Head>
        <title>All Meetups</title>
      </Head>
      {loading && <AppLoader />}
      {user && !loading && (
        <>
          <FilterBar />
          {meetups.length > 0 && !meetupsLoading && (
            <MeetupsContainer
              getNextMeetups={getNextMeetups}
              meetups={meetups}
            />
          )}
          {meetupsLoading && <MeetupsLoader />}
          {!meetupsLoading && meetups.length < 1 && <NoMeetups />}
        </>
      )}
    </>
  );
};

export default AllMeetups;
