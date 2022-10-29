import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const getUser = async () => {
  const { currentUser } = getAuth();

  if (currentUser) {
    const userSnap = await getDoc(doc(db, "users", currentUser.uid));

    const userData = userSnap.data();
    return {
      fullName: userData?.fullName,
      email: userData?.email,
      bookmarkedEvents: userData?.bookmarkedEvents,
      profilePicture: userData?.profilePicture,
      upcomingEvents: userData?.upcomingEvents,
      uid: currentUser?.uid,
    };
  }
};

export default getUser;
