import { DocumentData } from "firebase/firestore";
import styles from "./MainProfile.module.scss";

const MainProfile = ({ user }: DocumentData) => {
  return <div className={styles["main-profile"]}>this is the main profile</div>;
};

export default MainProfile;
