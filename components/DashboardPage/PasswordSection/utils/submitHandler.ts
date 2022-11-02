import { Dispatch, FormEvent, SetStateAction } from "react";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
type FormDataAndErrors = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

interface SubmitHandlerParameter {
  event: FormEvent;
  formData: FormDataAndErrors;
  setErrors: Dispatch<SetStateAction<FormDataAndErrors>>;
  setFormData: Dispatch<SetStateAction<FormDataAndErrors>>;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const submitHandler = async ({
  event,
  formData,
  setErrors,
  setFormData,
  setIsVisible,
}: SubmitHandlerParameter) => {
  event.preventDefault();
  const initialFormData = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const initialErrors = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  if (formData.oldPassword.trim().length < 1) {
    setErrors({
      ...initialErrors,
      oldPassword: "Please enter your old password",
    });
  } else if (formData.oldPassword.trim().length < 6) {
    setErrors({
      ...initialErrors,
      oldPassword: "Password must be at least 6 characters long",
    });
  } else if (formData.newPassword.trim().length < 1) {
    setErrors({
      ...initialErrors,
      newPassword: "Please enter New password",
    });
  } else if (formData.newPassword.trim().length < 6) {
    setErrors({
      ...initialErrors,
      newPassword: "Password must be at least 6 characters long",
    });
  } else if (formData.confirmPassword.trim().length < 1) {
    setErrors({
      ...initialErrors,
      confirmPassword: "Please enter your password again",
    });
  } else if (formData.confirmPassword.trim().length < 6) {
    setErrors({
      ...initialErrors,
      confirmPassword: "Password must be at least 6 characters long",
    });
  } else if (formData.confirmPassword !== formData.newPassword) {
    setErrors({
      ...initialErrors,
      confirmPassword: "Passwords must match",
      newPassword: "Passwords must match",
    });
  } else {
    setErrors(initialErrors);
    setIsVisible(true);
    try {
      const auth = getAuth();
      const { currentUser } = auth;
      if (currentUser) {
        const credential = EmailAuthProvider.credential(
          currentUser.email as string,
          formData.oldPassword
        );

        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, formData.newPassword);
        setFormData(initialFormData);
        setIsVisible(false);
      }
    } catch (error: any) {
      setIsVisible(false);
      if (error.code === "auth/wrong-password") {
        setErrors({ ...initialErrors, oldPassword: "Wrong old password" });
      }
      if (error.code === "auth/weak-password") {
        setErrors({
          ...initialErrors,
          newPassword: "Password must be 6 characters long",
          confirmPassword: "Password must be 6 characters long",
        });
      }
    }
  }
};

export default submitHandler;
