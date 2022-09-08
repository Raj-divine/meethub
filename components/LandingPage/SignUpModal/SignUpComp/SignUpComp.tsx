import styles from "./SignUpComp.module.scss";
import { TextInput, Space, PasswordInput } from "@mantine/core";
import { Button } from "../../../Utilities";
import { useDispatch } from "react-redux";
import { toggleLogIn } from "../../../../context/modalSlice";
const SignUpComp = () => {
  const dispatch = useDispatch();

  const loginChangeHandler = () => dispatch(toggleLogIn());

  return (
    <div>
      <form>
        <TextInput
          variant="filled"
          placeholder="John Smith"
          label="Full name"
          required
        />
        <Space h="md" />
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
        <Space h="md" />
        <PasswordInput
          placeholder="Confirm Password"
          label="Confirm Password"
          variant="filled"
          required
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
