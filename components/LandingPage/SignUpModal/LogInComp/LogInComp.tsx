import { PasswordInput, Space, TextInput, LoadingOverlay } from "@mantine/core";
import { toggleLogIn } from "../../../../context/modalSlice";
import { useDispatch } from "react-redux";
import styles from "./LogInComp.module.scss";
import { Button } from "../../../Utilities";
import { useState } from "react";
import submitHandler from "./utility/submitHandler";
import { useRouter } from "next/router";
const LogInComp = () => {
  const dispatch = useDispatch();
  const loginChangeHandler = () => dispatch(toggleLogIn());
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
  };
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState(initialState);
  const [userData, setUserData] = useState(initialState);

  return (
    <div className={styles["log-in-comp"]}>
      <LoadingOverlay visible={isVisible} overlayBlur={2} />
      <form
        noValidate
        onSubmit={(event) =>
          submitHandler({
            event,
            userData,
            setErrors,
            setUserData,
            dispatch,
            setIsVisible,
          })
        }
      >
        <TextInput
          variant="filled"
          placeholder="example@example.com"
          label="Email"
          required
          error={errors.email}
          name="email"
          onChange={(e) =>
            setUserData((prevUser) => {
              return {
                ...prevUser,
                email: e.target.value,
              };
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
          onChange={(e) =>
            setUserData((prevUser) => {
              return {
                ...prevUser,
                password: e.target.value,
              };
            })
          }
        />

        <div className={styles.cta}>
          <p>
            Don&apos;t have an account?
            <span onClick={loginChangeHandler}> Sign Up.</span>
          </p>
          <Button type="submit">Log In</Button>
        </div>
      </form>
    </div>
  );
};

export default LogInComp;
