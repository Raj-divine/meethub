import { DocumentData } from "firebase/firestore";
import styles from "./DescriptionSection.module.scss";
import { Divider, Text } from "@mantine/core";

const DescriptionSection = ({ meetup }: DocumentData) => {
  return (
    <section className={styles["description-section"]}>
      <div className={styles["description-container"]}>
        <h5 className={styles.heading}>Event Description</h5>
        <Text className={styles.description}>{meetup.description}</Text>
      </div>
      <Divider />
      <div className={styles["location-container"]}>
        <h5 className={styles.heading}>Event location</h5>
        <Text>{meetup.location}</Text>
      </div>
    </section>
  );
};

export default DescriptionSection;
