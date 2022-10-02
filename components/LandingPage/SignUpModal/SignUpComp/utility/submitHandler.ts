import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { closeModal } from "../../../../../context/modalSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/firebaseConfig";

import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

type UserDataType = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ErrorType = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: string;
};
type SubmitHandlerParameter = {
  event: FormEvent;
  userData: UserDataType;
  setErrors: Dispatch<SetStateAction<ErrorType>>;
  setUserData: Dispatch<SetStateAction<UserDataType>>;
  dispatch: Dispatch<AnyAction>;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  profilePicture: File | null;
};

const submitHandler = async ({
  event,
  userData,
  setErrors,
  setUserData,
  dispatch,
  setIsVisible,
  profilePicture,
}: SubmitHandlerParameter) => {
  event.preventDefault();
  const { fullName, email, password, confirmPassword } = userData;

  const auth = getAuth();
  const initialErrorState = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  };
  const initialUserDataState = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  };

  //checking validity

  if (fullName.trim().length < 1)
    setErrors({ ...initialErrorState, fullName: "Full name is required" });
  else if (fullName.trim().length < 5)
    setErrors({
      ...initialErrorState,
      fullName: "Please enter a valid full name",
    });
  else if (!fullName.trim().includes(" "))
    setErrors({
      ...initialErrorState,
      fullName: "Please enter a valid full name",
    });
  else if (email.trim().length < 1)
    setErrors({ ...initialErrorState, email: "Email is required" });
  else if (!email.includes("@") || !email.includes("."))
    setErrors({ ...initialErrorState, email: "Please enter a valid Email" });
  else if (password.trim().length < 1)
    setErrors({ ...initialErrorState, password: "Password is required" });
  else if (password.trim().length < 6)
    setErrors({
      ...initialErrorState,
      password: "Password must be at least 6 characters long",
    });
  else if (confirmPassword.trim().length < 1)
    setErrors({
      ...initialErrorState,
      confirmPassword: "Confirm password is required",
    });
  else if (confirmPassword.trim().length < 6)
    setErrors({
      ...initialErrorState,
      confirmPassword: "Password must be at least 6 characters long",
    });
  else if (confirmPassword !== password)
    setErrors({
      ...initialErrorState,
      confirmPassword: "Passwords must match",
    });
  else if (!profilePicture) {
    setErrors({
      ...initialErrorState,
      profilePicture: "Profile picture is required",
    });
  } else if (!profilePicture?.type.match("image.*"))
    setErrors({
      ...initialErrorState,
      profilePicture: "You can only upload Images",
    });
  else if (profilePicture?.size > 3 * 1024 * 1024)
    setErrors({
      ...initialErrorState,
      profilePicture: "Profile picture must be less than 3 MB",
    });
  else {
    setErrors(initialErrorState);

    setIsVisible(true);
    try {
      const storage = getStorage();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const storageRef = ref(
        storage,
        `profile-picture/user-${userCredential.user.uid}`
      );

      const snapshot = await uploadBytes(storageRef, profilePicture);
      const profilePictureUrl = await getDownloadURL(snapshot.ref);
      //accessing the user's uid to create a user in firestore

      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName,
        email,
        profilePicture: profilePictureUrl,
        upcomingEvents: [],
      });

      setUserData(initialUserDataState);
      dispatch(closeModal());
      setIsVisible(false);
    } catch (error: any) {
      console.log(error.code);

      if (error.code === "auth/invalid-email") {
        setErrors({
          ...initialErrorState,
          email: "Please enter a valid email",
        });
      }
      if (error.code === "storage/unauthorized") {
        setErrors({
          ...initialErrorState,
          profilePicture:
            "Something went wrong try uploading a different Image",
        });
      }

      if (error.code === "auth/email-already-in-use") {
        setErrors({
          ...initialErrorState,
          email: "This email is already in use",
        });
      }
      setIsVisible(false);
    }
  }
};

export default submitHandler;
