import { DocumentData } from "firebase/firestore";
import styles from "./UpcomingEvents.module.scss";
const UpcomingEvents = ({ user }: DocumentData) => {
  return (
    <div className={styles["upcoming-events"]}>
      this is the upcoming events section
    </div>
  );
};

export default UpcomingEvents;
