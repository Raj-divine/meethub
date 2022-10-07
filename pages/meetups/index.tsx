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
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { getMeetups } from "../../utils";
import { db } from "../../firebase/firebaseConfig";
import getQueryFilter from "../../utils/getQueryFilter";
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

      const { filter, category } = router.query;
      const queryFilter = getQueryFilter(router);
      if (filter && !category && router.isReady) {
        //here we are fetching meetups with filter applied

        await getMeetups(
          queryFilter.field,
          queryFilter.opStr,
          queryFilter.value,
          25,
          setMeetups
        );
      } else if (category && !filter && router.isReady) {
        //here we are fetching meetups with specific category

        await getMeetups("category", "==", category.toString(), 25, setMeetups);
      } else if (category && filter && router.isReady) {
        //here we are fetching meetups with a specific category and filter applied
        const meetupQuery = query(
          collection(db, "meetups"),
          where("category", "==", category),
          where(queryFilter.field, queryFilter.opStr, queryFilter.value),
          limit(25)
        );
        const meetups = await getDocs(meetupQuery);

        meetups.forEach((meetup) => {
          setMeetups((prevMeetups) => {
            return [...prevMeetups, { ...meetup.data(), uid: meetup.id }];
          });
        });
      } else if (!category && !filter && router.isReady) {
        const meetupSnapshot = await getDocs(collection(db, "meetups"));
        setMeetups([]);
        meetupSnapshot.forEach((meetup) => {
          setMeetups((prevMeetups) => {
            return [...prevMeetups, { ...meetup.data(), uid: meetup.id }];
          });
        });
      }
      setMeetupsLoading(false);
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
          {meetups.length > 0 && !meetupsLoading && (
            <MeetupsContainer meetups={meetups} />
          )}
          {meetupsLoading && <MeetupsLoader />}
          {!meetupsLoading && meetups.length < 1 && <NoMeetups />}
        </>
      )}
    </>
  );
};

export default AllMeetups;
