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
  const techMeetupQuery = query(
    collection(db, "meetups"),
    where(fieldPath, opStr, value),
    limit(meetupLimit)
  );
  const meetups = await getDocs(techMeetupQuery);
  let meetupData: DocumentData[] = [];

  meetups.forEach((meetup) => {
    meetupData = [...meetupData, meetup.data()];
  });

  let uniqueMeetupData = meetupData.filter((item, index) => {
    return meetupData.indexOf(item) == index;
  });
  setMeetups(uniqueMeetupData);
  return meetups;
};

export default getTechMeetups;
