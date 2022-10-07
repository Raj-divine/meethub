import {
  collection,
  limit,
  query,
  where,
  getDocs,
  DocumentData,
  WhereFilterOp,
  orderBy,
  QuerySnapshot,
  startAfter,
} from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "../firebase/firebaseConfig";
const getTechMeetups = async (
  fieldPath: string,
  opStr: WhereFilterOp,
  value: string | number,
  meetupLimit: number,
  setMeetups: Dispatch<SetStateAction<DocumentData[]>>,
  after: QuerySnapshot<DocumentData> | number = 0
) => {
  const meetupQuery = query(
    collection(db, "meetups"),
    where(fieldPath, opStr, value),
    orderBy("date"),
    startAfter(after),
    limit(meetupLimit)
  );
  const meetups = await getDocs(meetupQuery);

  meetups.forEach((meetup) => {
    setMeetups((prevMeetups) => {
      return [...prevMeetups, { ...meetup.data(), uid: meetup.id }];
    });
  });
  return meetups;
};

export default getTechMeetups;
