import { DocumentData } from "firebase/firestore";
import styles from "./DescriptionSection.module.scss";
import { Text } from "@mantine/core";

const DescriptionSection = ({ meetup }: DocumentData) => {
  return (
    <section className={styles["description-section"]}>
      <div>
        <h5 className={styles.heading}>Event Description</h5>
        <Text className={styles.description}>{meetup.description}</Text>
      </div>
    </section>
  );
};

export default DescriptionSection;
