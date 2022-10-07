import {
  collection,
  limit,
  query,
  where,
  getDocs,
  DocumentData,
  WhereFilterOp,
} from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "../firebase/firebaseConfig";
const getTechMeetups = async (
  fieldPath: string,
  opStr: WhereFilterOp,
  value: string | number,
  meetupLimit: number,
  setMeetups: Dispatch<SetStateAction<DocumentData[]>>
) => {
  const meetupQuery = query(
    collection(db, "meetups"),
    where(fieldPath, opStr, value),
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
