import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { db } from "../firebase/firebaseConfig";
import { getMeetups, getQueryFilter } from "../utils";

interface FunctionParameters {
  setMeetups: Dispatch<SetStateAction<DocumentData[]>>;
  setMeetupsLoading: Dispatch<SetStateAction<boolean>>;
  setLastVisible: Dispatch<SetStateAction<QueryDocumentSnapshot | number>>;
  router: NextRouter;
  after?: QueryDocumentSnapshot<DocumentData> | number;
}

const fetchMeetupsForAllMeetupsPage = async ({
  setMeetups,
  setMeetupsLoading,
  setLastVisible,
  router,
  after = 0,
}: FunctionParameters) => {
  if (!after) {
    setMeetups([]);
    setMeetupsLoading(true);
  }

  setLastVisible(0);

  const { filter, category } = router.query;
  const queryFilter = getQueryFilter(router);
  if (filter && !category && router.isReady) {
    //here we are fetching meetups with filter applied

    const meetup = await getMeetups(
      queryFilter.field,
      queryFilter.opStr,
      queryFilter.value,
      25,
      setMeetups,
      after
    );
    setLastVisible(
      meetup.docs[meetup.docs.length - 1]
        ? meetup.docs[meetup.docs.length - 1]
        : 0
    );
  } else if (category && !filter && router.isReady) {
    //here we are fetching meetups with specific category

    const meetup = await getMeetups(
      "category",
      "==",
      category.toString(),
      25,
      setMeetups,
      after
    );
    setLastVisible(
      meetup.docs[meetup.docs.length - 1]
        ? meetup.docs[meetup.docs.length - 1]
        : 0
    );
  } else if (category && filter && router.isReady) {
    //here we are fetching meetups with a specific category and filter applied
    const meetupQuery = query(
      collection(db, "meetups"),
      where("category", "==", category),
      where(queryFilter.field, queryFilter.opStr, queryFilter.value),
      orderBy(
        queryFilter.field === "price" && queryFilter.opStr !== "=="
          ? "price"
          : "date"
      ),
      startAfter(after),
      limit(25)
    );
    const meetup = await getDocs(meetupQuery);
    setLastVisible(
      meetup.docs[meetup.docs.length - 1]
        ? meetup.docs[meetup.docs.length - 1]
        : 0
    );
    meetup.forEach((meetup) => {
      setMeetups((prevMeetups) => {
        return [...prevMeetups, { ...meetup.data(), uid: meetup.id }];
      });
    });
  } else if (!category && !filter && router.isReady) {
    const meetupQuery = query(
      collection(db, "meetups"),
      orderBy("date"),
      startAfter(after)
    );
    const meetupSnapshot = await getDocs(meetupQuery);
    setLastVisible(
      meetupSnapshot.docs[meetupSnapshot.docs.length - 1]
        ? meetupSnapshot.docs[meetupSnapshot.docs.length - 1]
        : 0
    );

    setMeetups([]);

    meetupSnapshot.forEach((meetup) => {
      setMeetups((prevMeetups) => {
        return [...prevMeetups, { ...meetup.data(), uid: meetup.id }];
      });
    });
  }
  setMeetupsLoading(false);
};
export default fetchMeetupsForAllMeetupsPage;
