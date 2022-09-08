import { PasswordInput, Space, TextInput } from "@mantine/core";
import { toggleLogIn } from "../../../../context/modalSlice";
import { useDispatch } from "react-redux";
import styles from "./LogInComp.module.scss";
import { Button } from "../../../Utilities";

const LogInComp = () => {
  const dispatch = useDispatch();
  const loginChangeHandler = () => dispatch(toggleLogIn());
  return (
    <div>
      <form>
        <TextInput
          variant="filled"
          placeholder="example@example.com"
          label="Email"
          required
        />
        <Space h="md" />
        <PasswordInput
          placeholder="Password"
          label="Password"
          variant="filled"
          required
        />

        <div className={styles.cta}>
          <p>
            Don't have an account?
            <span onClick={loginChangeHandler}> Sign Up.</span>
          </p>
          <Button type="submit">Log In</Button>
        </div>
      </form>
    </div>
  );
};

export default LogInComp;
