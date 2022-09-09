import styles from "./SignUpComp.module.scss";
import { TextInput, Space, PasswordInput, LoadingOverlay } from "@mantine/core";
import { Button } from "../../../Utilities";
import { useDispatch } from "react-redux";
import { toggleLogIn } from "../../../../context/modalSlice";
import { useState } from "react";
import submitHandler from "./utility/submitHandler";
const SignUpComp = () => {
  const dispatch = useDispatch();
  const initialState = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [errors, setErrors] = useState(initialState);

  const [userData, setUserData] = useState(initialState);

  const [isVisible, setIsVisible] = useState(false);

  const loginChangeHandler = () => dispatch(toggleLogIn());

  return (
    <div className={styles["sign-up-comp"]}>
      <LoadingOverlay visible={isVisible} overlayBlur={2} />
      <form
        noValidate
        onSubmit={(event) => {
          submitHandler(
            event,
            errors,
            userData,
            setErrors,
            setUserData,
            dispatch,
            isVisible,
            setIsVisible
          );
        }}
      >
        <TextInput
          variant="filled"
          placeholder="John Smith"
          label="Full name"
          name="full name"
          required
          error={errors.fullName}
          value={userData.fullName}
          onChange={(e) =>
            setUserData((prevUser) => {
              return { ...prevUser, fullName: e.target.value };
            })
          }
        />
        <Space h="md" />
        <TextInput
          variant="filled"
          placeholder="example@example.com"
          label="Email"
          name="email"
          required
          error={errors.email}
          value={userData.email}
          onChange={(e) =>
            setUserData((prevUser) => {
              return { ...prevUser, email: e.target.value };
            })
          }
        />
        <Space h="md" />
        <PasswordInput
          placeholder="Password"
          label="Password"
          variant="filled"
          name="password"
          required
          error={errors.password}
          value={userData.password}
          onChange={(e) =>
            setUserData((prevUser) => {
              return { ...prevUser, password: e.target.value };
            })
          }
        />
        <Space h="md" />
        <PasswordInput
          placeholder="Confirm Password"
          label="Confirm Password"
          name="confirm password"
          variant="filled"
          required
          error={errors.confirmPassword}
          value={userData.confirmPassword}
          onChange={(e) =>
            setUserData((prevUser) => {
              return { ...prevUser, confirmPassword: e.target.value };
            })
          }
        />
        <div className={styles.cta}>
          <p>
            Already Have an account?
            <span onClick={loginChangeHandler}> Log In.</span>
          </p>
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpComp;
