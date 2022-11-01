import { DocumentData } from "firebase/firestore";
import styles from "./PastEvents.module.scss";
const PastEvents = ({ user }: DocumentData) => {
  return (
    <div className={styles["past-events"]}>this is the past event section</div>
  );
};

export default PastEvents;
