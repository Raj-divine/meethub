import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { closeModal } from "../../../../../context/modalSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
type SubmitHandlerParameter = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const submitHandler = async (
  event: FormEvent,
  errors: SubmitHandlerParameter,
  userData: SubmitHandlerParameter,
  setErrors: Dispatch<SetStateAction<SubmitHandlerParameter>>,
  setUserData: Dispatch<SetStateAction<SubmitHandlerParameter>>,
  dispatch: Dispatch<AnyAction>
) => {
  event.preventDefault();
  const { fullName, email, password, confirmPassword } = userData;
  const auth = getAuth();
  const initialErrorState = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  else if (password.trim().length < 5)
    setErrors({
      ...initialErrorState,
      password: "Password must be at least 6 characters long",
    });
  else if (confirmPassword.trim().length < 1)
    setErrors({
      ...initialErrorState,
      confirmPassword: "Confirm password is required",
    });
  else if (confirmPassword.trim().length < 5)
    setErrors({
      ...initialErrorState,
      confirmPassword: "Password must be at least 6 characters long",
    });
  else if (confirmPassword !== password)
    setErrors({
      ...initialErrorState,
      confirmPassword: "Passwords must match",
    });
  else {
    setErrors(initialErrorState);
    dispatch(closeModal());

    if (
      !errors.fullName &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    ) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        //accessing the user's uid
        console.log(userCredential.user.uid);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default submitHandler;
