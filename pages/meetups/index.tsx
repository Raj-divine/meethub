import { NextPage } from "next";
import Head from "next/head";
import AppLoader from "../../components/AppLoader/AppLoader";
import { useUser } from "../../hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FilterBar, MeetupsContainer } from "../../components/AllMeetupsPage";
import { DocumentData, Timestamp } from "firebase/firestore";
import { getMeetups } from "../../utils";
import dayjs from "dayjs";
const AllMeetups: NextPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const [meetupsLoading, setMeetupsLoading] = useState<boolean>(true);
  const [meetups, setMeetups] = useState<DocumentData[]>([]);
  useEffect(() => {
    if (!user && !loading) router.replace("/");
  }, [user]);

  useEffect(() => {
    const fetchMeetups = async () => {
      setMeetups([]);
      setMeetupsLoading(true);

      if (router.query.filter) {
        const { filter } = router.query;
        if (filter === "free") {
          await getMeetups("price", "==", 0, 25, setMeetups);
        } else if (filter === "paid") {
          await getMeetups("price", ">", 0, 25, setMeetups);
        } else if (filter === "below-500") {
          await getMeetups("price", "<", 500, 25, setMeetups);
        } else if (filter === "above-1000") {
          await getMeetups("price", ">", 1000, 25, setMeetups);
        }
      }
    };
    fetchMeetups();
  }, [router.query]);

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
