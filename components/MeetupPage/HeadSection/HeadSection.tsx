import { DocumentData } from "firebase/firestore";
import styles from "./HeadSection.module.scss";

const HeadSection = ({ meetup }: DocumentData) => {
  return <div className={styles["head-section"]}>{meetup.title}</div>;
};

export default HeadSection;
