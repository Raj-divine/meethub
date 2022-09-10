import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { closeModal } from "../../../../../context/modalSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/firebaseConfig";
type ErrorAndUserDataState = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type SubmitHandlerParameter = {
  event: FormEvent;
  userData: ErrorAndUserDataState;
  setErrors: Dispatch<SetStateAction<ErrorAndUserDataState>>;
  setUserData: Dispatch<SetStateAction<ErrorAndUserDataState>>;
  dispatch: Dispatch<AnyAction>;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
};

const submitHandler = async ({
  event,
  userData,
  setErrors,
  setUserData,
  dispatch,
  setIsVisible,
}: SubmitHandlerParameter) => {
  event.preventDefault();
  const { fullName, email, password, confirmPassword } = userData;
  const auth = getAuth();
  const initialState = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  //checking validity

  if (fullName.trim().length < 1)
    setErrors({ ...initialState, fullName: "Full name is required" });
  else if (fullName.trim().length < 5)
    setErrors({
      ...initialState,
      fullName: "Please enter a valid full name",
    });
  else if (!fullName.trim().includes(" "))
    setErrors({
      ...initialState,
      fullName: "Please enter a valid full name",
    });
  else if (email.trim().length < 1)
    setErrors({ ...initialState, email: "Email is required" });
  else if (!email.includes("@") || !email.includes("."))
    setErrors({ ...initialState, email: "Please enter a valid Email" });
  else if (password.trim().length < 1)
    setErrors({ ...initialState, password: "Password is required" });
  else if (password.trim().length < 6)
    setErrors({
      ...initialState,
      password: "Password must be at least 6 characters long",
    });
  else if (confirmPassword.trim().length < 1)
    setErrors({
      ...initialState,
      confirmPassword: "Confirm password is required",
    });
  else if (confirmPassword.trim().length < 6)
    setErrors({
      ...initialState,
      confirmPassword: "Password must be at least 6 characters long",
    });
  else if (confirmPassword !== password)
    setErrors({
      ...initialState,
      confirmPassword: "Passwords must match",
    });
  else {
    setErrors(initialState);

    setIsVisible(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //accessing the user's uid to create a user in firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName,
        email,
      });
      setUserData(initialState);
      dispatch(closeModal());
      setIsVisible(false);
    } catch (error: any) {
      if (error.code === "auth/invalid-email") {
        setErrors({ ...initialState, email: "Please enter a valid email" });
        setIsVisible(false);
      }
      //only for development
      console.log(error);
    }
  }
};

export default submitHandler;
