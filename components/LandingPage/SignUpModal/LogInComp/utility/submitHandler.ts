import { Dispatch, FormEvent, SetStateAction } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { closeModal } from "../../../../../context/modalSlice";
import { AnyAction } from "@reduxjs/toolkit";

type SubmitHandlerParameter = {
  email: string;
  password: string;
};

const submitHandler = async (
  event: FormEvent,
  errors: SubmitHandlerParameter,
  userData: SubmitHandlerParameter,
  setErrors: Dispatch<SetStateAction<SubmitHandlerParameter>>,
  setUserData: Dispatch<SetStateAction<SubmitHandlerParameter>>,
  dispatch: Dispatch<AnyAction>,

  isVisible: boolean,
  setIsVisible: Dispatch<SetStateAction<boolean>>
) => {
  event.preventDefault();
  const initialState = {
    email: "",
    password: "",
  };
  const auth = getAuth();
  const { email, password } = userData;

  if (email.trim().length < 1)
    setErrors({ ...initialState, email: "Email is required" });
  else if (!email.includes("@") || !email.includes("."))
    setErrors({ ...initialState, email: "Please enter a valid email" });
  else if (password.trim().length < 1)
    setErrors({ ...initialState, password: "Password is required" });
  else if (password.trim().length < 6)
    setErrors({
      ...initialState,
      password: "Password must be at least 6 characters long",
    });
  else {
    setErrors(initialState);
    setIsVisible(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsVisible(false);
      dispatch(closeModal());
      setUserData(initialState);
    } catch (error: any) {
      if (error.code === "auth/invalid-email") {
        setErrors({ ...initialState, email: "Please enter a valid email" });
        setIsVisible(false);
      }
      if (error.code === "auth/user-not-found") {
        setErrors({ ...initialState, email: "Email not found" });
        setIsVisible(false);
      }
      if (error.code === "auth/wrong-password") {
        setErrors({ ...initialState, password: "Wrong password" });
        setIsVisible(false);
      }

      //only for development
      console.log(error);
    }
  }
};

export default submitHandler;
