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
      profilePicture: userData?.profilePicture,
      email: userData?.email,
      uid: currentUser.uid,
    };
  }
  return null;
};

export default getUser;
