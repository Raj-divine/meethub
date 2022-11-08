import { getAuth, updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { db } from "../../../../firebase/firebaseConfig";
type UserDataAndErrors = {
  fullName: string;
  email: string;
};
interface SubmitHandlerParameter {
  event: FormEvent;
  userData: UserDataAndErrors;
  setErrors: Dispatch<SetStateAction<UserDataAndErrors>>;
  getUserData: () => void;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}
const submitHandler = async ({
  event,
  userData,
  setErrors,
  getUserData,
  setIsVisible,
}: SubmitHandlerParameter) => {
  event.preventDefault();
  const initialErrorState = {
    email: "",
    fullName: "",
  };
  if (userData.fullName.trim().length < 1) {
    setErrors({ ...initialErrorState, fullName: "Full name is required" });
  } else if (userData.fullName.trim().length < 5) {
    setErrors({
      ...initialErrorState,
      fullName: "Please enter a valid full name",
    });
  } else if (!userData.fullName.trim().includes(" ")) {
    setErrors({
      ...initialErrorState,
      fullName: "Please enter a valid full name",
    });
  } else if (userData.email.trim().length < 1) {
    setErrors({ ...initialErrorState, email: "Email is required" });
  } else if (
    !userData.email.includes("@") ||
    !userData.email.includes(".") ||
    userData.email.trim().length < 5
  ) {
    setErrors({ ...initialErrorState, email: "Please enter a valid Email" });
  } else {
    setErrors(initialErrorState);
    setIsVisible(true);
    try {
      const { currentUser } = getAuth();
      if (currentUser) {
        await updateEmail(currentUser, userData.email);

        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
          email: userData.email,
          fullName: userData.fullName,
        });
      }

      setIsVisible(false);
      getUserData();
    } catch (error: any) {
      setIsVisible(false);
      if (error.code === "auth/invalid-email") {
        setErrors({
          ...initialErrorState,
          email: "Please enter a valid Email",
        });
      }
      if (error.code === "auth/requires-recent-login") {
        setErrors({
          ...initialErrorState,
          email: "Please logout and login again to change your email",
        });
      }
      console.log(error.code);
    }
  }
};

export default submitHandler;
