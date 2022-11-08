import { Button } from "../../Utilities";
import styles from "./LogoutSection.module.scss";
import { Space } from "@mantine/core";
import { getAuth, signOut } from "firebase/auth";
const LogoutSection = () => {
  const logoutHandler = async () => {
    const auth = getAuth();
    await signOut(auth);
  };
  return (
    <>
      <div className={styles["logout-container"]}>
        <div className={styles["btn-container"]}>
          <Button onClick={logoutHandler} className={styles.btn}>
            Log Out
          </Button>
        </div>
      </div>
      <Space h="xl" />
    </>
  );
};

export default LogoutSection;
