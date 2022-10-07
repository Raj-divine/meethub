import {
  collection,
  limit,
  query,
  where,
  getDocs,
  DocumentData,
  WhereFilterOp,
  orderBy,
  QueryDocumentSnapshot,
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
  after: QueryDocumentSnapshot<DocumentData> | number = 0
) => {
  const meetupQuery = query(
    collection(db, "meetups"),
    where(fieldPath, opStr, value),
    orderBy(fieldPath === "price" && opStr !== "==" ? "price" : "date"),
    startAfter(after),
    limit(meetupLimit)
  );
  const meetups = await getDocs(meetupQuery);
  if (!after) {
    setMeetups([]);
  }
  meetups.forEach((meetup) => {
    setMeetups((prevMeetups) => {
      return [...prevMeetups, { ...meetup.data(), uid: meetup.id }];
    });
  });
  return meetups;
};

export default getTechMeetups;
